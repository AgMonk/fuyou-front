import {createStore} from 'vuex'
import user from "./user"
import record from "./record"
import operation from "./details/operation";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user, record, operation
    }
})
