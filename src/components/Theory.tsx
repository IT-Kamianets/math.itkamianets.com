import { Link, useParams } from 'react-router-dom';
import { topics } from '../data/topics';
import MathText from './MathText';

function TopicList() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="eyebrow"><span className="eyebrow-dot" /> Математика · 5–9 класи</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">Теорія математики</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Обирай тему, щоб повторити головні правила, поняття та формули.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/theory/${topic.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-xl font-bold text-orange-500" aria-hidden="true">π</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{topic.grade} клас</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-600">{topic.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">Відкрий коротке пояснення та основні формули теми.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
              Читати теорію <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TopicDetail({ topicId }: { topicId: string }) {
  const topic = topics.find((item) => item.id === topicId);

  if (!topic) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
        <span className="eyebrow"><span className="eyebrow-dot" /> Теорія математики</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">Тему не знайдено</h1>
        <p className="mt-3 text-slate-600">Схоже, такого уроку поки немає.</p>
        <Link to="/theory" className="button button--outline mt-6 inline-flex items-center justify-center">До всіх тем</Link>
      </section>
    );
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 md:py-14">
      <Link to="/theory" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600">
        <span aria-hidden="true">←</span> Усі теми
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-10 md:p-12">
        <span className="eyebrow"><span className="eyebrow-dot" /> {topic.grade} клас · Теорія</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">{topic.title}</h1>
        <div className="theory-prose mt-7 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
          {topic.theoryText.split(/\n\n+/).map((paragraph, index) => (
            <p key={index}><MathText text={paragraph} /></p>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-100 pt-7">
          <Link
            to={`/practice?topic=${encodeURIComponent(topic.id)}`}
            className="button button--primary inline-flex items-center justify-center gap-2"
          >
            Перейти до практики <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Theory() {
  const { topicId } = useParams();

  return topicId ? <TopicDetail topicId={topicId} /> : <TopicList />;
}
