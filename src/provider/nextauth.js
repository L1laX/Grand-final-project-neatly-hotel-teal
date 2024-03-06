"use client";

import { SessionProvider } from "next-auth/react";

export const CustomProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
