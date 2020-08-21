<template>
	<view class="inform">
		<swiper class="swiper" :current="current">
			<!-- 推送 -->
			<swiper-item class="swiper-item"><inform-push></inform-push></swiper-item>
			<!-- 互动 -->
			<swiper-item class="swiper-item"><inform-private></inform-private></swiper-item>
			<!-- 私信 -->
			<swiper-item class="swiper-item"><inform-interaction></inform-interaction></swiper-item>
		</swiper>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
import InformPush from '../push/push.vue';
import InformPrivate from '../private/private.vue';
import InformInteraction from '../interaction/interaction.vue';
export default {
	components: {
		InformPush,
		InformPrivate,
		InformInteraction
	},
	data() {
		return {
			current: 0
		};
	},
	methods: {}
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
