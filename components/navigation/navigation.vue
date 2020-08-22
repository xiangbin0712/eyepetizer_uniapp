<template>
	<view class="content ">
		<!-- 顶部导航栏 -->
		<view class="top-navigation">
			<view class="status_bar"><!-- 状态栏 --></view>
			<!-- 导航栏 -->
			<view class="navigation flex">
				<view class="left flex-center">left</view>
				<view class="center">
					<text class="title" v-if="title">{{ title }}</text>
					<slot></slot>
				</view>
				<view class="right">right</view>
				<!-- <view class="right flex flex-center">
					<icon-button icon="\ue63a" @click="clickIcon"></icon-button>
					<icon-button icon="\ue626"></icon-button>
				</view> -->
			</view>
		</view>
		<view class="placeholder"></view>
	</view>
</template>

<script>
import iconButton from '../icon-button/icon-button.vue';
export default {
	components: {
		iconButton
	},
	props: {
		title: String,
		default: ''
	},
	data() {
		return {
			statusBarHeight: 0 //状态栏高度
		};
	},
	computed: {
		// placeholderHeight() {
		// 	let placeholderHeight = this.statusBarHeight + uni.upx2px(90);
		// 	return `height:${placeholderHeight}px`;
		// }
	},

	mounted() {
		// 动态获取顶部导航栏高度
		// this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	},

	methods: {
		clickIcon() {
			// 监听导航栏图标点击
			console.log(123);
		}
	}
};
</script>

<style scoped>
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.top-navigation {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.navigation {
	height: 90rpx;
	background-color: #FAFAFA;
	box-shadow: #000000;
	justify-content: space-between;
}

.placeholder {
	height: calc(var(--status-bar-height) + 90rpx);
}
</style>
