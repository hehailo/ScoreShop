<template>
  <view class="my-container">
    <my-userinfo v-if="token"></my-userinfo>
    <my-login v-else></my-login>
  </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState } from "vuex";
export default {
  mixins: [badgeMix],
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState("m_user", ["token"]),
  },
};
</script>

<style lang="scss">
page {
  background-color: #fff;
}
page,
.my-container {
  height: 100%;
}
</style>
