<template>
	<view class="hairline-border list-item">
		<view class="preview">
			<image lazy-load :src="bg" mode=""></image>
			<text class="duration" v-if="duration">{{ duration | formatTime }}</text>
			<text class="label" v-if="label">{{ label }}</text>
		</view>
		<view class="info flex">
			<view class="auth"><image v-if="avatar" class="avatar" lazy-load :src="avatar" mode=""></image></view>
			<view class="text-content flex-1">
				<view class="title" v-if="title">{{ title }}</view>
				<view class="description" v-if="description">{{ description }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	props: {
		bg: String,
		duration: Number,
		avatar: String,
		title: String,
		description: String,
		label: String //广告商标
	},
	filters: {
		formatTime(value) {
			if (!value) return '';
			let time = (value / 60).toFixed(2);
			if (time < 10) return '0' + time;
		}
	}
};
</script>

<style lang="scss" scoped>
.list-item {
	padding: 20rpx 0;
	&:after {
		border-bottom: 1rpx solid #ededed;
	}
}

.preview {
	position: relative;
	height: 380rpx;
	margin-bottom: 20rpx;
	width: 100%;
	image {
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: 10rpx;
	}
	.duration {
		position: absolute;
		color: #ffffff;
		font-weight: bold;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 4rpx;
		font-size: 24rpx;
		padding: 2rpx 4rpx;
		bottom: 10rpx;
		right: 20rpx;
	}
	.label {
		color: #ffffff;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		padding: 2rpx 4rpx;
		border: 1rpx solid rgba(2555, 255, 255, 0.2);
		background-color: rgba(0, 0, 0, 0.1);
	}
}
.info {
	// padding: 20rpx 0;
	.avatar {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.title {
		font-weight: bold;
		font-size: 28rpx;
	}
	.description {
		font-size: 24rpx;
		color: #888888;
	}
}
</style>
