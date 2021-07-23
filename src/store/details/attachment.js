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
        del: ({dispatch, commit, state}, {reportUuid, filename}) => request({
            url: "/Attachment/del",
            params: {reportUuid, filename}
        }),
        method: ({dispatch, commit, state}, payload) => {

        },
    },
    getters: {},
}