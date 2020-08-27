<!-- 专题 -->
<template>
	<view class="container">
		<view class="list" v-for="(item, i) in arr" :key="i"><image :src="item.data.image" mode=""></image></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			arr: [],
			nextPageUrl: ''
		};
	},
	onLoad() {
		this.getData();
	},
	onReachBottom(e) {
		this.getData(this.nextPageUrl);
	},
	methods: {
		async getData(params = '') {
			let url =
				params ||
				'v3/specialTopics?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp&last_channel=pp&system_version_code=29';
			let res = await this.$u.get(url);
			if (res && res.itemList) {
				this.arr= this.arr.concat(res.itemList)
				this.nextPageUrl = res.nextPageUrl;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	margin: 0 30rpx;
	.list {
		height: 370rpx;
		width: 100%;
		margin-bottom: 20rpx;
		image {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
	}
}
</style>
