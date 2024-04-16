import { Home, Popular } from '../pages';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import { ROUTES } from './constants';
import { element } from 'prop-types';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />,
        children: [
            { path: ROUTES.HOME, element: <Home />},
            { path: ROUTES.POPULAR, element: <Popular />},
        ]
    },
    {
        path: '/login', element: <PublicRouter />,
        children: [
            { path: '/login', element: <div> Login </div>},
        ]
    },
];

export const router = createBrowserRouter(routes);