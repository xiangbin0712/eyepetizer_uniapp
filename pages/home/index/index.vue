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
					<home-dailyPaper :obj="feedData" ref="feed"></home-dailyPaper>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <c-tabbar :list="vuex_tabbar" :current="0"></c-tabbar> -->
		<u-tabbar :list="vuex_tabbar" midButton></u-tabbar>
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
			findData: null,
			tuijianData: null,
			feedData: null,
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
	watch: {
		current(old) {
			switch (old) {
				case 0:
					!this.findData ? this.getFind() : '';
					break;
				case 1:
					!this.tuijianData ? this.getTuiJian() : '';
					break;
				case 2:
					!this.feedData ? this.getFeed() : '';
					break;
			}
		}
	},
	computed: {
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
		async getFeed() {
			console.log('tuijian');
			let res = await this.$u.get('v5/index/tab/feed');
			this.feedData = res;
		},

		tabsChange(index) {
			this.current = index;
		},
		swiperChange(e) {
			this.current = e.detail.current;
		},
		// 底部刷新
		scrolltolower(e) {},
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
.swiper {
	height: calc(100vh - 50px - 90rpx - var(--status-bar-height));
}
.swiper-item,
.scroll-view {
	height: 100%;
}
</style>
