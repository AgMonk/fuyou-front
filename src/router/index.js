import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import {ElMessage} from "element-plus";

const routeNameMe = "我的";

export const routes = [
    {
        path: '/',
        redirect: "/record"
    },
    {
        path: '/record',
        name: '档案',
        component: () => import("../views/Record"),
    },
    {
        path: '/detail/:uuid',
        comment: '详情',
        component: () => import("../views/Details"),
    },
    {
        path: "/me",
        name: routeNameMe,
        component: () => import("../views/Me"),
    },
    {
        path: '/about',
        name: '关于',
        component: () => import("../views/About"),
        children: [
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
    console.clear()
    store.dispatch('user/getStatus').catch((res) => {
        if (to.name !== routeNameMe) {
            ElMessage.error(res)
        }
    })
    let user = store.state.user.user
    if (user || to.name === routeNameMe) {
        next()
    } else {
        next({name: routeNameMe,params:{redirect:from.path}})
    }

})

export default router
