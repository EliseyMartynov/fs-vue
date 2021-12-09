import {ActionContext} from 'vuex';
import {normalize, schema} from 'normalizr';
import {typicodeApi} from 'shared/api'
import type { Task } from "shared/api";

export const NAMESPACE = 'tasks';

export type QueryConfig = {
    completed?: boolean;
    userId?: number;
};

export const taskSchema = new schema.Entity(NAMESPACE);
export const normalizeTask = (data: Task) => normalize(data, taskSchema);
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema]);

// namespaced is cool thing for large projects
// furthermore we hide this logic from Public API
// and exporting ready-to-use actions/mutations/etc..
// that don't depend on namespacing
// our rest code should work both with namespaced true or false
const IS_NAMESPACED = true; // so if we would turn it to false - everything will work the same :)

export const initialState: Record<string, any> = {};

export const module = {
    namespaced: IS_NAMESPACED,
    state: {
        data: initialState,
        isListLoading: false,
        isDetailsLoading: false,
        queryConfig: {}
    },
    getters: {
        isTasksListEmpty: (state: any) => state.data.length === 0,
        filteredTasks: (state: any) => Object.values(state.data).filter((task: any) => (
            state.queryConfig.completed === undefined ||
                task?.completed === state.queryConfig.completed
        )),
        useTask: (state: any) => (taskId: any) => state.data[taskId]
    },
    mutations: {
        setTasksList: (state: any, response: any) => {
            // temprorary filtered because my laptop has 6gb...
            state.data = normalizeTasks(response?.data).entities[NAMESPACE];
        },
        setListLoading: (state: any, isLoading: any) => {
            state.isListLoading = isLoading;
        },
        setDetailsLoading: (state: any, isLoading: any) => {
            state.isDetailsLoading = isLoading;
        },
        addTaskToList: (state: any, response: any) => {
            state.data = {...state.date, ...normalizeTask(response?.data).entities[NAMESPACE]}
        },
        toggleTask: (state: any, taskId: any) => {
            const task = state.data[taskId];
            const newData = {
                ...state.data,
                [taskId]: { ...task, completed: !task.completed }
            }
            state.data = newData;
        },
        setQueryConfig: (state: any, payload: any) => {
            state.queryConfig = payload;
        }
    },
    actions: {
        getTasksListAsync: async ({commit}: any, params: typicodeApi.tasks.GetTasksListParams) => {
            commit('setListLoading', true);
            try {
                commit('setTasksList', await typicodeApi.tasks.getTasksList(params));
            } finally {
                commit('setListLoading', false);
            }
        },
        getTaskByIdAsync: async ({commit}: any, params: typicodeApi.tasks.GetTaskByIdParams) => {
            commit('setDetailsLoading', true);
            try {
                commit('addTaskToList', await typicodeApi.tasks.getTaskById(params));
            } finally {
                commit('setDetailsLoading', false);
            }
        },
    }
}

// Remember? our rest code should work both with namespaced true or false
const withPrefix = (name: string) => IS_NAMESPACED ? `${NAMESPACE}/${name}` : name

export const actions = {
    getTasksListAsync: withPrefix('getTasksListAsync'),
    getTaskByIdAsync: withPrefix('getTaskByIdAsync')
}

export const mutations = {
    toggleTask: withPrefix('toggleTask'),
    setQueryConfig: withPrefix('setQueryConfig')
}

export const getters = {
    isTasksListEmpty: withPrefix('isTasksListEmpty'),
    filteredTasks: withPrefix('filteredTasks'),
    useTask: withPrefix('useTask')
}