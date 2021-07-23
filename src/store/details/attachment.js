// 附件
import {request} from "@/assets/js/request";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        list: ({dispatch, commit, state}, reportUuid) => request({
            url: "/Attachment/list",
            params: {reportUuid}
        }),
        method: ({dispatch, commit, state}, payload) => {

        },
    },
    getters: {},
}