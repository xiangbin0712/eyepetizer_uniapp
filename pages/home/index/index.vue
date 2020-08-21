<template>
	<view class="home">
		<swiper class="swiper" :current="current">
			<!-- 发现 -->
			<swiper-item class="swiper-item"><home-Find></home-Find></swiper-item>
			<!-- 推荐 -->
			<swiper-item class="swiper-item"><home-recommend></home-recommend></swiper-item>
			<!-- 日报 -->
			<swiper-item class="swiper-item"><home-dailyPaper></home-dailyPaper></swiper-item>
		</swiper>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
import HomeFind from '../find/find.vue';
import HomeRecommend from '../recommend/recommend.vue';
import HomeDailyPaper from '../dailyPaper/dailyPaper.vue';
export default {
	components: {
		HomeFind,
		HomeRecommend,
		HomeDailyPaper
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

.scrollview {
	height: 100vh;
	border: 1px solid;
}
</style>
