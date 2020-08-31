<template>
	<view class="my">
		<c-navigation></c-navigation>
		<view class="top flex-col hairline-border-bottom">
			<view class="avatar"></view>
			<text class="text">点击登录即可评论及发布内容</text>
			<view class="collect-cache flex">
				<view class="collect flex-center flex-1">收藏</view>
				<view class="cache flex-center flex-1">缓存</view>
			</view>
		</view>

		<view class="menu-list">
			<view class="list flex-center" v-for="(list, i) in menu" :key="i">{{ list.text }}</view>
		</view>
		<u-tabbar :list="vuex_tabbar" mid-button></u-tabbar>
	</view>
</template>

<script>
import CTabbar from '@/components/tabbar/tabbar.vue';
import CNavigation from '@/components/navigation/navigation.vue';
export default {
	components: {
		CTabbar,
		CNavigation
	},
	data() {
		return {
			menu: [
				{
					text: '我的关注',
					path: ''
				},
				{
					text: '观看记录',
					path: ''
				},
				{
					text: '通知开关',
					path: ''
				},
				{
					text: '我的徽章',
					path: ''
				},
				{
					text: '意见反馈',
					path: ''
				},
				{
					text: '我要投稿',
					path: ''
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.top {
	height: 25vh;
	justify-content: flex-end;
	align-items: center;
	&:after {
		border-bottom: 1px solid #555555;
	}

	.avatar {
		height: 130rpx;
		width: 130rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.1);
	}
	.text {
		font-size: 26rpx;
		margin: 20rpx 0 30rpx 0;
		color: #303030;
	}
	.collect-cache {
		height: 80rpx;
		margin-bottom: 40rpx;
		width: 100%;
		color: #848484;
		font-size: 32rpx;
		position: relative;

		&::after {
			content: '';
			background-color: #888888;
			height: 40rpx;
			width: 1rpx;
			position: absolute;
			left: 50%;
		}
	}
}
.menu-list {
	height: 60vh;
	display: flex;
	flex-direction: column;

	.list {
		flex: 1;
		font-size: 30rpx;
		color: #303030;
	}
}
</style>
