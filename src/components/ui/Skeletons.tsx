export function ProfileSkeleton() {
  return (
    <aside className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm ui-card border border-slate-100">
      <div className="animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    </aside>
  );
}

export function TransactionsSkeleton() {
  return (
    <section className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm ui-card border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="text-sm text-slate-500">—</div>
      </div>

      <ul className="divide-y">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="py-4 flex items-center justify-between tx-item"
          >
            <div className="w-2/3">
              <div className="h-3 bg-slate-200 rounded w-1/3 mb-2 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
            </div>
            <div className="w-1/3 text-right">
              <div className="h-4 bg-slate-200 rounded w-16 ml-auto animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
