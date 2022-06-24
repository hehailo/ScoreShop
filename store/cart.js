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
    //持久化存储购物车中商品
    saveToStorage(state) {
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 找到商品
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      // 修改状态
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    // 更新商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);

      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    //根据 Id 删除对应的商品
    removeGoodsById(state, goods_id) {
      console.log("这里");
      state.cart = state.cart.filter((x) => x.goods_id !== goods_id);
      // 持久化
      this.commit("m_cart/saveToStorage");
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
