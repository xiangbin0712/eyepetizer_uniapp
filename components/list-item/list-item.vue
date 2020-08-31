<template>
	<view class="list-item">
		<!-- type followCard -->
		<view class="section" :class="type" v-if="type === 'followCard' || type === 'video'">
			<view class="preview border-radio-10" :style="{ backgroundImage: `url(${bg})` }">
				<text class="duration text-bold text-white">{{ duration | setDuration }}</text>
			</view>
			<view class="info flex">
				<view class="left flex flex-1">
					<image class="avatar border-radio-round" :src="avatar" mode=""></image>
					<view class="text-container flex-col">
						<text class="title text-over-one text-bold">{{ title }}</text>
						<text class="description" v-if="description">{{ description }}</text>
						<view class="tags" v-else>
							<text class="tag">{{ name }}</text>
							<text class="bias-line">/</text>
							<text class="tag">#{{ category }}</text>
						</view>
					</view>
				</view>
				<i class="share iconfont icon-fenxiang text-bold"></i>
			</view>
		</view>

		<!-- type  videoSmallCard -->
		<view @click="onClick" v-if="type === 'videoSmallCard'" class="section flex" :class="type">
			<!-- @todo 后续封装成组件 -->
			<view class="preview " :style="{ backgroundImage: `url(${bg})` }"></view>
			<view class="right flex-1 flex-col">
				<text class="title" :style="_titleColor">{{ title }}</text>
				<view class="tags-share flex">
					<view class="tags">
						<text class="tag">#{{ category }}</text>
						<text class="bias-line">/</text>
						<text class="tag">{{ name }}</text>
					</view>
					<i class="share iconfont icon-fenxiang text-bold"></i>
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
			<text v-if="showBtn" @click="share" class="focus-btn hairline-border">+关注</text>
		</view>

		<!-- autoPlayFollowCard -->
		<view class="autoPlayFollowCard section" v-if="type === 'autoPlayFollowCard'">
			<view class="user-info flex">
				<image :src="avatar" class="avatar border-radio-round" mode=""></image>
				<view class="user-info_right flex-1 flex-col">
					<text class="issuer-name text-bold">{{ issuerName }}</text>
					<text class="time-title">
						<text class="time">{{ time | setTime }} 发布:</text>
						<text class="title text-over-one  text-bold">{{ title }}</text>
					</text>
				</view>
			</view>
			<text class="description">{{ description }}</text>
			<!-- tags -->
			<view class="tags flex" v-if="tags.length">
				<text class="tag" v-for="(tag, i) in tags" :key="i">{{ tag.name }}</text>
			</view>
			<!-- video -->
			<view class="video"><video class="auto-video" autoplay="false" show-fullscreen-btn :src="playUrl"></video></view>
			<!-- 功能区 -->
			<view class="action-btns flex">
				<text class="action-btns-item">
					<i class="iconfont icon-B"></i>
					<text v-if="consumption.realCollectionCount">{{ consumption.realCollectionCount }}</text>
				</text>
				<text class="action-btns-item">
					<i class="iconfont icon-fenxiang"></i>
					<text v-if="consumption.replyCount">{{ consumption.replyCount }}</text>
				</text>
				<text class="action-btns-item">
					<i class="iconfont icon-shoucang"></i>
					<text>收藏</text>
				</text>
				<text class="action-btns-item"><i class="share iconfont icon-fenxiang text-bold"></i></text>
			</view>
		</view>
	</view>
</template>

<script>
import { timeConvert } from '@/utils/util.js';
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
		issuerName: String,
		consumption: Object, //功能对象 喜欢/播放/评论
		time: {
			//发布时间
			type: [String, Number]
		},
		tags: {
			type: Array,
			default() {
				return [];
			}
		},
		type: {
			type: String,
			required: true
		},
		showBtn: Boolean,
		id: {
			type: [String, Number]
		},
		titleColor: {
			type: String,
			default: ' #3c3c3c;'
		},
		playUrl: String
	},
	computed: {
		_titleColor() {
			return `color:${this.titleColor}`;
		}
	},
	filters: {
		setDuration(value) {
			if (!value) return '';
			let time = (value / 60).toFixed(2);
			if (time < 10) return '0' + time;
		},
		setTime(value) {
			if (!value) return '';
			let tody = new Date(new Date().toLocaleDateString()).getTime();
			if (value > tody) {
				return timeConvert(value, 'h:m');
			}
			return timeConvert(value, 'y/m/d');
		}
	},
	methods: {
		onClick() {
			uni.navigateTo({
				url: `/pages/common/play-page/play-page?id=${this.id}`,
				animationType: 'slide-in-bottom',
				animationDuration: 500
			});
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
.followCard,
.video {
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
		color: #888888;
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
		}
		.description {
			font-size: 24rpx;
			color: #888888;
		}
		.tags {
			color: #a3a3a3;
			font-size: 24rpx;
		}
		.bias-line {
			padding: 0 4rpx;
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

// autoPlayFollowCard
.autoPlayFollowCard {
	.user-info {
		color: #000000;
		.avatar {
			height: 60rpx;
			width: 60rpx;
			margin-right: 20rpx;
		}
		.issuer-name {
			font-size: 30rpx;
		}
		.time {
			font-size: 26rpx;
			color: #999999;
		}
		.title {
			font-size: 26rpx;
			margin-left: 10rpx;
			display: inline-block;
			max-width: 380rpx;
			vertical-align: middle;
		}
	}
	.description {
		font-size: 28rpx;
		opacity: 0.9;
	}

	.tags {
		margin: 20rpx 0;
		.tag {
			background-color: #ecf3fb;
			color: #709ccf;
			font-size: 26rpx;
			margin-right: 15rpx;
			padding: 4rpx 6rpx;
			border-radius: 4rpx;
		}
	}
	.video {
		.auto-video {
			border-radius: 10rpx;
			width: 690rpx;
			height: 370rpx;
			background-color: red;
		}
	}

	.action-btns {
		margin: 20rpx 0;
		justify-content: space-between;
		.action-btns-item {
			color: #888888;
			vertical-align: middle;
			.iconfont {
				margin-right: 20rpx;
			}
		}
	}
}
</style>
