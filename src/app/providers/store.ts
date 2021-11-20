import {createStore} from 'vuex';
import {taskModel} from 'entities/task';
import {isDevEnv} from 'shared/config';

export const store = createStore({
    strict: !!isDevEnv,
    modules: {
        [taskModel.NAMESPACE]: taskModel.module
    }
})