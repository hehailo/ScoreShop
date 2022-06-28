export default {
  namespaced: true,
  state: () => ({
    token: '',
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
    token: uni.getStorageSync("token") || '',
    // 重定向的 Object 对象
    redirectInfo: null
  }),
  mutations: {
    // address处理
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    saveAddressToStorage(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    // userinfo处理
    updateUserInfo(state, userinfo) {
      state.userInfo = userinfo;
      this.commit("m_user/saveUserInfoToStorage")
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync("userInfo", JSON.stringify(state.userInfo))
    },
    // token处理
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 存放重定向对象
    updateRedirectInfo(state,info){
      state.redirectInfo = info;
      console.log("state.redirectInfo",state.redirectInfo);
    }

  },
  getters: {
    addstr(state) {
      if (!state.address.cityName) {
        return "";
      }
      let {
        provinceName,
        cityName,
        countyName,
        detailInfo
      } = state.address;
      return provinceName + cityName + countyName + detailInfo;
    },
  },
};
