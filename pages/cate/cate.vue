<template>
  <view class="scroll-view-container">
    <!-- 左侧滚动区域 -->
    <scroll-view scroll-y="true" class="left-scroll-view" :style="{height:wh+'px'}">
      <!-- 包裹 -->
      <block v-for="(item,i) in catelist" :key="i">
        <!-- -bind:class 指令也可以与普通的 class attribute 共存。当有如下模板： -->
        <view class="left-scroll-item" :class="{active:i == active}" @click="changeActive(i)">{{item.cat_name}}</view>
      </block>
    </scroll-view>
    <!-- 右侧滑动区域 -->
    <scroll-view scroll-y="true" class="right-scroll-view" :scrollTop="scrollTop" :style="{height:wh+'px'}">
      <!-- 二级分类 -->
      <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
        <!-- 二级分类标题 -->
        <view class="cate-lv2-title">
          /{{item2.cat_name}}/
        </view>
        <!-- 三级分类item -->
        <view class="cate-lv3-list">
          <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
            <!-- 图标 -->
            <image :src="item3.cat_icon"></image>
            <!-- 文字 -->
            <text> {{item3.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        catelist: [],
        active: 0,
        cateLevel2: [],
        scrollTop:0
      };
    },
    onLoad() {
      // 获取当前设备可用高度
      //全部高度 - nav高度 - tab高度
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      // 获取匪类列表的数据
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.catelist = res.message;
        // 获取一级分类对应的二级分类
        this.cateLevel2 = res.message[0].children
      },
      changeActive(index) {
        this.active = index;
        // 获取对应的二级分类
        this.cateLevel2 = this.catelist[index].children
        // 滚动条回到顶部
        // this.scrollTop = 0;//赋值前后值一样 不会发生页面更新
        this.scrollTop =  this.scrollTop == 0? 1:0;
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?cid="+item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          // 既包含  left-scroll-item 也包含 active
          background-color: white;
          position: relative;

          &::before {
            content: "";
            display: block;
            width: 2px;
            height: 30px;
            background-color: #C00000;
            // 定位
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      padding: 15px 0;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }

  }
</style>
