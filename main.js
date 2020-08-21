import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store,
})
app.$mount()
