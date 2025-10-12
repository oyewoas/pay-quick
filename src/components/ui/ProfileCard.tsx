export default function ProfileCard({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <aside className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <div className="text-sm text-slate-500">Name</div>
      <div className="mb-4 text-slate-900 font-semibold text-lg">{name}</div>
      <div className="text-sm text-slate-500">Email</div>
      <div className="text-slate-700">{email}</div>
    </aside>
  );
}
