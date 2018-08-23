import Vue from 'vue'
import App from './app.vue'
import Address from'./views/address.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const root = document.createElement('div')
document.body.appendChild(root)

const routes=[

    {path:'/',component:App},

    {path:'/address',component:Address}

];

const router=new VueRouter({
    routes
});

new Vue({
    render: (h) => h(App),
    router
}).$mount(root)
