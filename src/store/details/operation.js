//
import {request} from "@/assets/js/request";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        findAll: ({dispatch, commit, state}, recordUuid) => request({
            url: "/Operation/findAll",
            params: {recordUuid}
        }),
        method: ({dispatch, commit, state}, payload) => {

        },

    },
    getters: {},
}