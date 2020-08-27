<template>
	<view class="item-list">
		<!-- <view class="section">
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
		</view> -->

		<!-- type  videoSmallCard -->
		<view v-if="type === 'videoSmallCard'" class="section flex" :class="type">
			<!-- @todo 后续封装成组件 -->
			<view class="preview " :style="{ backgroundImage: `url(${bg})` }"></view>
			<view class="right flex-1 flex-col">
				<text class="title">{{ title }}</text>
				<view class="tags-share flex">
					<view class="tags">
						<text class="tag">#{{ category }}</text>
						<text class="bias-line">/</text>
						<text class="tag">{{ name }}</text>
					</view>
					<text class="share">share</text>
				</view>
			</view>
		</view>

		<!-- briefCard -->
		<view v-if="type === 'briefCard'" class="section flex" :class="type">
			<view class="left flex flex-1">
				<image :src="bg" lazy-load mode=""></image>
				<view class="text-content flex-col">
					<text class="title">{{ title }}</text>
					<text class="description">{{ description }}</text>
				</view>
			</view>
			<text class="focus-btn hairline-border">+关注</text>
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
		name: String,
		category: String,
		avatar: String,
		title: String,
		description: String,
		label: String, //广告商标
		type: {
			type: String,
			required: true
		}
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
// .list-item {
// 	padding: 20rpx 0;
// 	&:after {
// 		border-bottom: 1rpx solid #ededed;
// 	}
// }

// .preview {
// 	position: relative;
// 	height: 380rpx;
// 	margin-bottom: 20rpx;
// 	width: 100%;
// 	image {
// 		position: absolute;
// 		height: 100%;
// 		width: 100%;
// 		border-radius: 10rpx;
// 	}
// 	.duration {
// 		position: absolute;
// 		color: #ffffff;
// 		font-weight: bold;
// 		background-color: rgba(0, 0, 0, 0.5);
// 		border-radius: 4rpx;
// 		font-size: 24rpx;
// 		padding: 2rpx 4rpx;
// 		bottom: 10rpx;
// 		right: 20rpx;
// 	}
// 	.label {
// 		color: #ffffff;
// 		position: absolute;
// 		right: 20rpx;
// 		top: 20rpx;
// 		border-radius: 4rpx;
// 		font-size: 24rpx;
// 		padding: 2rpx 4rpx;
// 		border: 1rpx solid rgba(2555, 255, 255, 0.2);
// 		background-color: rgba(0, 0, 0, 0.1);
// 	}
// }
// .info {
// 	.avatar {
// 		height: 80rpx;
// 		width: 80rpx;
// 		border-radius: 50%;
// 		margin-right: 20rpx;
// 	}
// 	.title {
// 		font-weight: bold;
// 		font-size: 28rpx;
// 	}
// 	.description {
// 		font-size: 24rpx;
// 		color: #888888;
// 	}
// }

// videoSmallCard
.videoSmallCard {
	// border: 1px solid red;
	.preview {
		background-size: 100%;
		border-radius: 10rpx;
		height: 170rpx;
		width: 300rpx;
	}
	.right {
		margin-left: 20rpx;
		height: 170rpx;
		justify-content: space-around;
		.title {
			font-size: 30rpx;
			line-height: 1.2;
			font-weight: bold;
			color: #3c3c3c;
		}
		.tags-share {
			justify-content: space-between;
			color: #a3a3a3;
			font-size: 24rpx;
		}
		.bias-line {
			margin: 0 4rpx;
		}
	}
}

// briefCard
.briefCard {
	.title {
		font-size: 28rpx;
		color: #464646;
		font-weight: bold;
	}
	.description {
		font-size: 24rpx;
		color: #898989;
	}
	image {
		border-radius: 10rpx;
		height: 90rpx;
		width: 90rpx;
		margin-right: 30rpx;
	}

	.focus-btn {
		font-size: 24rpx;
		padding: 4rpx 10rpx;
		border-radius: 6rpx;
		&:after {
			border: 1px solid #888888;
			border-radius: 10rpx;
		}
	}
}
</style>
