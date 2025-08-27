import { lazy } from 'react';
const Home = lazy(() => import('@pages/Home'));






interface RouteData {
	id: number;
	path: string;
	component: React.LazyExoticComponent<React.ComponentType<any>>;
}


export const Data: RouteData[] = [
	{
		id: 1,
		path: '/',
		component: Home,
	},
];
