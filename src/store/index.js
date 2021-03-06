import {createStore} from 'vuex'
import user from "./user"
import record from "./record"
import operation from "./details/operation";
import inspectionReport from "./details/inspectionReport";
import attachment from "@/store/details/attachment";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user, record, operation, inspectionReport, attachment
    }
})
