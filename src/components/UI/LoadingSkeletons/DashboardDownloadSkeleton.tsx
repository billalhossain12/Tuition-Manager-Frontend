const DashboardDownloadSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
      {skeletonRows.map((_, index) => (
        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 animate-pulse">
          {[...Array(6)].map((_, colIndex) => (
            <td
              key={colIndex}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DashboardDownloadSkeleton;