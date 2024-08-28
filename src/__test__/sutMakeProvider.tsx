import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { EquipmentProvider } from '@/hooks';

import { theme } from '@/styles';

export const sutMockProvider = (children: JSX.Element) => {
  return render(
    <ThemeProvider theme={theme}>
      <EquipmentProvider>{children}</EquipmentProvider>
    </ThemeProvider>
  );
};
