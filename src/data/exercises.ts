export type Exercise = {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const exercises: Exercise[] = [
  {
    id: 'fractions-1', topicId: 'fractions', question: 'Обчисли: $\\frac{2}{7} + \\frac{3}{7}$.',
    options: ['$\\frac{5}{7}$', '$\\frac{5}{14}$', '$\\frac{6}{7}$', '$\\frac{1}{7}$'], correctAnswer: '$\\frac{5}{7}$',
    explanation: 'Знаменники однакові, тому додаємо чисельники: $2 + 3 = 5$, а знаменник $7$ залишаємо.',
  },
  {
    id: 'fractions-2', topicId: 'fractions', question: 'Який дріб дорівнює $\\frac{6}{8}$ після скорочення?',
    options: ['$\\frac{3}{4}$', '$\\frac{2}{3}$', '$\\frac{4}{5}$', '$\\frac{6}{4}$'], correctAnswer: '$\\frac{3}{4}$',
    explanation: 'Поділимо чисельник і знаменник на їхній спільний дільник $2$: $\\frac{6}{8} = \\frac{3}{4}$.',
  },
  {
    id: 'fractions-3', topicId: 'fractions', question: 'Який дріб більший: $\\frac{3}{5}$ чи $\\frac{4}{5}$?',
    options: ['$\\frac{4}{5}$', '$\\frac{3}{5}$', 'Вони рівні', 'Неможливо порівняти'], correctAnswer: '$\\frac{4}{5}$',
    explanation: 'За однакових знаменників більший той дріб, у якого більший чисельник. Оскільки $4 > 3$, то $\\frac{4}{5} > \\frac{3}{5}$.',
  },
  {
    id: 'decimals-1', topicId: 'decimals', question: 'Обчисли: $1{,}2 + 0{,}35$.',
    options: ['1,55', '1,37', '0,47', '1,25'], correctAnswer: '1,55',
    explanation: 'Запишемо $1{,}2$ як $1{,}20$ і додамо числа з комами одна під одною: $1{,}20 + 0{,}35 = 1{,}55$.',
  },
  {
    id: 'decimals-2', topicId: 'decimals', question: 'Обчисли: $3{,}6 - 1{,}25$.',
    options: ['2,35', '2,45', '1,35', '2,25'], correctAnswer: '2,35',
    explanation: '$3{,}6 = 3{,}60$, тому $3{,}60 - 1{,}25 = 2{,}35$.',
  },
  {
    id: 'decimals-3', topicId: 'decimals', question: 'Який запис дорівнює $0{,}4$ у сотих?',
    options: ['0,40', '0,04', '0,4000', '4,00'], correctAnswer: '0,40',
    explanation: 'У числі $0{,}4$ є чотири десятих, тобто сорок сотих: $0{,}4 = 0{,}40$.',
  },
  {
    id: 'percentages-1', topicId: 'percentages', question: 'Скільки становить $15\\%$ від $200$?',
    options: ['30', '15', '20', '35'], correctAnswer: '30',
    explanation: '$15\\% = 0{,}15$, тому $200 \\cdot 0{,}15 = 30$.',
  },
  {
    id: 'percentages-2', topicId: 'percentages', question: 'Який дріб відповідає $25\\%$?',
    options: ['$\\frac{1}{4}$', '$\\frac{1}{5}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$'], correctAnswer: '$\\frac{1}{4}$',
    explanation: '$25\\% = \\frac{25}{100}$. Скоротивши дріб на $25$, отримуємо $\\frac{1}{4}$.',
  },
  {
    id: 'percentages-3', topicId: 'percentages', question: 'Ціну $80$ грн збільшили на $10\\%$. Яка стала ціна?',
    options: ['88 грн', '90 грн', '81 грн', '72 грн'], correctAnswer: '88 грн',
    explanation: '$10\\%$ від $80$ — це $8$ грн. Додаємо надбавку: $80 + 8 = 88$ грн.',
  },
  {
    id: 'proportions-1', topicId: 'proportions', question: 'Знайди $x$: $\\frac{x}{3} = \\frac{4}{6}$.',
    options: ['2', '3', '4', '8'], correctAnswer: '2',
    explanation: '$\\frac{4}{6} = \\frac{2}{3}$, отже $\\frac{x}{3} = \\frac{2}{3}$ і $x = 2$.',
  },
  {
    id: 'proportions-2', topicId: 'proportions', question: 'Знайди $x$: $\\frac{2}{5} = \\frac{x}{20}$.',
    options: ['8', '5', '10', '4'], correctAnswer: '8',
    explanation: 'За основною властивістю пропорції $2 \\cdot 20 = 5x$. Тоді $40 = 5x$, отже $x = 8$.',
  },
  {
    id: 'proportions-3', topicId: 'proportions', question: 'Знайди $x$, якщо $3:4 = 6:x$.',
    options: ['8', '7', '12', '4'], correctAnswer: '8',
    explanation: 'Запишемо пропорцію $\\frac{3}{4} = \\frac{6}{x}$. Перемноживши навхрест, маємо $3x = 24$, тому $x = 8$.',
  },
  {
    id: 'linear-equations-1', topicId: 'linear-equations', question: 'Розв’яжи рівняння: $2x + 6 = 14$.',
    options: ['4', '10', '5', '3'], correctAnswer: '4',
    explanation: 'Віднімемо $6$ з обох частин: $2x = 8$. Поділимо на $2$: $x = 4$.',
  },
  {
    id: 'linear-equations-2', topicId: 'linear-equations', question: 'Розв’яжи рівняння: $5x - 3 = 12$.',
    options: ['3', '5', '2', '15'], correctAnswer: '3',
    explanation: 'Додамо $3$ до обох частин: $5x = 15$. Поділимо на $5$: $x = 3$.',
  },
  {
    id: 'linear-equations-3', topicId: 'linear-equations', question: 'Розв’яжи рівняння: $3(x + 2) = 21$.',
    options: ['5', '7', '9', '3'], correctAnswer: '5',
    explanation: 'Поділимо обидві частини на $3$: $x + 2 = 7$. Віднімемо $2$: $x = 5$.',
  },
  {
    id: 'powers-1', topicId: 'powers', question: 'Чому дорівнює $2^3$?',
    options: ['8', '6', '9', '5'], correctAnswer: '8',
    explanation: '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$.',
  },
  {
    id: 'powers-2', topicId: 'powers', question: 'Спрости вираз: $3^2 \\cdot 3^4$.',
    options: ['$3^6$', '$9^6$', '$3^8$', '$3^2$'], correctAnswer: '$3^6$',
    explanation: 'Під час множення степенів з однаковою основою показники додаються: $3^2 \\cdot 3^4 = 3^{2+4} = 3^6$.',
  },
  {
    id: 'powers-3', topicId: 'powers', question: 'Чому дорівнює $10^0$?',
    options: ['1', '0', '10', '100'], correctAnswer: '1',
    explanation: 'Будь-яке ненульове число в нульовому степені дорівнює $1$, тому $10^0 = 1$.',
  },
  {
    id: 'pythagorean-theorem-1', topicId: 'pythagorean-theorem', question: 'Катети прямокутного трикутника дорівнюють $3$ і $4$. Знайди гіпотенузу.',
    options: ['5', '6', '7', '4'], correctAnswer: '5',
    explanation: 'За теоремою Піфагора $c^2 = 3^2 + 4^2 = 9 + 16 = 25$, отже $c = 5$.',
  },
  {
    id: 'pythagorean-theorem-2', topicId: 'pythagorean-theorem', question: 'Катети дорівнюють $5$ і $12$. Яка довжина гіпотенузи?',
    options: ['13', '17', '12', '10'], correctAnswer: '13',
    explanation: '$c^2 = 5^2 + 12^2 = 25 + 144 = 169$, тому $c = \\sqrt{169} = 13$.',
  },
  {
    id: 'pythagorean-theorem-3', topicId: 'pythagorean-theorem', question: 'Гіпотенуза дорівнює $10$, один катет — $6$. Знайди другий катет.',
    options: ['8', '4', '6', '16'], correctAnswer: '8',
    explanation: 'За теоремою Піфагора другий катет $b = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$.',
  },
  {
    id: 'functions-1', topicId: 'functions', question: 'Для функції $y = 2x + 1$ знайди $y$, якщо $x = 3$.',
    options: ['7', '6', '5', '8'], correctAnswer: '7',
    explanation: 'Підставимо $x = 3$: $y = 2 \\cdot 3 + 1 = 7$.',
  },
  {
    id: 'functions-2', topicId: 'functions', question: 'Для функції $y = -x + 4$ знайди $y$, якщо $x = 2$.',
    options: ['2', '6', '-2', '4'], correctAnswer: '2',
    explanation: 'Підставимо $x = 2$: $y = -2 + 4 = 2$.',
  },
  {
    id: 'functions-3', topicId: 'functions', question: 'Яка точка лежить на графіку функції $y = 3x$?',
    options: ['(2; 6)', '(2; 5)', '(3; 6)', '(1; 2)'], correctAnswer: '(2; 6)',
    explanation: 'Для точки $(2; 6)$ маємо $3x = 3 \\cdot 2 = 6$, що дорівнює $y$.',
  },
  {
    id: 'quadratic-equations-1', topicId: 'quadratic-equations', question: 'Знайди корені рівняння $x^2 - 5x + 6 = 0$.',
    options: ['2 і 3', '1 і 6', '-2 і -3', '2 і 5'], correctAnswer: '2 і 3',
    explanation: 'Розкладемо на множники: $x^2 - 5x + 6 = (x - 2)(x - 3)$. Тому $x = 2$ або $x = 3$.',
  },
  {
    id: 'quadratic-equations-2', topicId: 'quadratic-equations', question: 'Знайди дискримінант рівняння $x^2 + 3x + 2 = 0$.',
    options: ['1', '9', '17', '0'], correctAnswer: '1',
    explanation: 'Тут $a = 1$, $b = 3$, $c = 2$. Тоді $D = b^2 - 4ac = 9 - 8 = 1$.',
  },
  {
    id: 'quadratic-equations-3', topicId: 'quadratic-equations', question: 'Розв’яжи рівняння $x^2 = 49$.',
    options: ['$x = -7$ або $x = 7$', '$x = 7$', '$x = -49$ або $x = 49$', '$x = 0$'], correctAnswer: '$x = -7$ або $x = 7$',
    explanation: 'І $7^2$, і $(-7)^2$ дорівнюють $49$, тому рівняння має два корені: $x = -7$ та $x = 7$.',
  },
  {
    id: 'similar-triangles-1', topicId: 'similar-triangles', question: 'Коефіцієнт подібності дорівнює $2$. Сторона меншого трикутника — $3$ см. Яка відповідна сторона більшого?',
    options: ['6 см', '5 см', '1,5 см', '9 см'], correctAnswer: '6 см',
    explanation: 'Відповідні сторони збільшуються у $2$ рази: $3 \\cdot 2 = 6$ см.',
  },
  {
    id: 'similar-triangles-2', topicId: 'similar-triangles', question: 'Відповідні сторони подібних трикутників дорівнюють $4$ см і $6$ см. Який коефіцієнт подібності від меншого до більшого?',
    options: ['1,5', '2', '0,5', '10'], correctAnswer: '1,5',
    explanation: 'Коефіцієнт подібності — це відношення відповідних сторін: $k = \\frac{6}{4} = 1{,}5$.',
  },
  {
    id: 'similar-triangles-3', topicId: 'similar-triangles', question: 'У трикутнику два кути дорівнюють $50^\\circ$ і $60^\\circ$. Чому дорівнює третій кут?',
    options: ['70°', '60°', '80°', '50°'], correctAnswer: '70°',
    explanation: 'Сума кутів трикутника дорівнює $180^\\circ$: $180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$.',
  },
];
