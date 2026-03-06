import { baseUrl } from "../api/apiConstant";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function BuyNowEbook() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseUrl}/ebook-downloaded-users/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
      const session = await response.json();
      if (session) {
        window.location.href = session.url;
      }
      setIsLoading(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleBuyNow}
      className={`text-text-white active:scale-95 rounded-button px-6 py-3 transition font-bold h-[47px] flex flex-col items-center ${
        isLoading ? "bg-gray-600" : "bg-brand-navy hover:bg-brand-navyHover"
      }`}
    >
      {isLoading ? (
        <Icon icon="eos-icons:three-dots-loading" width="40" height="40" />
      ) : (
        "Buy Now"
      )}
    </button>
  );
}
