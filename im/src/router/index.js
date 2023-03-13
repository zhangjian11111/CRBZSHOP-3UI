import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/message/index'),
        meta: {
            title: '',
            needLogin: true,
        },
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('@/views/message/index'),
        meta: {
            title: '消息通知',
            needLogin: true,
        },
    },
    {
        path: '*',
        name: '404 NotFound',
        component: () => import('@/views/other/404'),
        meta: {
            title: '404 NotFound',
            needLogin: false,
        },
    },
]

export default new Router({
    routes,
    mode: 'history',
})
