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
            return res.data
        }),
        add: ({dispatch, commit, state}, data) => request({
            url: "/Record/add",
            data
        }).then(res => {
            delete state.data[JSON.stringify(data)]
            ElMessage.success(res.message);
        }),
        update: ({dispatch, commit, state}, data) => request({
            url: "/Record/update",
            data
        }).then(res => {
            delete state.data[JSON.stringify(data)]
            ElMessage.success(res.message);
        }),
        // //优先经过缓存查询
        // get: ({dispatch, commit, state}, data) => {
        //     let d = state.data[JSON.stringify(data)];
        //     let now = new Date().getTime();
        //     if (d && now - d.timestamp < 1000 * 60 * 3) {
        //         return new Promise(r => r(d.data))
        //     }
        //     return dispatch("page", data)
        // },
        //启动随访
        startReview: ({dispatch, commit, state}, {uuid, nextReview, reviewInterval}) => request({
            url: "/Record/startReview",
            params: {uuid, nextReview, reviewInterval},
        }),
        //结束随访
        stopReview: ({dispatch, commit, state}, uuid) => request({
            url: "/Record/stopReview",
            params: {uuid},
        }),
        //签到
        sign: ({dispatch, commit, sign}, uuid) => request({
            url: "/Record/sign",
            params: {uuid},
        }),
        //删除
        del: ({dispatch, commit, sign}, uuid) => request({
            url: "/Record/del",
            params: {uuid},
        }),
        //通知
        notice: ({dispatch, commit, sign}, uuid) => request({
            url: "/Record/notice",
            params: {uuid},
        }),
        //通知
        getById: ({dispatch, commit, sign}, uuid) => request({
            url: "/Record/getById",
            params: {uuid},
        }),
        method: ({dispatch, commit, state}, payload) => {

        },

    },
    getters: {},
}