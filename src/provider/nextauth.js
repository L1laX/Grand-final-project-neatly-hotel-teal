"use client";

import { SessionProvider } from "next-auth/react";

export const CustomProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
