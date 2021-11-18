import {createStore} from 'vuex';
import {tasksModule} from 'entities/task/model';
import {isDevEnv} from 'shared/config';

export const store = createStore({
    strict: !!isDevEnv,
    // it could be namespaced modules in a large project
    // but since this is todo.. :)
    modules: {
        tasks: tasksModule
    }
})