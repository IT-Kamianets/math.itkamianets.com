export default function Home() {
  return (
    <section className="home-hero mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 md:py-24">
      <div className="home-hero__copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> Математика · 5–9 класи</span>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
          Вітаємо в <span className="text-orange-500">MathLearn!</span>
        </h1>
        <p className="mt-5 text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
          Тут будуть щоденні завдання, статистика та твій прогрес. Відкривай математику крок за кроком — у власному темпі.
        </p>
        <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-normal text-slate-500 shadow-sm ring-1 ring-slate-100">
          <span aria-hidden="true">✨</span> Навчайся у власному темпі
        </div>
      </div>
    </section>
  );
}
