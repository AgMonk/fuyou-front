// 
import {request} from "@/assets/js/request";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        findAll: ({dispatch, commit, state}, recordUuid) => request({
            url: "/InspectionReport/findAll",
            params: {recordUuid}
        }),
        add: ({dispatch, commit, state}, data) => request({
            url: "/InspectionReport/add",
            data
        }),
        update: ({dispatch, commit, state}, data) => request({
            url: "/InspectionReport/update",
            data
        }),
        del: ({dispatch, commit, state}, uuid) => request({
            url: "/InspectionReport/del",
            params: {uuid},
        }),
        method: ({dispatch, commit, state}, payload) => {

        },
    },
    getters: {},
}