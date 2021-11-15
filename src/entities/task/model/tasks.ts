import {ActionContext} from 'vuex';
import {typicodeApi} from 'shared/api'
import type { Task } from "shared/api";

export const tasksInitialState: Record<number, Task> = {};

export const tasksModule = {
    state: () => tasksInitialState,
    mutations: {
        setTasksList: (state: any, payload: any) => {
            state = payload;
        }
    },
    actions: {
        getTasksListAsync: async ({commit}: any, params: typicodeApi.tasks.GetTasksListParams ) => {
            commit('setTasksList', await typicodeApi.tasks.getTasksList(params))
        }
    }
}