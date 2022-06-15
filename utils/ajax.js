import { $http } from '@escook/request-miniprogram'
// 请求的耳根路径
$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options){
  console.log(options)
  uni.showLoading({
    title:"数据加载中..."
  })
}

$http.afterRequest = function(){
  uni.hideLoading()
} 

// 默认暴露
export default $http