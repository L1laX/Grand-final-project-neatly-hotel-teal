"use client";

import { SessionProvider } from "next-auth/react";

export const CustomProvider = ({ children }) => {
  return (
    <SessionProvider basePath={process.env.NEXTAUTH_URL}>
      {children}
    </SessionProvider>
  );
};
