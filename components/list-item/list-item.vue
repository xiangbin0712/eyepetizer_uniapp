<template>
	<view class="">
		<view class="list hairline-border" v-for="(item, index) in arr" :key="index">
			<view class="preview">
				<image v-if="type == 1" :src="item.data.cover.homepage" lazy-load mode=""></image>
				<image v-if="type == 2" :src="item.data.content.data.cover.homepage" lazy-load mode=""></image>
				<text v-if="type == 1" class="duration">{{ item.data.duration | formatTime }}</text>
				<text v-if="type == 2" class="duration">{{ item.data.content.data.duration | formatTime }}</text>
			</view>
			<view class="text-content flex">
				<view class="auth">
					<image v-if="type == 1" class="avatar" :src="item.data.author.icon" mode=""></image>
					<image v-if="type == 2" class="avatar" :src="item.data.content.data.author.icon" mode=""></image>
				</view>
				<view class="info">
					<view v-if="type == 1" class="title">{{ item.data.title }}</view>
					<view v-if="type == 2" class="title">{{ item.data.content.data.title }}</view>
					<view v-if="type == 1" class="tags">{{item.data.author.name}} / {{ item.data.category }}</view>
					<view v-if="type == 2" class="tags">{{ item.data.header.description }}</view>
				</view>
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
		arr: {
			type: Array,
			default() {
				return [];
			}
		},
		type: {
			type: [Number, String],
			default: 1
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
.list {
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
}
.text-content {
	// padding: 20rpx 0;
	.avatar {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.info {
		.title {
			font-weight: bold;
			font-size: 28rpx;
		}
		.tags {
			font-size: 24rpx;
			color: #888888;
		}
	}
}
</style>
