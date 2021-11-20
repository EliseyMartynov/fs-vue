import Routing from './index.vue';

export const routes = [
    {path: '/', component: () => import('./tasks-list')},
    {path: '/:id', component: () => import('./task-details')}
];

export {Routing}