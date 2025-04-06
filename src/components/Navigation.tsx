import { Link, useLocation } from 'react-router-dom';
import { Map, List, Truck } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', icon: List, label: 'Lista' },
    { to: '/map', icon: Map, label: 'Mapa' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Truck className="h-6 w-6" />
            <span>Monitoramento Florestal</span>
          </Link>
          <div className="ml-auto flex gap-4">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                  ${location.pathname === to
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}