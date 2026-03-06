export default function DashboardStatsSkeleton({
  numOfCards,
}: {
  numOfCards: number;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 animate-pulse">
      {/* Skeleton Card */}
      {Array.from({ length: numOfCards }, (_, i) => i + 1).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full w-10 h-10"></div>
          </div>
        </div>
      ))}
    </section>
  );
}
