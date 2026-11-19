import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/practice', label: 'Практика' },
  { to: '/theory', label: 'Теорія' },
  { to: '/profile', label: 'Профіль' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="MathLearn — головна" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true">📐</span>
          <span><span className="brand-math">Math</span><span className="brand-learn">Learn</span></span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Основна навігація">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
