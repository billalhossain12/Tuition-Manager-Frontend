/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function showApiErrorToast(error: unknown) {
  // Primary network detection
  if (!navigator.onLine) {
    toast.error("You appear to be offline. Please check your internet connection.");
    return;
  }

  if (typeof error === "object" && error !== null) {
    // Handle FetchBaseQueryError (RTK Query)
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;
      
      switch (fetchError.status) {
        case 'FETCH_ERROR':
          toast.error("Cannot connect to server. Please check your connection and try again.");
          return;
          
        case 'TIMEOUT_ERROR':
          toast.error("Request timed out. The server is taking too long to respond.");
          return;
          
        case 'PARSING_ERROR':
          toast.error("Invalid response from server. Please contact support.");
          return;
          
        default:
          if (typeof fetchError.status === 'number') {
            const message = extractErrorMessage(fetchError.data) || 
                           getDefaultHttpError(fetchError.status);
            toast.error(message);
            return;
          }
      }
    }

    // Handle generic errors with messages
    if ("message" in error && typeof (error as any).message === "string") {
      toast.error((error as any).message);
      return;
    }
  }

  // Final fallback
  toast.error("An unexpected error occurred. Please try again.");
  console.error("Unhandled error type:", error);
}

function extractErrorMessage(data: unknown): string | null {
  if (typeof data === 'string') return data;
  if (typeof data === 'object' && data !== null) {
    return (data as any).message || (data as any).error || null;
  }
  return null;
}

function getDefaultHttpError(status: number): string {
  const messages: Record<number, string> = {
    400: "Invalid request. Please check your input.",
    401: "Please sign in to continue.",
    403: "You don't have permission to perform this action.",
    404: "The requested resource was not found.",
    408: "Request timeout. Please try again.",
    409: "This resource already exists.",
    422: "Validation error. Please check your data.",
    429: "Too many requests. Please slow down.",
    500: "Server error. Please try again later.",
    502: "Service temporarily unavailable.",
    503: "Service temporarily unavailable.",
    504: "Server timeout. Please try again.",
  };
  
  return messages[status] || `Error ${status}: Something went wrong`;
}