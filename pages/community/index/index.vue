<template>
	<view class="home">
		<swiper class="swiper" :current="current">
			<!-- 推荐 -->
			<swiper-item class="swiper-item"><community-recommend></community-recommend></swiper-item>
			<!-- 关注 -->
			<swiper-item class="swiper-item"><community-focus></community-focus></swiper-item>
		</swiper>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
import CommunityFocus from '../focus/focus.vue';
import CommunityRecommend from '../recommend/recommend.vue';
export default {
	components: {
		CommunityFocus,
		CommunityRecommend
	},
	data() {
		return {
			current: 1
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.home {
	border: 1px solid;
	height: 100vh;
}

.content {
	height: 100vh;
}
.swiper,
.swiper-item {
	height: 100%;
}

.list {
	height: 50px;
	border: 1px solid;
	text-align: center;
}
</style>
