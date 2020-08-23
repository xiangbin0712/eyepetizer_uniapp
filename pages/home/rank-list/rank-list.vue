<template>
	<view class="rank-list">
		<u-tabs-swiper
			class="tabs-swiper"
			ref="uTabs"
			:list="tabList"
			bg-color="#FAFAFA"
			inactive-color="#888888"
			active-color="#303030"
			font-size="26"
			bar-height="6"
			:current="current"
			@change="tabsChange"
			:is-scroll="false"
			swiperWidth="750"
		></u-tabs-swiper>
		<swiper class="swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in 4" :key="index">
				<scroll-view class="scroll-view" scroll-y @scrolltolower="onreachBottom"><list-item v-if="dataObj" :arr="dataObj.itemList"></list-item></scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import ListItem from '@/components/list-item/list-item.vue';
export default {
	components: {
		ListItem
	},
	data() {
		return {
			defaultIdx: 0,
			dataObj: null,
			tabList: [],
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	created() {
		this.getTabList();
	},
	methods: {
		async getTabList() {
			let res = await this.$u.get('v4/rankList');
			if (res && res.tabInfo && res.tabInfo.tabList) {
				this.defaultIndex = res.tabInfo.defaultIdx;
				this.tabList = res.tabInfo.tabList;

				this.getRankList();
				// let url = res.tabInfo.tabList[res.tabInfo.defaultIdx].apiUrl;
				// this.weekObj = await this.$u.get(url);
				// console.log(this.weekObj, 11);
			}
		},

		// 获取列表
		async getRankList() {
			let url = this.tabList[this.defaultIdx].apiUrl;
			this.dataObj = await this.$u.get(url);
		},

		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			this.dataObj = [];
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
			this.defaultIdx = current;
			this.getRankList();
		},
		// scroll-view到底部加载更多
		onreachBottom() {}
	}
};
</script>

<style lang="scss" scoped>
.rank-list {
	margin: 0 30rpx;
	.tabs-swiper {
		position: fixed;
		top: 0;
	}
}
.swiper,
.swiper-item,
.scroll-view {
	height: calc(100vh - 80rpx);
}
</style>
