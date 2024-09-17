
import React, { PropsWithChildren } from 'react';

import { AppStateProvider } from '@/context/appState';

export type ProvidersProps = {
   children: React.ReactNode;
};

export default function Providers({ children }: PropsWithChildren) {
   return (
      <AppStateProvider>
         {children}
      </AppStateProvider>
   );
}
