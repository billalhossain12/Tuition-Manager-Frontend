import { Icon } from "@iconify/react/dist/iconify.js";

export const DataLoadingError = ({
  title,
  errorMessage,
  onRetry,
}: {
  errorMessage: string;
  title: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="mx-auto p-8 bg-red-100 shadow rounded mb-[2.5rem]">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <Icon
            icon="heroicons:exclamation-triangle"
            className="text-4xl text-red-500"
          />
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-red-800 mb-3">{title}</h2>

        {/* Error Message */}
        <p className="text-red-600 mb-2 max-w-md">{errorMessage}</p>

        {/* Technical Details */}
        <p className="text-gray-500 text-sm mb-3 max-w-md">
          We couldn't retrieve requested data. This might be due to network
          issues or server problems.
        </p>

        {/* Action Buttons */}
        <div>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Icon icon="heroicons:arrow-path" className="text-lg" />
            Try Again
          </button>
        </div>

        {/* Troubleshooting Tips */}
        <div className="pt-8 border-t border-gray-200 w-full flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Troubleshooting Tips
          </h3>
          <ul className=" text-gray-600 space-y-1">
            <li className="flex items-start gap-2">
              <Icon
                icon="heroicons:check-circle"
                className="text-green-500 mt-1"
              />
              <span>Check your internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="heroicons:check-circle"
                className="text-green-500 mt-1"
              />
              <span>Refresh the page</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="heroicons:check-circle"
                className="text-green-500 mt-1"
              />
              <span>Try again after a few minutes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
