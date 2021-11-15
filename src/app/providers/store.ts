import {createStore} from 'vuex';
import {tasksModule} from 'entities/task/model';
import {isDevEnv} from 'shared/config';

export const store = createStore({
    strict: !!isDevEnv,
    modules: {
        tasks: tasksModule
    }
})