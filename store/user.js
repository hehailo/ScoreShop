export default {
  namespaced: true,
  state: () => ({
    token:'',
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    saveAddressToStorage(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
  },
  getters: {
    addstr(state) {
      if (!state.address.cityName) {
        return "";
      }
      let { provinceName, cityName, countyName, detailInfo } = state.address;
      return provinceName + cityName + countyName + detailInfo;
    },
  },
};
