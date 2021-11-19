import {ActionContext} from 'vuex';
import {normalize, schema} from 'normalizr';
import {typicodeApi} from 'shared/api'
import type { Task } from "shared/api";

export const initialState: Record<string, any> = {};

export const NAMESPACE = 'tasks';

export type QueryConfig = {
    completed?: boolean;
    userId?: number;
};

export const taskSchema = new schema.Entity(NAMESPACE);
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema])

export const module = {
    state: {
        data: initialState,
        isListLoading: false,
        queryConfig: {}
    },
    getters: {
        isTasksListEmpty: (state: any) => state.data.length === 0,
        filteredTasks: (state: any) => Object.values(state.data).filter((task: any) => (
            state.queryConfig.completed === undefined ||
                task?.completed === state.queryConfig.completed
        ))
    },
    mutations: {
        setTasksList: (state: any, response: any) => {
            // temprorary filtered because my laptop has 6gb...
            state.data = normalizeTasks(response?.data.filter((_, i) => i < 20)).entities[NAMESPACE];
        },
        setListLoading: (state: any, isLoading: any) => {
            state.isListLoading = isLoading
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
            commit('setTasksList', await typicodeApi.tasks.getTasksList(params));
            commit('setListLoading', false);
        },
        getTaskByIdAsync: async ({commit}: any, params: typicodeApi.tasks.GetTaskByIdParams) => {
            await typicodeApi.tasks.getTaskById(params)
        },
    }
}

// since our module namespaced it would be helpful
export const actions = {
    getTasksListAsync: `${NAMESPACE}/getTasksListAsync`
}

export const mutations = {
    toggleTask: `${NAMESPACE}/toggleTask`,
    setQueryConfig: `${NAMESPACE}/setQueryConfig`
}

export const getters = {
    isTasksListEmpty: `${NAMESPACE}/isTasksListEmpty`,
    filteredTasks: `${NAMESPACE}/filteredTasks`
}