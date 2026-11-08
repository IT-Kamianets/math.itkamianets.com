import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Skill = 'add' | 'subtract' | 'multiply' | 'equation';
type Challenge = 'quick' | 'equation' | 'mistake' | 'steps';

const SKILLS: Record<Skill, { title: string; symbol: string }> = {
	add: { title: 'Додавання', symbol: '+' },
	subtract: { title: 'Віднімання', symbol: '−' },
	multiply: { title: 'Множення', symbol: '×' },
	equation: { title: 'Рівняння', symbol: 'x' },
};

@Component({
	selector: 'app-landing',
	imports: [FormsModule],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
})
export class LandingComponent {
	protected readonly skill = signal<Skill>('add');
	protected readonly challenge = signal<Challenge>('quick');
	protected readonly round = signal(1);
	protected readonly xp = signal(680);
	protected readonly rating = computed(() => Math.max(1, 128 - Math.floor((this.xp() - 680) / 20) * 2));
	protected readonly correct = signal(18);
	protected readonly streak = signal(5);
	protected readonly a = signal(8);
	protected readonly b = signal(7);
	protected readonly answer = signal(15);
	protected readonly feedback = signal('Обери відповідь або введи власну');
	protected readonly feedbackState = signal<'' | 'good' | 'bad'>('');
	protected readonly hint = signal('Рахуй крок за кроком — у тебе все вийде!');
	protected readonly theoryTab = signal<'fractions' | 'equations' | 'geometry'>('fractions');
	protected readonly skillMeta = SKILLS;
	protected readonly skills: Skill[] = ['add', 'subtract', 'multiply', 'equation'];
	protected readonly challengeTypes: { id: Challenge; title: string; icon: string }[] = [
		{ id: 'quick', title: 'Тест', icon: '✳' },
		{ id: 'equation', title: 'Рівняння', icon: 'x' },
		{ id: 'mistake', title: 'Знайди помилку', icon: '⌕' },
		{ id: 'steps', title: 'Задача', icon: '↗' },
	];
	protected readonly answerInput = signal('');
	protected readonly liveQuestion = computed(() => {
		const selected = this.skillMeta[this.skill()];
		if (this.challenge() === 'equation') return `x + ${this.b()} = ${this.a() + this.b()}`;
		if (this.challenge() === 'mistake') return `${this.a()} + ${this.b()} = ${this.a() + this.b() + 1}`;
		if (this.challenge() === 'steps') return `Було ${this.a()} яблук. Додали ${this.b()}. Скільки стало?`;
		return `${this.a()} ${selected.symbol} ${this.b()} = ?`;
	});
	protected readonly skillTitle = computed(() => this.challengeTypes.find((item) => item.id === this.challenge())?.title ?? 'Тест');

	protected selectSkill(skill: Skill): void {
		this.skill.set(skill);
		this.challenge.set(skill === 'equation' ? 'equation' : 'quick');
		this.round.set(1);
		this.feedbackState.set('');
		this.feedback.set('Нове завдання вже готове!');
		this._nextQuestion();
	}

	protected selectChallenge(challenge: Challenge): void {
		this.challenge.set(challenge);
		this.skill.set(challenge === 'equation' ? 'equation' : 'add');
		this.feedbackState.set('');
		this.feedback.set('Спробуй розв’язати завдання');
	}

	protected submitAnswer(value = this.answerInput()): void {
		if (value.trim() === '') {
			this.feedbackState.set('bad');
			this.feedback.set('Введи відповідь, перш ніж перевіряти');
			return;
		}
		const expected = this.challenge() === 'equation' ? this.b() : this.answer();
		const foundError = this.challenge() === 'mistake' && value === 'так';
		const isCorrect = this.challenge() === 'mistake' ? foundError : Number(value) === expected;
		if (isCorrect) {
			const earned = this.challenge() === 'steps' ? 30 : 20;
			this.xp.update((xp) => xp + earned);
			this.correct.update((count) => count + 1);
			this.feedbackState.set('good');
			this.feedback.set(`Правильно! +${earned} балів ✨`);
			this.hint.set(this.challenge() === 'mistake' ? 'Так! Тут забули додати одиницю до суми.' : `Чудова робота! Ти впорався за ${this.round()} завдань.`);
			this.round.update((round) => round >= 5 ? 1 : round + 1);
			if (this.challenge() === 'quick') setTimeout(() => this._nextQuestion(), 750);
		} else {
			this.feedbackState.set('bad');
			this.feedback.set('Ще одна спроба — розберімося разом');
			this.hint.set(this.challenge() === 'mistake' ? 'Порівняй обидві частини: чи правильно пораховано суму?' : `Підказка: ${this.a()} та ${this.b()} — це числа з умови. Перевір обчислення.`);
		}
	}

	protected checkChoice(value: number): void {
		if (value === 15) {
			this.xp.update((xp) => xp + 20);
			this.feedbackState.set('good');
			this.feedback.set('Так! 8 + 7 = 15 — чудовий початок!');
		} else {
			this.feedbackState.set('bad');
			this.feedback.set('Майже! Спробуй ще раз 😊');
		}
	}

	protected setTheory(tab: 'fractions' | 'equations' | 'geometry'): void { this.theoryTab.set(tab); }
	protected setTaskAnswer(value: string): void { this.answerInput.set(value); }

	private _nextQuestion(): void {
		const skill = this.skill();
		let a = Math.ceil(Math.random() * 12);
		let b = Math.ceil(Math.random() * 12);
		if (skill === 'subtract' && b > a) [a, b] = [b, a];
		if (skill === 'multiply') { a = Math.ceil(Math.random() * 9); b = Math.ceil(Math.random() * 9); }
		this.a.set(a);
		this.b.set(b);
		this.answer.set(skill === 'add' ? a + b : skill === 'subtract' ? a - b : skill === 'multiply' ? a * b : b);
		this.answerInput.set('');
	}
}
