import { render, screen } from '@testing-library/react';

import { DynamicTable } from '@/components/table';
import '@testing-library/jest-dom';

const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
];

describe('DynamicTable Component', () => {
  it('should render the table with data and columns', () => {
    render(<DynamicTable header={{ title: 'Test Table' }} data={mockData} columns={columns} />);

    expect(screen.getByText('Test Table')).toBeInTheDocument();

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('should render backButton and actionComponent if provided', () => {
    render(
      <DynamicTable
        header={{ title: 'Test Table', actionComponent: <button>Action</button> }}
        backButton={<button>Back</button>}
        data={mockData}
        columns={columns}
      />
    );

    expect(screen.getByText('Back')).toBeInTheDocument();

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should render search input component if provided', () => {
    render(
      <DynamicTable
        header={{ title: 'Test Table' }}
        searchInputComponent={<input placeholder="Search" />}
        data={mockData}
        columns={columns}
      />
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});
