
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const themeIds = [
  "theme1",
  "theme2",
  "theme3",
  "theme4",
  "theme5",
  "theme6",
  "theme7",
  "theme8",
  "theme9",
  "theme10",
];

const savedTheme = localStorage.getItem("selectedTheme");

const initialTheme = themeIds.includes(savedTheme)
  ? savedTheme
  : "theme1";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0, gcTime: 0, refetchOnMount: 'always' },
  },
})

document.documentElement.classList.remove(...themeIds);
document.documentElement.classList.add(initialTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
