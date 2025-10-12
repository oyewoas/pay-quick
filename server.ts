import jsonServer from "json-server";
import type { User, Profile, Transaction } from "./src/utils/types";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("mock/db.json"); // db.json must have "users": [], "tokens": [], "profile": [], "transactions": []

// --- CORS ---
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(jsonServer.bodyParser);
server.use(middlewares);

// --- LOGIN ---
server.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = router.db.get("users").value() as User[];
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password.toLowerCase() === password.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a fake token
  const token = Buffer.from(`${user.username}:${Date.now()}`).toString("base64");

  // Save token persistently
  router.db.get("tokens").push({ token, userId: user.id }).write();

  return res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});

// --- LOGOUT ---
server.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    // Remove token
    router.db.get("tokens").remove({ token }).write();
  }

  return res.json({ message: "Logged out successfully" });
});

// --- AUTH MIDDLEWARE (Global) ---

// Apply authentication globally (after login/logout are defined)
server.use((req, res, next) =>{
  // Skip login/logout so they stay public
  if (req.path === "/login" || req.path === "/logout") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  const tokenEntry = router.db.get("tokens").find({ token }).value();

  if (!tokenEntry) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  // Attach userId to request for later use
  req.userId = tokenEntry.userId;
  next();
});

// --- PROFILE/:id ---
server.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const profiles = router.db.get("profile").value() as Profile[];
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  // only allow owner or admin to view
  if (profile.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.json(profile);
});

// --- TRANSACTIONS ---
server.get("/transactions", (req, res) => {
  const transactions = router.db.get("transactions").value() as Transaction[];
  const userTransactions = transactions.filter((t) => t.userId === req.userId);

  return res.json(userTransactions);
});

// --- TRANSACTIONS/:id ---
server.get("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const transactions = router.db.get("transactions").value() as Transaction[];
  const transaction = transactions.find((t) => t.id === Number(id));

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // only allow owner to see their transaction
  if (transaction.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.json(transaction);
});

// --- DEFAULT ROUTER ---
server.use(router);

server.listen(3001, () => {
  console.log("🚀 Mock API running on http://localhost:3001");
  console.log("📝 Endpoints:");
  console.log("   POST   /login (public)");
  console.log("   POST   /logout (public)");
  console.log("   GET    /profile/:id (protected)");
  console.log("   GET    /transactions (protected)");
  console.log("   GET    /transactions/:id (protected)");
  console.log("   GET    /users (protected - json-server auto)");
});
