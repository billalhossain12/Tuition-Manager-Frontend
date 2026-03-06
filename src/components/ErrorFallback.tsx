import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="p-4 bg-red-100 border border-red-300 rounded-md text-red-700 my-5"
    >
      <h2 className="text-lg font-semibold">Oops! Something went wrong.</h2>
      <p className="mt-1">{error.message}</p>
      {/* <p className="mt-1">{error.stack}</p> */}
      <button
        onClick={resetErrorBoundary}
        className="mt-3 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
