import {
  $http
} from '@escook/request-miniprogram'

import store from '@/store/store.js'
// 请求的耳根路径
$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
  console.log("options", options)
  console.log("store", store)
  uni.showLoading({
    title: "数据加载中..."
  })
  if (options.url.indexOf('/my/') !== -1) {
    options.header.Authorization = store.state.m_user.token
  }
}

$http.afterRequest = function() {
  uni.hideLoading()
}

// 默认暴露
export default $http
