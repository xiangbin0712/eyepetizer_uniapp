<template>
	<view class="inform">
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
			<!-- 推送 -->
			<swiper-item class="swiper-item"><inform-push></inform-push></swiper-item>
			<!-- 互动 -->
			<swiper-item class="swiper-item"><inform-private></inform-private></swiper-item>
			<!-- 私信 -->
			<swiper-item class="swiper-item"><inform-interaction></inform-interaction></swiper-item>
		</swiper>
		<!-- <u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar> -->
		<c-tabbar :list="vuex_tabbar"></c-tabbar>
	</view>
</template>

<script>
import CTabbar from '@/components/tabbar/tabbar.vue';
import CNavigation from '@/components/navigation/navigation.vue';
import InformPush from '../push/push.vue';
import InformPrivate from '../private/private.vue';
import InformInteraction from '../interaction/interaction.vue';
export default {
	components: {
		CTabbar,
		InformPush,
		CNavigation,
		InformPrivate,
		InformInteraction
	},
	data() {
		return {
			current: 0,
			list: [
				{
					name: '推送'
				},
				{
					name: '互动'
				},
				{
					name: '私信'
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
.inform {
	height: 100vh;
}

.swiper,
.swiper-item {
	height: 100%;
}
</style>
