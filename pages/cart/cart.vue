<template>
  <view>
    
    <!-- 收货地址区域 -->
    <my-address>
      
    </my-address>
    
    
    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item
          :right-options="options"
          @click="swipeItemClickHandler($event, goods)"
        >
          <my-goods
            @radio-change="radioChangeHandler"
            @num-change="numberChangeHandler"
            :goods="goods"
            :showNum="true"
            :showRadio="true"
          ></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

  </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState, mapMutations } from "vuex";
import myGoods from "../../components/my-goods/my-goods.vue";
export default {
  components: { myGoods },
  mixins: [badgeMix],
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  data() {
    return {
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#C00000",
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations("m_cart", ["updateGoodsState", "updateGoodsCount","removeGoodsById"]),
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    // 滑动删除
    swipeItemClickHandler($event, goods) {
      console.log(goods.goods_id);
      this.removeGoodsById(goods.goods_id);
    },
  },
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
