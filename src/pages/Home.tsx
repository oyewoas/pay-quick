import { Link } from "react-router";
import { useAppSelector } from "@/store/hooks";
import Logo from "@/components/ui/Logo";

export default function Home() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <main className="min-h-screen flex items-center bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-3xl mx-auto px-6 py-28 text-center">
        <Logo />
        <h1 className="text-4xl font-extrabold text-slate-900">PayQuick</h1>
        <p className="mt-4 text-lg text-slate-600">
          A simple payments dashboard to view your profile and transactions.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-6 py-3 font-semibold shadow"
            >
              Open dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-6 py-3 font-semibold shadow"
            >
              Sign in
            </Link>
          )}
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-indigo-600"
          >
            Why PayQuick?
          </a>
        </div>

        <div
          id="features"
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
        >
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-sm font-semibold text-slate-800">
              Easy to use
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Clear dashboard and simple flows.
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-sm font-semibold text-slate-800">Fast</div>
            <div className="mt-1 text-sm text-slate-600">
              Cached data and instant navigation.
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-sm font-semibold text-slate-800">
              Dev friendly
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Mock API and test-ready setup.
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Demo credentials: <b className="text-indigo-600">jane</b> /{" "}
          <b className="text-indigo-600">password123</b>
        </p>
      </div>
    </main>
  );
}
