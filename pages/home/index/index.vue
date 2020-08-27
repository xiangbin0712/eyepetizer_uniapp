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
				<scroll-view class="scroll-view" scroll-y="true"><home-Find :obj="findData"></home-Find></scroll-view>
			</swiper-item>
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><home-recommend :obj="tuijianData"></home-recommend></scroll-view>
			</swiper-item>
			<!-- 日报 -->
			<swiper-item class="swiper-item">
				<scroll-view
					@scrolltolower="scrolltolower"
					@refresherpulling="onPulling"
					refresher-enabled
					refresher-threshold="70"
					@refresherrefresh="onRefresh"
					class="scroll-view"
					scroll-y="true"
				>
					<home-dailyPaper ref="feed"></home-dailyPaper>
				</scroll-view>
			</swiper-item>
		</swiper>
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
			current: 1,
			findData: {},
			tuijianData: {},
			feedData: {},
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
	onLoad() {
		this.init();
	},

	methods: {
		init() {
			switch (this.current) {
				case 0:
					return this.getFind();
				case 1:
					return this.getTuiJian();
				case 2:
					return this.getFeed();
			}
		},
		async getFind() {
			console.log('find');
			let res = await this.$u.get('v7/index/tab/discovery');
			this.findData = res;
		},
		async getTuiJian() {
			console.log('tuijian');
			let res = await this.$u.get('v5/index/tab/allRec', {
				page: 0
			});
			this.tuijianData = res;
		},
		getFeed() {},

		tabsChange(index) {
			this.current = index;
		},
		swiperChange(e) {
			this.current = e.detail.current;
		},
		// 底部刷新
		scrolltolower(e) {
			this.$refs.feed.upData();
		},
		onRefresh() {
			console.log('xiala');
		},
		onPulling() {
			console.log('refresherpulling');
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
