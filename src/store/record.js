//
import {request} from "@/assets/js/request";
import {ElMessage} from "element-plus";

export default {
    namespaced: true,
    state: {
        data: {},
    },
    mutations: {},
    actions: {
        //查询数据
        page: ({dispatch, commit, state}, data) => request({
            url: "/Record/page",
            data
        }).then(res => {
            state.data[JSON.stringify(data)] = res;
        }),
        add: ({dispatch, commit, state}, data) => request({
            url: "/Record/add",
            data
        }).then(res => {
            ElMessage.success(res.message);
        }),
        //优先经过缓存查询
        get: ({dispatch, commit, state}, data) => {
            let d = state.data[JSON.stringify(data)];
            let now = new Date().getTime();
            if (d && now - d.timestamp < 1000 * 60 * 3) {
                return new Promise(r => r(d))
            }
            return dispatch("page", data)
        },
        method: ({dispatch, commit, state}, payload) => {

        },

    },
    getters: {},
}