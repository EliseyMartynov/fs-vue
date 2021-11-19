import {taskModel} from 'entities/task';

export type Filter = {
    id: number;
    title: string;
    config: taskModel.QueryConfig;
}

export const filters: Record<number, Filter> = {
    1: {
        id: 1,
        title: 'All',
        config: {}
    },
    2: {
        id: 2,
        title: "Opened",
        config: { completed: false }
    },
    3: {
        id: 3,
        title: "Closed",
        config: { completed: true }
    }
};

export const DEFAULT_FILTER = 1;

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];