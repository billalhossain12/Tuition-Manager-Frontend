/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkModeNormalTextColor: "#a3a3a3",
        darkModeHeadingTextColor: "#d4d4d4",
        darkModeBgColor: "#171717",
        darkModeBorderColor: "#737373",
        darkModeHoverColor: "#f5f5f5",

        /* =====================================
       BRAND COLOR SYSTEM (STRICT PALETTE)
       ===================================== */
        brand: {
          navy: "#12304a", // Primary Authority
          navyHover: "#1c6fb8",
          teal: "#1ca8a8", // Calm Accent
          orange: "#f28b3c", // Sun Ray Accent (limited)
          blue: "#1c6fb8", // Structural Support
        },
        surface: {
          background: "#f6f8fb",
          card: "#ffffff",
        },

        text: {
          primary: "#12304a", // Navy headings
          muted: "#5b6b7a",
          white: "#ffffff",
        },

        border: {
          default: "#e5e7eb",
        },
      },

      /* =====================================
       TYPOGRAPHY SYSTEM
       ===================================== */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
      },

      /* =====================================
       STRUCTURAL SYSTEM
       ===================================== */
      borderRadius: {
        card: "1rem",
        button: "0.75rem",
      },

      boxShadow: {
        card: "0 8px 24px rgba(18, 48, 74, 0.08)",
        soft: "0 4px 12px rgba(18, 48, 74, 0.06)",
      },

      spacing: {
        section: "6rem",
        container: "1.5rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
