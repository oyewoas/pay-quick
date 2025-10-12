export default function ErrorCard({
  title = "Error",
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-red-700 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="font-semibold">{title}</div>
          {message && (
            <div className="text-sm text-red-600 mt-1 text-left">{message}</div>
          )}
        </div>
        {onRetry && (
          <div>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-100 rounded-full text-sm text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
