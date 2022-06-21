###  问题一 
###  如何设置导航条字体大小
###  
###  
###  滚动区域占满全部高度
      screenWidth	屏幕宽度		 			
      screenHeight	屏幕高度		 			
      windowWidth	可使用窗口宽度  = screenHeight-nav-tabbr
       
       
       
### 滚动条重置到顶部   
    scroll-top  动态指定滚动条位置
    
    // this.scrollTop = 0;//赋值前后值一样 不会发生页面更新
    this.scrollTop == 0? 1:0;
    
    
### uniapp内置组件 https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html



### 搜索区域吸顶
    // 吸顶
    position: sticky;
    top: 0;
    // 避免被覆盖
    z-index: 999;

### 解决搜索关键词重复的问题

    使用计算属性 来展示原数组
        翻转 搜索记录的数组
    computed:{
        histories(){
          return [...this.historylist].reverse()
        }
    },
    
### 解决关键词重复的问题
    通过set来处理
    let set = new Set(this.historylist);
    // 相当于一遍去重操作
    set.delete(this.searchValue);
    set.add(this.searchValue)
    this.historylist = Array.from(set);
  
  
#### 搜索记录持久化
    onLoad() {
      // 初始化读取搜索历史记录
      this.historylist = JSON.parse(uni.getStorageSync("keyword"))
    },
  
    //持久化到缓存里面
    uni.setStorageSync("keyword",JSON.stringify(this.historylist))
    
    // 清除搜索历史
    clearHistories(){
      this.historylist = [];
      uni.setStorageSync("keywords","[]")
    },