<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperlist" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navlist" :key="index" @click="toClickPage(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="(item,index) in floorlist" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧的大图 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :style="{width:item.product_list[0].image_width+'rpx'}"
							:src="item.product_list[0].image_src" mode="widthFix"></image>
						</navigator>>
						<!-- 右侧四个图片 -->
						<view class="right-img-box">
							<navigator class="right-img-item" v-for="(img,num) in item.product_list" :key="num"
								v-if="num != 0" :url="img.url">
								<image :src="img.image_src" :style="{width:img.image_width+'rpx'}" mode="widthFix">
								</image>
							</navigator>
						</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperlist: [],
				navlist: [],
				floorlist: []
			};
		},
		onLoad() {
			this.getSwiperListData();
			this.getNavList();
			this.getFloorList()

		},
		methods: {
			async getSwiperListData() {
				// 获取轮播图的数据
				let {
					data: res
				} = await uni.$http.get("/api/public/v1/home/swiperdata");
				console.log(res);
				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据请求失败！",
						duration: 1500,
						icon: "error"
					})
				}
				this.swiperlist = res.message;
				uni.$showMsg("请求成功");
			},
			async getNavList() {
				// 获取分类数据
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navlist = res.message
			},
			// 获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorlist = res.message
			},

			// 跳转到点击页面
			toClickPage(item) {
				if (item.name == "分类") {
					// 分类属于tabbar 使用switchTab()跳转
					uni.switchTab({
						url: "//pages/cate/cate"
					})

				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0px;

		.nav-item {

			// felx：auto  0 1 auto ；不放 等比缩小  原始宽度
			image {
				// 屏幕总体为  75rpx
				width: 128rpx;
				height: 140rpx;
			}
		}

	}

	.floor-list {
		.floor-title {
			width: 100%;
			height: 60rpx;
		}
	}

	.floor-img-box {
		display: flex;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
