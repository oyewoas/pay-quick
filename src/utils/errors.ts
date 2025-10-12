export function getErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.data && typeof e.data === "object") {
      const d = e.data as Record<string, unknown>;
      if (d.message) return String(d.message);
    }
    if (e.error) return String(e.error);
    if (e.message) return String(e.message);
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
