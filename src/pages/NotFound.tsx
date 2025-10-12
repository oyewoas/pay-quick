import { useNavigate } from "react-router";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";

export default function NotFound() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg ring-1 ring-slate-100 text-center">
        <h1 className="text-6xl font-extrabold text-slate-800">404</h1>
        <p className="mt-4 text-lg text-slate-600">Page not found</p>
        <p className="mt-2 text-sm text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2 font-medium shadow hover:brightness-95 transition"
          >
            {isAuthenticated ? "Go to dashboard" : "Sign in"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-indigo-800 hover:bg-slate-50 transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
