<template>
	<view class="header">
		<text class="left-text">{{ leftText }}</text>
		<text class="right-text" @click="goMore" v-if="rightText">{{ rightText }}</text>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		leftText: String,
		rightText: String,
		actionUrl: String
	},
	methods: {
		goMore() {
			if (!this.actionUrl) return;
			let action = this.actionUrl.split('//')[1].split('/')[0];
				console.log(action)
			switch (action) {
				case 'categories':
					this._navigateTo('/pages/home/categories-all/categories-all');
					break;
			}
		},

		_navigateTo(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	padding: 20rpx 0;
	display: flex;
	font-weight: bold;
	align-items: flex-end;
	justify-content: space-between;

	.left-text {
		font-size: 40rpx;
		color: #3c3c3c;
	}
	.right-text {
		padding: 20rpx 0 0 20rpx;
		color: #6d9ec6;
		margin-bottom: -10rpx;
	}
}
</style>
