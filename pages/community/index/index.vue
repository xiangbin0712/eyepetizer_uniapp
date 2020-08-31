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
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><community-recommend></community-recommend></scroll-view>
			</swiper-item>
			<!-- 关注 -->
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true"><community-focus></community-focus></scroll-view>
			</swiper-item>
		</swiper>
		<u-tabbar  :list="vuex_tabbar" midButton></u-tabbar>
	</view>
</template>

<script>
import CTabbar from '@/components/tabbar/tabbar.vue';
import CommunityFocus from '../focus/focus.vue';
import CNavigation from '@/components/navigation/navigation.vue';
import CommunityRecommend from '../recommend/recommend.vue';
export default {
	components: {
		CTabbar,
		CNavigation,
		CommunityFocus,
		CommunityRecommend
	},
	data() {
		return {
			current: 0,
			list: [
				{
					name: '推荐'
				},
				{
					name: '关注'
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
	height: calc(100vh - 50px - 90rpx - var(--status-bar-height));
}
</style>
