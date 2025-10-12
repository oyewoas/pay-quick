import type { Transaction } from "../../store/slices/transactionsSlice";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (!transactions || transactions.length === 0) {
    return (
      <section className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <h2 className="text-lg font-semibold text-slate-800">Transactions</h2>
        <p className="mt-3 text-sm text-slate-500">
          No transactions yet. Your activity will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Transactions</h2>
        </div>
        <div className="text-sm text-slate-500">
          {transactions.length} {transactions.length === 1 ? "item" : "items"}
        </div>
      </div>

      <ul className="divide-y divide-slate-100">
        {transactions.map((t) => {
          const isDebit = t.amount < 0;

          return (
            <li
              key={t.id}
              className="flex gap-4 py-4 px-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {/* Left: Description + Date */}
              <div className="flex-1 min-w-0 text-left">
                <div className="text-slate-900 font-medium truncate">
                  {t.description}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {new Date(t.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>

              {/* Right: Amount */}
              <div className="text-right">
                <span
                  className={`inline-block text-sm font-semibold ${
                    isDebit
                      ? "text-red-500 bg-red-50 px-2 py-1 rounded-md"
                      : "text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md"
                  }`}
                >
                  {currency.format(t.amount)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
