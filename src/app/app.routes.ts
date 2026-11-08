import { Routes } from '@angular/router';
import { buildRouteMeta } from '@wawjs/ngx-default';
import { companyProfile } from './feature/company/company.data';

export const routes: Routes = [
	{
		path: '',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/'),
				titleSuffix: '',
			},
		},
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'practice',
		data: { meta: { ...buildRouteMeta(companyProfile, '/practice'), title: 'Практика' } },
		loadComponent: () => import('./pages/learning/learning.component').then((m) => m.LearningComponent),
	},
	{
		path: 'theory',
		data: { meta: { ...buildRouteMeta(companyProfile, '/theory'), title: 'Теорія' } },
		loadComponent: () => import('./pages/learning/learning.component').then((m) => m.LearningComponent),
	},
	{
		path: 'profile',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/profile'),
				title: 'Profile',
			},
		},
		loadComponent: () =>
			import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
