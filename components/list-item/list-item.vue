<template>
	<view class="list-item">
		<!-- type followCard -->
		<view class="section" :class="type" v-if="type === 'followCard'">
			<view class="preview border-radio-10" :style="{ backgroundImage: `url(${bg})` }">
				<text class="duration text-bold text-white">{{ duration | formatTime }}</text>
			</view>
			<view class="info flex">
				<view class="left flex flex-1">
					<image class="avatar border-radio-round" :src="avatar" mode=""></image>
					<view class="text-container flex-col">
						<text class="title text-over-one  text-bold">{{ title }}</text>
						<text class="description">{{ description }}</text>
					</view>
				</view>
				<text class="share">share</text>
			</view>
		</view>

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
				<view class="text-content flex-col flex-1">
					<text class="title">{{ title }}</text>
					<text class="description">{{ description }}</text>
				</view>
			</view>
			<text v-if="showBtn" class="focus-btn hairline-border">+关注</text>
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
		},
		showBtn: Boolean
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
	// border: 1px solid red;
	// &:after {
	// 	border-bottom: 1rpx solid #ededed;
	// }
}

// followCard
.followCard {
	.preview {
		height: 380rpx;
		background-size: 100%;
		position: relative;
		.duration {
			position: absolute;
			bottom: 20rpx;
			right: 20rpx;
			font-size: 24rpx;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 4rpx 10rpx;
			border-radius: 4rpx;
		}
	}
	.share {
		margin-left: 20rpx;
	}
	.info {
		padding: 20rpx 0;
		.avatar {
			height: 80rpx;
			width: 80rpx;
			margin-right: 20rpx;
		}
		.title {
			font-size: 28rpx;
			// border: 1px solid red;
		}
		.description {
			font-size: 24rpx;
			color: #888888;
		}
	}
}

// videoSmallCard
.videoSmallCard {
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
