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
				<template v-slot:left="{ leftList }">
					<view class="waterfall-flow-left-item" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.data.content.data.cover.feed" :index="index"></u-lazy-load>
						<view class="description text-over-three">{{ item.data.content.data.description }}</view>
						<view class="auth-like flex">
							<view class="auth flex">
								<image class="avatar" :src="item.data.header.icon" mode=""></image>
								<text class="issuerName">{{ item.data.header.issuerName }}</text>
							</view>
							<view class="like" style="font-size: 24rpx;">{{ item.data.content.data.consumption.collectionCount }}</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="waterfall-flow-right-item" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.data.content.data.cover.feed" :index="index"></u-lazy-load>
						<view class="description">{{ item.data.content.data.description }}</view>
						<view class="auth-like flex">
							<view class="auth flex">
								<image class="avatar" :src="item.data.header.icon" mode=""></image>
								<text class="issuerName">{{ item.data.header.issuerName }}</text>
							</view>
							<view class="like" style="font-size: 24rpx;">{{ item.data.content.data.consumption.collectionCount }}</view>
						</view>
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
			locationB: [], //banner
			flowList: []
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
			this.flowList = this._filter(res.itemList, 'communityColumnsCard');
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

// 瀑布流
.waterfall-flow {
	margin: 0 30rpx;
	.waterfall-flow-left-item {
		padding-bottom: 50rpx;
		margin-right: 10rpx;
	}
	.waterfall-flow-right-item {
		padding-bottom: 50rpx;
		margin-left: 10rpx;
	}

	.description {
		font-size: 24rpx;
		color: #555555;
		padding: 20rpx 0;
	}

	.auth-like {
		justify-content: space-between;

		.avatar {
			height: 30rpx;
			width: 30rpx;
			border-radius: 50%;
			margin-right: 14rpx;
		}
		.issuerName {
			font-size: 24rpx;
			color: #808080;
		}
	}
}
</style>
