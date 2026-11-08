import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	{ path: '', renderMode: RenderMode.Prerender },
	{ path: 'practice', renderMode: RenderMode.Prerender },
	{ path: 'theory', renderMode: RenderMode.Prerender },
	{ path: 'profile', renderMode: RenderMode.Prerender },
];
