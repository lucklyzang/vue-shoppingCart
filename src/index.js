import Vue from 'vue'
import App from './app.vue'
import Address from './address.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)
