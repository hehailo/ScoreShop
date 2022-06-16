<template>
  <view @click="serachHanlder" class="my-search-container" :style="{'background-color':bgcolor}">
    <!-- 搜索框 -->
    <view class="my-searc-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props:{
      bgcolor:{
        type:String,
        default:"#86C166"
      },
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      serachHanlder(){
        this.$emit("click")
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-searc-box{
    height: 36px;
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .placeholder{
      margin-left: 5px;
      font-size: 15px;
    }
  }
}
</style>