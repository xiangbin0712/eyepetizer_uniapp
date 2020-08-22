<template>
	<view class="recommend">
		<view class="top flex ">
			<view class="chunk flex-center flex-1" v-for="(item, i) in locationA" :key="i">
				<image :src="item.data.bgPicture" mode=""></image>
				<view class="text flex-col flex-center">
					<text class="title">{{ item.data.title }}</text>
					<text class="sub-title">{{ item.data.subTitle }}</text>
				</view>
			</view>
		</view>
		<swiper class="swiper">
			<swiper-item v-for="(item, i) in locationB" :key="i" class="swiper-item"><image class="swiper-img" :src="item.data.image"></image></swiper-item>
		</swiper>
		<!-- 瀑布流 -->
		<view class="waterfall-flow">
			<u-waterfall v-model="flowList">
				<template v-slot:left="{leftList}">
					<view v-for="(item, index) in leftList" :key="index">
					<view class="">
						<!-- <image src="" mode=""></image> -->
						
					</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view v-for="(item, index) in rightList" :key="index">
						<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					</view>
				</template>
			</u-waterfall>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			locationA: [],
			locationB: [] ,//banner
			flowList:[]
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			let url =
				'v7/community/tab/rec?refreshCount=0&udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp&last_channel=pp';
			let res = await this.$u.get(url);

			// this.locationA= this._filter(res.itemList,"squareCardOfCommunityContent")
			this.locationA = res.itemList[0].data.itemList;
			this.locationB = res.itemList[1].data.itemList;
			this.flowList = this._filter(res.itemList,"communityColumnsCard")
			// console.log(this.flowList)
		},

		// filter
		_filter(arr, type, num) {
			return arr.filter(item => {
				return item.type === type;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	justify-content: space-between;
	margin: 20rpx 30rpx;
	.chunk {
		position: relative;
		color: #ffffff;
		image {
			height: 120rpx;
			width: 340rpx;
			border-radius: 10rpx;
		}
		.text {
			position: absolute;
		}
		.title {
			font-weight: bold;
			font-size: 30rpx;
		}
		.sub-title {
			font-size: 24rpx;
		}
	}
}

.swiper {
	height: 400rpx;
	margin: 0 30rpx 30rpx;
}

.swiper-item .swiper-img {
	height: 100%;
	width: 100%;
	border-radius: 10rpx;
}
</style>
