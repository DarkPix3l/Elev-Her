"use client"; 

import { SessionProvider } from 'next-auth/react';

export function SessionProviderClientWrapper({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
};