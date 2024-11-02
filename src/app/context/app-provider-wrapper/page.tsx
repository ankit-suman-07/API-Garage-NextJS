"use client";

import React from 'react';
import { ApiProvider } from '../api-context/page';

export default function ApiProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApiProvider>{children}</ApiProvider>;
}
