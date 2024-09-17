import { render } from '@testing-library/react';
import React from 'react';

import MenuIcon from '@/components/menu/components/menuIcon';
import '@testing-library/jest-dom';

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />;

describe('MenuIcon Component', () => {
  it('should render the icon when Icon prop is provided', () => {
    render(<MenuIcon Icon={MockIcon} />);
  });

});
