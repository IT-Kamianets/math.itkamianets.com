import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { exercises, type Exercise } from '../data/exercises';
import { topics } from '../data/topics';
import MathText from './MathText';

type PracticeSessionProps = {
  items: Exercise[];
  topicTitle?: string;
};

function PracticeSession({ items, topicTitle }: PracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const total = items.length;
  const currentExercise = items[currentIndex];
  const isComplete = currentIndex >= total;
  const isCorrect = selectedAnswer === currentExercise?.correctAnswer;
  if (total === 0) {
    return (
      <section className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8">
        <span className="eyebrow"><span className="eyebrow-dot" /> Практика</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">Для цієї теми ще немає завдань</h1>
        <Link to="/theory" className="button button--outline mt-7 inline-flex items-center justify-center">Обрати іншу тему</Link>
      </section>
    );
  }

  if (isComplete) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 md:py-16">
        <ProgressBar current={total} total={total} />
        <div className="mt-8 rounded-3xl border border-orange-100 bg-white px-6 py-12 text-center shadow-lg sm:px-12">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-orange-50 text-3xl" aria-hidden="true">🎉</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Вітаємо, ви пройшли рівень!</h1>
          <p className="mt-3 text-slate-600">
            {topicTitle ? `Тему «${topicTitle}» завершено.` : 'Усі завдання завершено.'} Чудова робота!
          </p>
          <Link to="/" className="button button--primary mt-8 inline-flex items-center justify-center">Повернутися на головну</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 md:py-14">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-slate-700">{topicTitle ? `Практика · ${topicTitle}` : 'Практика математики'}</span>
          <span className="shrink-0 text-slate-500">Залишилося {total - currentIndex} з {total}</span>
        </div>
        <ProgressBar current={currentIndex} total={total} />
      </div>

      <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-9">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="eyebrow"><span className="eyebrow-dot" /> Завдання {currentIndex + 1}</span>
          <span className="text-sm font-medium text-slate-400">{currentIndex + 1} / {total}</span>
        </div>

        <h1 className="text-xl font-bold leading-relaxed text-slate-800 sm:text-2xl">
          <MathText text={currentExercise.question} />
        </h1>

        <div className="mt-7 grid gap-3">
          {currentExercise.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === currentExercise.correctAnswer;
            const showCorrectOption = selectedAnswer !== null && !isCorrect && isCorrectOption;
            const stateClass = selectedAnswer === null
              ? 'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
              : isSelected && isCorrect
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : isSelected
                  ? 'border-rose-500 bg-rose-50 text-rose-800'
                  : showCorrectOption
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-500';

            return (
              <button
                key={option}
                type="button"
                disabled={selectedAnswer !== null}
                aria-pressed={isSelected}
                onClick={() => setSelectedAnswer(option)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-default ${stateClass}`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-500" aria-hidden="true">
                  {String.fromCharCode(65 + currentExercise.options.indexOf(option))}
                </span>
                <span><MathText text={option} /></span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div
            role="status"
            className={`mt-6 rounded-2xl p-4 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
          >
            <p className="font-bold">{isCorrect ? 'Правильно!' : 'Цього разу не вийшло. Ось пояснення:'}</p>
            <p className="mt-1 text-sm leading-relaxed"><MathText text={currentExercise.explanation} /></p>
          </div>
        )}

        {selectedAnswer !== null && (
          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setCurrentIndex((index) => index + 1);
                setSelectedAnswer(null);
              }}
              className="button button--primary inline-flex items-center justify-center gap-2"
            >
              Далі <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = total === 0 ? 0 : (current / total) * 100;

  return (
    <div
      className="h-2.5 overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      aria-label="Прогрес виконання завдань"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className="h-full rounded-full bg-orange-500 transition-[width] duration-300" style={{ width: `${percentage}%` }} />
    </div>
  );
}

export default function Practice() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic');
  const selectedTopic = topics.find((topic) => topic.id === topicId);

  if (topicId && !selectedTopic) {
    return (
      <section className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8">
        <span className="eyebrow"><span className="eyebrow-dot" /> Практика математики</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">Тему не знайдено</h1>
        <p className="mt-3 text-slate-600">Обери тему зі списку, щоб перейти до відповідних завдань.</p>
        <Link to="/theory" className="button button--outline mt-7 inline-flex items-center justify-center">До теорії</Link>
      </section>
    );
  }

  const sessionItems = topicId ? exercises.filter((exercise) => exercise.topicId === topicId) : exercises;

  return (
    <PracticeSession
      key={topicId ?? 'all-topics'}
      items={sessionItems}
      topicTitle={selectedTopic?.title}
    />
  );
}
