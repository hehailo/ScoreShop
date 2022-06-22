<template>
  <view>
    <view class="search-box">
      <!-- 搜索框 unui组件 -->
      <uni-search-bar @input="input" @confirm="search" :focus="true" v-model="searchValue" radius="100"
        cancelButton="none">
      </uni-search-bar>

    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchValue.trim() != ''">
      <view class="sugg-item" @click="gotoDetail(item)" v-for="(item, i) in searchResults" :key="i">
        <!-- 文字 -->
        <view class="goods-name">{{item.goods_name}}</view>
        <!-- 图标 -->
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史区域 -->
    <view class="history-box" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17"   @click="clearHistories">
        </uni-icons>
      </view>
      <!-- 列表 -->
      <view class="history-list">
        <!-- 搜索历史记录 -->
      <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)">
      </uni-tag>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    debounce
  } from "lodash"
  export default {
    data() {
      return {
        searchValue: "",
        timer: null,
        // 搜索的结果列表
        searchResults: [],
        // 搜索历史的数组
        historylist: ["a", "app", "apple"]
      };
    },
    // watch:{
    //   'searchValue':{
    //     immediate:true,
    //     handler:debounce(function(newval,oldval){
    //       console.log(this);
    //       // 防抖
    //       this.getSearchList(newval);
    //     },500)
    //   }

    // },
    computed:{
        histories(){
          return [...this.historylist].reverse()
        }
    },
    onLoad() {
      // 初始化读取搜索历史记录、

      console.log("111",uni.getStorageSync("keywords"));
      this.historylist = JSON.parse(uni.getStorageSync("keywords") || "[]")
    },
    methods: {
      // 输入事件 防抖
      input: debounce(function(event) {
        console.log(event);
        // 防抖
        this.getSearchList()
      }, 500),
      // 获取搜索结果
      async getSearchList() {
        if (this.searchValue.trim().length === 0) {
          this.searchResults = []
          return
        }
        console.log("执行");
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.searchValue
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      // 跳转到商品详情页面
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 清除搜索历史
      clearHistories(){
        this.historylist = [];
        uni.setStorageSync("keywords","[]")
      },
      // 存储搜索记录
      saveSearchHistory(){
        let set = new Set(this.historylist);
        // 相当于一遍去重操作
        set.delete(this.searchValue);
        set.add(this.searchValue)
        this.historylist = Array.from(set);
        // 搜索历史记录的持久化
        uni.setStorageSync("keywords",JSON.stringify(this.historylist))
      },
      // 跳转商品列表页面
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+item
        })
      }
    }
  }
</script>

<style lang="scss">
  .uni-searchbar {
    // 背景颜色
    background-color: #86C166;
  }

  .search-box {
    // 吸顶
    position: sticky;
    top: 0;
    // 避免被覆盖
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 13px 0;
      height: 30px;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  
  .history-box{
      padding: 0 5px;
      
        .history-title {
          display: flex;
          justify-content: space-between;
          height: 40px;
          align-items: center;
          font-size: 13px;
          border-bottom: 1px solid #efefef;
        }
    
        .history-list {
          display: flex;
          flex-wrap: wrap;
    
          .uni-tag {
            margin-top: 5px;
            margin-right: 5px;
            font-size: 15px;
          }
        }
  }
</style>
