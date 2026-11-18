import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const links = [
  { to: '/', label: 'Головна', end: true },
  { to: '/practice', label: 'Практика' },
  { to: '/theory', label: 'Теорія' },
  { to: '/profile', label: 'Профіль' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink to="/" className="brand" aria-label="MathLearn — головна" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true">📐</span>
          <span><span className="brand-math">Math</span><span className="brand-learn">Learn</span></span>
        </NavLink>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Основна навігація">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Button variant="outline">Увійти</Button>
          <Button>Спробувати</Button>
        </div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
