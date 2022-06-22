// 默认是数据请求失败的提示
const showMsg =  function(title = "数据请求失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

export {showMsg}