import React from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
   </NotificationProvider>
  );
}
