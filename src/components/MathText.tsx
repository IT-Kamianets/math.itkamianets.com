import katex from 'katex';

type MathTextProps = { text: string };

export default function MathText({ text }: MathTextProps) {
  const parts: Array<{ content: string; isMath: boolean; displayMode?: boolean }> = [];
  const expression = /\$\$([\s\S]+?)\$\$|\$([^$\n]+)\$/g;
  let cursor = 0;

  for (const match of text.matchAll(expression)) {
    const index = match.index ?? cursor;
    if (index > cursor) {
      parts.push({ content: text.slice(cursor, index), isMath: false });
    }

    const displayMode = match[1] !== undefined;
    parts.push({
      content: displayMode ? match[1] : match[2],
      isMath: true,
      displayMode,
    });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    parts.push({ content: text.slice(cursor), isMath: false });
  }

  return (
    <>
      {parts.map((part, index) =>
        part.isMath ? (
          <span
            key={index}
            className={part.displayMode ? 'math-formula math-formula--display' : 'math-formula'}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part.content, {
                displayMode: part.displayMode,
                throwOnError: false,
                strict: 'ignore',
              }),
            }}
          />
        ) : (
          <span key={index}>{part.content}</span>
        ),
      )}
    </>
  );
}
