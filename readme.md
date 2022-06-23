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
    
###  过滤器 处理 商品价格
    // 过滤器 处理商品价格 保留两位小数
    tofixed(num){
      return Number(num).toFixed(2)
    } 
    
###  上拉加载更多商品

    1.配置下拉触底距离
    2.事件 onReachBottom
      事件处理中 页号+1
      请求数据
        拼接新旧数据
    
    节流阀
      正在请求数据的时候，不发起额外的请求
      isloading=true  正在请求数据
      
    判断数据是否已经加载完毕
      1、 有总条数
        方法1：当前页号* 每页数据 > 总条数
        方法2：存储的记录条数数据 > 总条数
      2、判断本次请求得到的记录条数 < 请求的每页数据 或者  本次没有返回数据
      
      
###  下拉刷新事件的处理
    1、在 pages.json 配置文件中，为当前的页面单独开启下拉刷新效果

      "enablePullDownRefresh": true,
      "backgroundColor": "#F8F8F8"
      
    2、监听页面的 onPullDownRefresh 事件处理函数，重置关键数据
      onPullDownRefresh() {
        // 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        ...
      }
      
    3、发送请求 获取第一页数据
      传递回调 关闭下拉刷新的效果
      this.getGoodsList(() => uni.stopPullDownRefresh())

###  如何实现大图预览效果

	图片绑click  定义priview事件处理
	调用uni.previewImage()方法预览图片
	
		// 调用 uni.previewImage 方法预览图片
		uni.previewImage({
			current:i,
			urls:this.goods_info.pics.map((x)=>x.pics_big)
		})
		
### 渲染html字符串

	<uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)">
	</uni-tag>
	
	去除图片底部空白
	
	// 去除图片底部空白
	  res.message.goods_introduce = res.message.goods_introduce
	    .replace(/<img /g, '<img style="display:block;" ')
	    .replace(/webp/g, "jpg");
	
	
###  解决闪烁问题
 
	原因；数据还没有返回  是{} 
	会展示undefiend
	
	使用v-if来解决
	
###  使用goodsnav来展示下方商品购物车和按钮



	
	
	
###   使用vuex