<template>
  <view>
    <view class="goods-list" >
      <view @click="gotoGooodsDetail(goods)" v-for="(goods, i) in goodsList" :key="i">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 请求参数对象
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1, //页号
        pagesize: 10, //每页的数据
      },
      goodsList: [], //商品列表数据
      total: 0, //总数量 实现分页
      isloading: false, // 节流阀
    };
  },
  onLoad(options) {
    // 页面跳转取得的参数
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";

    this.getGoodsList();
  },
  // 上拉触底
  onReachBottom() {
    // 没有数据了 不再请求
    if(this.pagenum * this.pagesize >= this.total){
      return uni.$showMsg();
    }
    // 正在请求中，不再触发
    if(this.isloading){
      return;
    }
    this.queryObj.pagenum++;
    this.getGoodsList()
    
  },
  // 下拉 刷新获取第一条数据
  onPullDownRefresh() {
    // 重置
    this.isloading =false;
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.goodsList = [];
    
    this.getGoodsList(()=>{uni.stopPullDownRefresh()})
  },
  methods: {
    // 获取商品列表的数据
    async getGoodsList(cb) {
      this.isloading = true;
      const { data: res } = await uni.$http.get(
        "/api/public/v1/goods/search",
        this.queryObj
      );
      this.isloading = false;
      // 关闭下拉刷新效果
      cb && cb()
      if (res.meta && res.meta.status == 200) {
        this.goodsList = [...this.goodsList, ...res.message.goods];
        this.total = res.message.total;
      }else{
        return uni.$showMsg();
      }
    },
    gotoGooodsDetail(goods){
      // 跳转商品详情页面
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
      })
    }
  },
};
</script>

<style lang="scss">
</style>
