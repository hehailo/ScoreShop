<!-- 用户登录组件 -->
<template>
  <view class="login-container">
    <!-- 头标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 一键登录 -->
    <button
      type="primary"
      class="btn-login"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    >
      一键登录
    </button>
    <!-- 提示 -->
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "my-login",
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateRedirectInfo",
    ]),
    getUserInfo(e) {
      console.log("登录取得", e);
      if (e.detail.errMsg === "getUserInfo:fail auth deny")
        return uni.$showMsg("您取消了登录授权！");
      console.log("userInfo", e.detail.userInfo);
      this.updateUserInfo(e.detail.userInfo);
      this.getToken(e.detail);
    },
    async getToken(detail) {
      const [err, res] = await uni.login().catch((err) => err);
      console.log("res", res);
      if (err || res.errMsg !== "login:ok") return uni.$showMsg("登录失败！");

      let { encryptedData, iv, rawData, signature } = detail;

      // 准备参数
      const query = {
        code: res.code,
        encryptedData,
        iv,
        rawData,
        signature,
      };

      const { data: loginResult } = await uni.$http.post(
        "/api/public/v1/users/wxlogin",
        query
      );
      console.log("loginResult", loginResult);
      // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
      this.updateToken(loginResult?.message?.token || "wojxngf8234444");
      this.navigateBack();
    },
    navigateBack() {
      console.log("this.redirectInfo", this.redirectInfo);
      // openType: 'switchTab',
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null);
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.login-container {
  background-color: #f8f8f8;
  height: 750rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // overflow: hidden;

  &::after {
    content: "";
    display: block;
    background-color: lightcyan;
    width: 100%;
    height: 40px;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    border-radius: 100%;
    background-color: white;
  }

  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
