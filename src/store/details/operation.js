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
        add: ({dispatch, commit, state}, data) => request({
            url: "/Operation/add",
            data
        }),
        update: ({dispatch, commit, state}, data) => request({
            url: "/Operation/update",
            data
        }),
        del: ({dispatch, commit, state}, uuid) => request({
            url: "/Operation/del",
            params: {uuid},
        }),

        method: ({dispatch, commit, state}, payload) => {

        },

    },
    getters: {},
}