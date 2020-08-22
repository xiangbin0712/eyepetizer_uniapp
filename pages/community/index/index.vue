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
			<swiper-item class="swiper-item"><community-recommend></community-recommend></swiper-item>
			<!-- 关注 -->
			<swiper-item class="swiper-item"><community-focus></community-focus></swiper-item>
		</swiper>
		<!-- <u-tabbar :list="vuex_tabbar"></u-tabbar -->
		<c-tabbar :list="vuex_tabbar"></c-tabbar>
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
.swiper-item {
	// height: 100%;
	height: 100vh;
}

.list {
	height: 50px;
	border: 1px solid;
	text-align: center;
}
</style>
