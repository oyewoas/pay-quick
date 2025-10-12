import { useNavigate } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/services/auth";

export default function Header({ title }: { title?: string }) {
  const profile = useAppSelector((s) => s.profile);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/login");
  };

  const initials =
    (profile.name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PQ";

  return (
    <header className="bg-white border-b border-slate-100 mb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              PQ
            </div>
            <div>
              {title && <div className="text-sm font-semibold text-slate-800">{title}</div>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-slate-700">
                  {profile.name}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium">
                  {initials}
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="bg-indigo-50 px-6 py-3 rounded-md text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
