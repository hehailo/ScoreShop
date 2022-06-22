### git有关教程

1、基于 master 分支在本地创建 search 子分支，用来开发搜索相关的功能：
    git checkout -b search

2、将 search 分支进行本地提交：
    git add .
    git commit -m "完成了搜索功能的开发"

3、将本地的 search 分支推送到码云：
    git push -u origin search

4、将本地 search 分支中的代码合并到 master 分支：
    git checkout master
    git merge search
    git push
    
5、删除本地的 search 分支：
    git branch -d search


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