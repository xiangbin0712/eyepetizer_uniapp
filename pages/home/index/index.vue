<template>
	<view class="home">
		<c-navigation>
			<u-tabs
				ref="tabs"
				font-size="26"
				:list="list"
				@change="tabsChange"
				bg-color="#FAFAFA"
				:current="current"
				bar-height="6"
				bar-width="40"
				inactive-color="#888888"
				active-color="#303030"
			></u-tabs>
		</c-navigation>
		<swiper class="swiper" :current="current" @change="swiperChange">
			<!-- 发现 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><home-Find></home-Find></scroll-view>
			</swiper-item>
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><home-recommend></home-recommend></scroll-view>
			</swiper-item>
			<!-- 日报 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><home-dailyPaper></home-dailyPaper></scroll-view>
			</swiper-item>
		</swiper>
		<!-- <u-tabbar :height="80" :list="vuex_tabbar"></u-tabbar> -->
		<c-tabbar :list="vuex_tabbar"></c-tabbar>
	</view>
</template>

<script>
import HomeFind from '../find/find.vue';
import CNavigation from '@/components/navigation/navigation.vue';
import CTabbar from '@/components/tabbar/tabbar.vue';
import HomeRecommend from '../recommend/recommend.vue';
import HomeDailyPaper from '../dailyPaper/dailyPaper.vue';
export default {
	components: {
		CNavigation,
		CTabbar,
		HomeFind,
		HomeRecommend,
		HomeDailyPaper
	},
	data() {
		return {
			current: 0,
			// tabCurrent: 0,
			list: [
				{
					name: '发现'
				},
				{
					name: '推荐'
				},
				{
					name: '日报'
				}
			]
		};
	},

	methods: {
		tabsChange(index) {
			this.current = index;
		},
		swiperChange(e) {
			this.current = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper,
.swiper-item,
.scroll-view {
	height: calc(100vh - 90rpx - var(--status-bar-height) - 90rpx);
}

.list {
	height: 50px;
	border: 1px solid;
	text-align: center;
}

.scrollview {
	height: 100vh;
	border: 1px solid;
}
</style>
