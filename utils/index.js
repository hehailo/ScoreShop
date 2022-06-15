const showMsg =  function(title = "数据请求失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

export {showMsg}