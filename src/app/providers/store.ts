import {createStore} from 'vuex';
import {taskModel} from 'entities/task';
import {isDevEnv} from 'shared/config';

export const store = createStore({
    strict: !!isDevEnv,
    // namespaced is cool thing for large projects
    modules: {
        [taskModel.NAMESPACE]: {
            // I think it's better to declare it in app layer
            // while declare it inside modules still possible
            namespaced: true,
            ...taskModel.module
        }
    }
})