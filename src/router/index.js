import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {debugLog} from "@/assets/js/utils";
import store from '../store'
import {ElMessage} from "element-plus";

let debug = true;

export const routes = [
    {
        path: '/',
        name: '主页',
        component: Home,
    },
    {
        path: "/login",
        name: "登陆",
        component: () => import("../views/Login"),
    },
    {
        path: '/about',
        name: '关于',
        component: () => import("../views/About"),
        children:[
            {
                path: 'about1',
                name: '关于1',
                component: () => import("../components/test"),
            },
             {
                path: 'about2',
                name: '关于2',
                component: () => import("../components/test"),
            },

        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    debugLog(debug, "路由切换 从 {from} 到 {to}".format({to: to.name, from: from.name}))
    console.log(to)
    //    不是去登陆路由时 尝试拦截
    store.dispatch("user/getStatus").then(() => {
        next()
    }).catch(res => {
        if (to.name !== '登陆') {
            ElMessage.error(res)
            debugLog(debug, "未登录重定向：" + from.path)
            next({name: "登陆", params: {redirect: from.path}})
        }
    })
})

export default router
