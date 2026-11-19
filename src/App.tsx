import { Route, Routes, useNavigate } from 'react-router-dom';
import Button from './components/Button';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PagePlaceholder from './components/PagePlaceholder';
import Practice from './components/Practice';
import Theory from './components/Theory';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <span className="not-found-code">404</span>
      <h1>Схоже, ця сторінка загубилася</h1>
      <p>Такої сторінки немає. Повернімося до математики?</p>
      <Button onClick={() => navigate('/')}>На головну</Button>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/theory/:topicId" element={<Theory />} />
          <Route path="/profile" element={<PagePlaceholder title="Твій математичний профіль" description="Тут будуть твій рейтинг, статистика, бали та досягнення." />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer"><span>© 2026 MathLearn</span><span>Математика для 5–9 класів</span></footer>
    </div>
  );
}
