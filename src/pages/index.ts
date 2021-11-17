import Routing from './index.vue';

export const routes = [
    {path: '/', component: () => import('./tasks-list')}
];

export {Routing}