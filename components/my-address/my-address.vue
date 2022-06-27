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
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "my-address",
  data() {
    return {
      // address: {},
    };
  },
  computed: {
    // cityName: "广州市" // countyName: "海珠区" // detailInfo: "新港中路397号" // errMsg: "chooseAddress:ok" // nationalCode: "510000" // postalCode: "510000" // provinceName: "广东省" // telNumber: "020-81167888" // userName: "张三"

    // addstr() {
    //   if (!this.address.cityName) {
    //     return "";
    //   }
    //   let { provinceName, cityName, countyName, detailInfo } = this.address;
    //   return provinceName + cityName + countyName + detailInfo;
    // },
    ...mapState("m_user", ["address"]),
    ...mapGetters("m_user", ["addstr"]),
  },
  methods: {
    ...mapMutations("m_user", ["updateAddress"]),
    // 选择地址
    async chooseAddress() {
      // 调用小程序的api
      const [err, success] = await uni.chooseAddress().catch((err) => err);
      console.log("err",err);
      console.log("success", success);
      // 成功选择来收获地址
      if (err === null && success.errMsg === "chooseAddress:ok") {
        // this.address = success;
        this.updateAddress(success);
      }
      // 解决用户未授权问题
      // iphone的判断 chooseAddress:fail authorize no response
      if (
        err &&
        (err.errMsg === "chooseAddress:fail auth deny" ||
          err.errMsg === "chooseAddress:fail authorize no response")
      ) {
        // 通过调用这个方法，让用户重新授权
        this.reAuth();
      }
    },
    // 重新授权 选择地址
    async reAuth() {
      const [err, reslut] = await uni.showModal({
        content: "检测到您没打开地址权限，是否去设置打开？",
        confirmText: "确认",
        cancelText: "取消",
      });
      // 发生错误
      if (err) return;
      console.log("reslut", reslut);
      // 点击取消
      if (reslut.cancel) return uni.$showMsg("您取消了地址授权！");
      // 点击确认
      if (reslut.confirm) {
        // 弹出设置面板
        return uni.openSetting({
          success: (settingResult) => {
            if (!settingResult.authSetting["scope.address"])
              return uni.$showMsg("您取消了授权！");
            if (settingResult.authSetting["scope.address"])
              return uni.$showMsg("授权成功！请选择地址");
          },
        });
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
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

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
