<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <!-- 合计 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "my-settle",
  data() {
    return {
      seconds: 3,
    };
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllGoodsState"]),
    ...mapMutations("m_user", ["updateRedirectInfo"]),
    // 点击全选按钮
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck);
    },
    // 点击结算按钮
    settlement() {
      if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品！");
      if (!this.addstr) return uni.$showMsg("请选择收货地址！");
      // if (!this.token) return uni.$showMsg('请先登录！')
      if (!this.token) return this.delayNavigate();
    },
    delayNavigate() {
      this.seconds = 3;
      // 立即执行
      this.showTips(this.seconds);
      // 定时器执行
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          // 跳转页面
          uni.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updateRedirectInfo({
                from: "/pages/cart/cart",
                openType: "switchTab",
              });
            },
          });

          // 存入vuex
          return;
        }
        this.showTips(this.seconds);
      }, 1000);
    },
    showTips(times) {
      // 展示框
      uni.showToast({
        icon: "none",
        title: "请登录后再结算！" + times + "秒之后自动跳转到登录页",
        mask: true, //防止点击穿透
        duration: 1500,
      });
    },
  },
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    ...mapGetters("m_user", ["addstr"]),
    ...mapState("m_user", ["token"]),
    // 是否全选
    // checkedCount  已勾选商品总数
    // total 购物车商品总数
    isFullCheck() {
      return this.total == this.checkedCount;
    },
  },
};
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount-box {
    .amount {
      color: #c00000;
      font-weight: bold;
    }
  }

  .btn-settle {
    background-color: #ff0000;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
