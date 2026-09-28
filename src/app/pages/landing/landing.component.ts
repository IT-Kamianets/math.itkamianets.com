import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Skill = 'add' | 'subtract' | 'multiply';

interface SkillMeta {
	title: string;
	symbol: string;
}

const SKILL_META: Record<Skill, SkillMeta> = {
	add: { title: 'Addition adventure', symbol: '+' },
	subtract: { title: 'Subtraction mission', symbol: '−' },
	multiply: { title: 'Multiply power', symbol: '×' },
};

@Component({
	selector: 'app-landing',
	imports: [FormsModule],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
})
export class LandingComponent {
	protected readonly skill = signal<Skill>('add');
	protected readonly round = signal(1);
	protected readonly xp = signal(0);
	protected readonly a = signal(0);
	protected readonly b = signal(0);
	protected readonly feedback = signal('You’ve got this.');
	protected readonly feedbackState = signal<'' | 'good' | 'bad'>('');
	protected readonly coachCopy = signal('Take your time. Smart thinking beats fast guessing!');
	protected readonly demoMessage = signal('Pick your answer');
	protected readonly demoCorrect = signal<string | null>(null);

	private _answer = 0;
	protected answerInput = '';

	protected readonly skills: Skill[] = ['add', 'subtract', 'multiply'];
	protected readonly skillMeta = SKILL_META;

	constructor() {
		this._nextQuestion();
	}

	protected get skillTitle(): string {
		return SKILL_META[this.skill()].title;
	}

	protected get liveQuestion(): string {
		return `${this.a()} ${SKILL_META[this.skill()].symbol} ${this.b()} = ?`;
	}

	protected selectSkill(skill: Skill): void {
		this.skill.set(skill);
		this.round.set(1);
		this.feedbackState.set('');
		this.feedback.set('New mission loaded. Go for it!');
		this._nextQuestion();
	}

	protected submitAnswer(): void {
		const value = Number(this.answerInput);

		if (this.answerInput.trim() === '') {
			this.feedbackState.set('bad');
			this.feedback.set('Type an answer first.');
			return;
		}

		if (value === this._answer) {
			this.xp.update((xp) => xp + 20);
			this.feedbackState.set('good');
			this.feedback.set('Correct! +20 XP — stellar work!');
			this.coachCopy.set(
				this.xp() >= 100
					? 'Quest complete! You are ready for the next orbit.'
					: 'That strategy worked. Let’s try another!',
			);
			this.round.set(this.round() < 5 ? this.round() + 1 : 1);
			setTimeout(() => this._nextQuestion(), 850);
		} else {
			this.feedbackState.set('bad');
			this.feedback.set('Almost! Try once more—you’re learning.');
			this.coachCopy.set('Check the numbers and give it another shot.');
		}
	}

	protected tryDemoAnswer(value: string): void {
		const good = value === '15';
		this.demoMessage.set(good ? 'Yes! Stellar solve ✦' : 'Good try—have another look');
		this.demoCorrect.set(good ? value : null);
	}

	private _nextQuestion(): void {
		let a = Math.ceil(Math.random() * 10);
		let b = Math.ceil(Math.random() * 10);
		const skill = this.skill();

		if (skill === 'subtract' && b > a) {
			[a, b] = [b, a];
		}

		if (skill === 'multiply') {
			a = Math.ceil(Math.random() * 9);
			b = Math.ceil(Math.random() * 9);
		}

		this.a.set(a);
		this.b.set(b);
		this._answer = skill === 'add' ? a + b : skill === 'subtract' ? a - b : a * b;
		this.answerInput = '';
	}
}
