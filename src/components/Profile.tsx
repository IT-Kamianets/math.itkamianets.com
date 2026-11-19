import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';

const achievements = [
  { icon: '🏆', title: 'Перший крок', description: 'Пройдено перше завдання', unlocked: true },
  { icon: '🥇', title: 'Майстер практики', description: 'Влучні відповіді одна за одною', unlocked: true },
  { icon: '🔥', title: 'Тиждень без помилок', description: 'Сім днів математичних перемог', unlocked: true },
  { icon: '📚', title: 'Книжковий черв’як', description: 'Вивчено десять тем', unlocked: false },
  { icon: '🎯', title: 'Точне влучання', description: 'Двадцять правильних відповідей', unlocked: false },
  { icon: '🧠', title: 'Мислитель', description: 'Розв’язано складний рівень', unlocked: false },
];

function getAuthErrorMessage(error: unknown) {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? error.code
    : undefined;

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Вікно входу було закрито. Спробуй ще раз.';
    case 'auth/popup-blocked':
      return 'Браузер заблокував спливаюче вікно. Дозволь його та повтори спробу.';
    case 'auth/unauthorized-domain':
      return 'Цей домен ще не дозволений у налаштуваннях Firebase Authentication.';
    case 'auth/operation-not-allowed':
      return 'Вхід через Google ще не ввімкнено у Firebase Authentication.';
    default:
      return 'Не вдалося виконати вхід. Перевір з’єднання та спробуй ще раз.';
  }
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(
    auth,
    (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    },
    (error) => {
      setAuthError(getAuthErrorMessage(error));
      setAuthLoading(false);
    },
  ), []);

  async function handleGoogleSignIn() {
    setAuthError(null);
    setAuthBusy(true);

    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut() {
    setAuthError(null);
    setAuthBusy(true);

    try {
      await signOut(auth);
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:py-14">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-orange-500">Твій простір</span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Мій профіль</h1>
        </div>
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            disabled={authLoading || authBusy}
            className="button button--outline inline-flex items-center justify-center disabled:cursor-wait disabled:opacity-60"
          >
            {authBusy ? 'Зачекай…' : 'Вийти'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authLoading || authBusy}
            className="button button--primary inline-flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60"
          >
            <span className="grid size-6 place-items-center rounded-full bg-white text-sm font-extrabold text-blue-600" aria-hidden="true">G</span>
            {authLoading ? 'Перевіряємо вхід…' : authBusy ? 'Входимо…' : 'Увійти через Google'}
          </button>
        )}
      </header>

      {authError && (
        <p role="alert" className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {authError}
        </p>
      )}

      <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-full bg-orange-500 text-5xl shadow-lg shadow-orange-200 sm:size-28 sm:text-6xl" aria-label={user?.displayName ? `Аватар: ${user.displayName}` : 'Аватар: лисеня'}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : '🦊'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">{user?.displayName || 'Юний Математик'}</h2>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">Рівень 5</span>
            </div>
            <p className="mt-2 text-slate-500">7 клас <span className="px-1 text-slate-300" aria-hidden="true">·</span> {user?.email || 'Продовжуй відкривати математику'}</p>

            <div className="mt-6 max-w-2xl">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-slate-700">Досвід до наступного рівня</span>
                <span className="font-bold text-orange-600">225 / 375 XP</span>
              </div>
              <div
                className="h-3 overflow-hidden rounded-full bg-orange-100"
                role="progressbar"
                aria-label="Прогрес до наступного рівня"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={60}
              >
                <div className="h-full w-3/5 rounded-full bg-orange-500" />
              </div>
              <p className="mt-2 text-sm text-slate-500">До наступного рівня залишилося <span className="font-bold text-slate-700">150 XP</span></p>
            </div>
          </div>
        </div>
      </article>

      <section className="mt-10" aria-labelledby="achievements-title">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-orange-500">Маленькі перемоги</span>
            <h2 id="achievements-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Мої досягнення</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-sm">3 з 6 відкрито</span>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <article
              key={achievement.title}
              className={`rounded-2xl border p-5 text-center transition-shadow ${achievement.unlocked
                ? 'border-orange-100 bg-white shadow-sm hover:shadow-md'
                : 'border-slate-200 bg-slate-100 opacity-50 grayscale'
              }`}
              aria-label={`${achievement.title}: ${achievement.unlocked ? 'отримано' : 'заблоковано'}`}
            >
              <span className={`mx-auto grid size-16 place-items-center rounded-2xl text-3xl ${achievement.unlocked ? 'bg-orange-50' : 'bg-slate-200'}`} aria-hidden="true">
                {achievement.icon}
              </span>
              <h3 className="mt-4 font-bold leading-snug text-slate-800">{achievement.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{achievement.description}</p>
              {!achievement.unlocked && <span className="mt-3 inline-block text-xs font-semibold text-slate-400">Заблоковано</span>}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10 flex justify-center">
        <Link to="/practice" className="button button--primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base">
          Продовжити навчання <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
