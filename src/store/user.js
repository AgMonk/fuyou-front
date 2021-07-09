// 用户
// noinspection JSUnresolvedVariable

import {request} from "@/assets/js/request";
import {ElMessage} from "element-plus";

export default {
    namespaced: true,
    state: {
        user: undefined,
    },
    mutations: {},
    actions: {
        login: ({dispatch, commit, state}, params) => request({
            url: "/User/login",
            params
        }).then(res => {
            state.user = res.data;
            ElMessage.success(res.message)
        }),
        logout: ({dispatch, commit, state}) => request({
            url: "/User/logout"
        }).then(res => {
            state.user =undefined;
            ElMessage.success(res.message)
        }),

        getStatus: ({dispatch, commit, state}) => {
            if (state.user) {
                return new Promise(resolve => resolve(true))
            }else{
                return request({
                    url: "/User/status",
                }).then(res => {
                    state.user = res.data;
                    return true;
                })
            }
        },
        method({dispatch, commit, state}) {

        },

    },
    getters: {},
}
