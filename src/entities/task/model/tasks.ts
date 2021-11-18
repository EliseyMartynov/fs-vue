import {ActionContext} from 'vuex';
import {typicodeApi} from 'shared/api'
import type { Task } from "shared/api";

export const tasksInitialState: Record<number, Task> = [];

export const tasksModule = {
    state: {
        data: tasksInitialState
    },
    getters: {
        isTasksListEmpty: (state: any) => state.data.length === 0,
    },
    mutations: {
        setTasksList: (state: any, payload: any) => {
            state.data = payload?.data;
        }
    },
    actions: {
        getTasksListAsync: async ({commit}: any, params: typicodeApi.tasks.GetTasksListParams) => {
            commit('setTasksList', await typicodeApi.tasks.getTasksList(params))
        },
        getTaskByIdAsync: async ({commit}: any, params: typicodeApi.tasks.GetTaskByIdParams) => {
            await typicodeApi.tasks.getTaskById(params)
        }
    }
}