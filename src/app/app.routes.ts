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
