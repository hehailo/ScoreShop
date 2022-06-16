###  问题一 
###  如何设置导航条字体大小
###  
###  
###  滚动区域占满全部高度
      screenWidth	屏幕宽度		 			
      screenHeight	屏幕高度		 			
      windowWidth	可使用窗口宽度  = screenHeight-nav-tabbr
       
       
       
滚动条重置到顶部   
    scroll-top  动态指定滚动条位置
    
    // this.scrollTop = 0;//赋值前后值一样 不会发生页面更新
    this.scrollTop == 0? 1:0;
    
    
uniapp内置组件 https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html



搜索区域吸顶
    // 吸顶
    position: sticky;
    top: 0;
    // 避免被覆盖
    z-index: 999;