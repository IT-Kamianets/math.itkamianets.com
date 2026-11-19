import { useState } from 'react';
import { Link } from 'react-router-dom';
import { exercises } from '../data/exercises';
import MathText from './MathText';

const stats = [
  { icon: '📚', label: 'Тем вивчено', value: '0' },
  { icon: '🎯', label: "Задач розв'язано", value: '0' },
  { icon: '🔥', label: 'Днів поспіль', value: '1' },
];

export default function Home() {
  const [dailyExercise] = useState(() => exercises[Math.floor(Math.random() * exercises.length)]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const isCorrect = selectedAnswer === dailyExercise.correctAnswer;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-20">
        <div className="text-center md:text-left">
          <span className="eyebrow"><span className="eyebrow-dot" /> Математика · 5–9 класи</span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
            Твій шлях до математики починається <span className="text-orange-500">тут</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg md:mx-0">
            Вивчай теорію, розв'язуй задачі та відслідковуй свій прогрес у зручному форматі.
          </p>
          <Link
            to="/theory"
            className="button button--primary mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base"
          >
            Почати навчання <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full bg-orange-50" aria-hidden="true">
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-orange-200" />
          <div className="grid size-44 place-items-center rounded-[2.5rem] bg-white text-7xl font-bold tracking-tight text-orange-500 shadow-xl shadow-orange-100 sm:size-52">
            π
          </div>
          <span className="absolute left-3 top-1/4 -rotate-12 rounded-2xl bg-white px-4 py-3 text-2xl font-bold text-indigo-500 shadow-md">x²</span>
          <span className="absolute bottom-1/4 right-1 -rotate-6 rounded-2xl bg-white px-4 py-3 text-2xl font-bold text-emerald-500 shadow-md">÷</span>
          <span className="absolute bottom-8 left-1/4 rotate-6 rounded-2xl bg-white px-4 py-3 text-2xl font-bold text-amber-500 shadow-md">∑</span>
        </div>
      </section>

      <section className="mx-auto max-w-3xl pb-12" aria-labelledby="daily-task-title">
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 id="daily-task-title" className="text-2xl font-bold tracking-tight text-slate-800">Завдання дня 🔥</h2>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">Спробуй розв'язати</span>
          </div>

          <p className="text-lg font-semibold leading-relaxed text-slate-700">
            <MathText text={dailyExercise.question} />
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {dailyExercise.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === dailyExercise.correctAnswer;
              const stateClass = selectedAnswer === null
                ? 'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                : isSelected && isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : isSelected
                    ? 'border-rose-500 bg-rose-50 text-rose-800'
                    : !isCorrect && isCorrectOption
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-500';

              return (
                <button
                  key={`${dailyExercise.id}-${option}`}
                  type="button"
                  disabled={selectedAnswer !== null}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedAnswer(option)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-default ${stateClass}`}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-500" aria-hidden="true">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span><MathText text={option} /></span>
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div role="status" className={`mt-5 rounded-xl p-4 text-sm leading-relaxed ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              <p className="font-bold">{isCorrect ? 'Правильно!' : 'Не зовсім — правильна відповідь підсвічена зеленим.'}</p>
              <p className="mt-1"><MathText text={dailyExercise.explanation} /></p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-14" aria-labelledby="stats-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-orange-500">Твій прогрес</span>
            <h2 id="stats-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-800">Статистика</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-2xl bg-slate-100 p-5 sm:p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-sm" aria-hidden="true">{stat.icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
