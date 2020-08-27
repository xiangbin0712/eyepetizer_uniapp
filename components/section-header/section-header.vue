<template>
	<view class="header" >
		<text class="left-text">{{ leftText }}</text>
		<text class="right-text" v-if="rightText">{{ rightText }}</text>
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
	},
	computed: {
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
