<template>
  <view class="good-item">
    <!-- 左侧盒子 图片 -->
    <view class="goods-item-left">
      <radio
        :checked="goods.goods_state"
        color="#C00000"
        v-if="showRadio"
        @click="radioClickHandler"
      ></radio>
      <image
        class="goods-pic"
        :src="goods.goods_small_logo || defaultPic"
      ></image>
    </view>

    <!-- 右侧盒子 说明-->
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
        <uni-number-box
          :min="0"
          :value="goods.goods_count"
          :max="9"
          v-if="showNum"
          @change="numChangeHandler"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-goods",
  props: {
    goods: {
      type: Object,
      default: {},
    },
    showRadio: {
      // 控制单选那妞的显示与隐藏
      type: Boolean,
      default: false,
    },
    showNum: {
      // 控制单选那妞的显示与隐藏
      type: Boolean,
      default: false,
    },
  },
  filters: {
    // 过滤器 处理商品价格 保留两位小数
    tofixed(num) {
      return Number(num).toFixed(2);
    },
  },
  data() {
    return {
      // 默认的图片
      defaultPic:
        "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
    };
  },
  methods: {
    radioClickHandler() {
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state, //当前状态取反
      });
    },
    numChangeHandler(val) {
      val = parseInt(val) || 1;
      // 同步到父组件
      this.$emit("num-change", {
        goods_id: this.goods.goods_id,
        goods_count: +val, //转化成数字
      });
    },
  },
};
</script>

<style lang="scss">
.good-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid lightgray;
  width: 750rpx;
  box-sizing: border-box;
  .goods-item-left {
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }

    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>