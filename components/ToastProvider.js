"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#1a1a1a",
          padding: "16px",
          borderRadius: "9999px",
          border: "1px solid #FFE4E9",
          boxShadow: "0 4px 6px -1px rgba(233, 30, 99, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#E91E63",
            secondary: "#fff",
          },
          style: {
            border: "2px solid #E91E63",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            border: "2px solid #ef4444",
          },
        },
        loading: {
          iconTheme: {
            primary: "#E91E63",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
