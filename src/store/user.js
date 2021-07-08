// 用户
// noinspection JSUnresolvedVariable

import {request} from "@/assets/js/request";
import {ElMessage} from "element-plus";

export default {
    namespaced: true,
    state: {
        user: {},
    },
    mutations: {},
    actions: {
        method({dispatch, commit, state}) {

        },
        login({dispatch, commit, state}, params) {
            request({
                url:"/User/login",
                params
            }).then(res=>{
                state.user = res.data;
                ElMessage.success(res.message)
            })
        },

    },
    getters: {},
}