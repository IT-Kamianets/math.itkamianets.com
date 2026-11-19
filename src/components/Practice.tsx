import { useSearchParams } from 'react-router-dom';
import { topics } from '../data/topics';
import PagePlaceholder from './PagePlaceholder';

export default function Practice() {
  const [searchParams] = useSearchParams();
  const selectedTopic = topics.find((topic) => topic.id === searchParams.get('topic'));

  return (
    <PagePlaceholder
      title={selectedTopic ? `Практика: ${selectedTopic.title}` : 'Час практикуватися!'}
      description={selectedTopic
        ? `Тут будуть математичні вправи з теми «${selectedTopic.title}» для ${selectedTopic.grade} класу.`
        : 'Тут будуть математичні вправи: тести, рівняння, пошук помилок та покрокові задачі.'}
      eyebrow={selectedTopic ? `${selectedTopic.grade} клас · Практика` : undefined}
    />
  );
}
