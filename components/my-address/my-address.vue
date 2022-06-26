<template>
  <view>
    <!--选择收货地址的按钮 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
      <button
        type="primary"
        size="mini"
        class="btnChooseAddress"
        @click="chooseAddress"
      >
        请选择收货地址+
      </button>
    </view>

    <!-- 展示已选择的收获地址 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{ address.userName }}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{ address.telNumber }}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>

    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
export default {
  name: "my-address",
  data() {
    return {
      address: {},
    };
  },
  computed: {
    // cityName: "广州市"
    // countyName: "海珠区"
    // detailInfo: "新港中路397号"
    // errMsg: "chooseAddress:ok"
    // nationalCode: "510000"
    // postalCode: "510000"
    // provinceName: "广东省"
    // telNumber: "020-81167888"
    // userName: "张三"

    addstr() {
      if (!this.address.cityName) {
        return "";
      }
      let { provinceName, cityName, countyName, detailInfo } = this.address;
      return provinceName + cityName + countyName + detailInfo;
    },
  },
  methods: {
    async chooseAddress() {
      // 调用小程序的api
      const [err, success] = await uni.chooseAddress().catch((err) => err);
      console.log(err, success);
      // 成功选择来收获地址
      if (err === null && success.errMsg === "chooseAddress:ok") {
        this.address = success;
      }
    },
  },
};
</script>

<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

.address-choose-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.address-info-box {
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .row2 {
    display: flex;
    margin-top: 10px;
    align-items: center;

    .row2-left {
      // 不换行
      white-space: nowrap;
    }
  }
}
</style>
