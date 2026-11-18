type PagePlaceholderProps = { title: string; description: string; eyebrow?: string };

export default function PagePlaceholder({ title, description, eyebrow = 'Твій простір для математики' }: PagePlaceholderProps) {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> Математика · 5–9 класи</span>
        <h1 id="page-title">{title}</h1>
        <p className="hero-description">{description}</p>
      </div>
      <div className="placeholder-card">
        <div className="placeholder-art" aria-hidden="true">
          <span className="art-circle art-circle--one">＋</span>
          <span className="art-circle art-circle--two">÷</span>
          <span className="art-circle art-circle--three">×</span>
          <span className="art-star">✦</span>
          <span className="art-shape">△</span>
        </div>
        <div className="placeholder-message">
          <span className="placeholder-label">{eyebrow}</span>
          <h2>Тут скоро з’явиться контент</h2>
          <p>Ми вже готуємо для тебе щось цікаве. Зазирни сюди трохи пізніше!</p>
        </div>
      </div>
      <div className="grade-note"><span aria-hidden="true">✨</span> Навчайся у власному темпі — крок за кроком</div>
    </section>
  );
}
