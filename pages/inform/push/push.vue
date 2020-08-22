<template>
	<view class="push">
		<view class="list flex" v-for="(list, i) in dataObj.messageList" :key="i">
			<image :src="list.icon" mode=""></image>
			<view class="right hairline-border-bottom flex flex-1">
				<view class="text-chunk">
					<view class="title">{{ list.title }}</view>
					<text class="time">{{ list.date | _getDateTimeBefor }}</text>
					<view class="article">{{ list.content }}</view>
				</view>
				<u-icon name="arrow-right" color="#454545" size="26"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import { getDateTimeBefor } from '@/utils/util.js';
export default {
	data() {
		return {
			dataObj: {}
		};
	},
	created() {
		this.getData();
	},
	filters: {
		_getDateTimeBefor(value) {
			return getDateTimeBefor(value);
		}
	},
	methods: {
		async getData() {
			let url = 'v3/messages?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp&last_channel=pp';
			this.dataObj = await this.$u.get(url);
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	image {
		height: 70rpx;
		margin-left: 30rpx;
		width: 70rpx;
		border: 1px solid #eeeeee;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.right {
		padding: 30rpx;
		justify-content: space-between;
		&:after {
			border-bottom: 1rpx solid #eeeeee;
		}

		.title {
			color: #454545;
			font-weight: bold;
		}
		.time {
			color: #898989;
			font-size: 26rpx;
			opacity: 0.6;
			margin: 10rpx 0;
		}
		.article {
			font-size: 26rpx;
			color: #454545;
			opacity: 0.8;
		}
	}
}
</style>
