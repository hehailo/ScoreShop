export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
  }),
  mutations: {
    // 封装加入购物车的方法
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (!findResult) {
        // 改商品未加入购物车
        state.cart.push(goods);
      } else {
        findResult.goods_count++;
      }

      //持久化存储购物车中商品
      this.commit("m_cart/saveToStorage");
    },
    saveToStorage(state) {
      console.log("纯");
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
  },

  getters: {
    // 统计购物车中商品总数
    total(state) {
      let c = 0;
      state.cart.forEach((x) => (c += x.goods_count));
      return c;
    },
  },
};
