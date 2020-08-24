<template>
	<view class="rank-list">
		<u-tabs
			class="tabs"
			ref="tabs"
			font-size="26"
			:list="tabList"
			@change="tabsChange"
			bg-color="#FAFAFA"
			:current="defaultIdx"
			bar-height="6"
			item-width="250"
			:is-scroll="false"
			inactive-color="#888888"
			active-color="#303030"
		></u-tabs>
		<swiper easing-function="easeInCubic" class="swiper" :current="defaultIdx" @change="swiperChange">
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true" @scrolltolower="onLower">
					<block v-if="obj.week" v-for="(item, i) in obj.week" :key="i">
						<list-item
							:title="item.data.title"
							:avatar="item.data.author.icon"
							:bg="item.data.cover.homepage"
							:duration="item.data.duration"
							:description="item.data.author.name + item.data.category"
						></list-item>
					</block>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true">
					<block v-if="obj.month" v-for="(item, i) in obj.month" :key="i">
						<list-item
							:title="item.data.title"
							:avatar="item.data.author.icon"
							:bg="item.data.cover.homepage"
							:duration="item.data.duration"
							:description="item.data.author.name + item.data.category"
						></list-item>
					</block>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view class="scroll-view" scroll-y="true">
					<block v-if="obj.historical" v-for="(item, i) in obj.historical" :key="i">
						<list-item
							:title="item.data.title"
							:avatar="item.data.author.icon"
							:bg="item.data.cover.feed"
							:duration="item.data.duration"
							:description="item.data.author.name + item.data.category"
						></list-item>
					</block>
				</scroll-view>
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
			tabList: [],
			obj: {},
			count: 10,
			textList: ['week', 'month', 'historical']
		};
	},
	mounted() {
		this.getTabList();
	},
	methods: {
		async getTabList() {
			let res = await this.$u.get('v4/rankList');
			if (res && res.tabInfo && res.tabInfo.tabList) {
				this.defaultIndex = res.tabInfo.defaultIdx;
				this.tabList = res.tabInfo.tabList;
				this.getRankList();
			}
		},

		// 获取列表
		async getRankList() {
			let defaultIdx = this.defaultIdx;
			let url = this.tabList[defaultIdx].apiUrl;
			let res = await this.$u.get(url);
			let key = this.textList[defaultIdx];
			if (res && res.itemList) {
				this.$set(this.obj, key, res.itemList);
			}
		},

		// tabs通知swiper切换
		tabsChange(index) {
			this.defaultIdx = index;
			this.getRankList();
		},
		/**
		 * 切换swiper获取数据
		 * 当前页面没有数据 =>请求数据
		 * 在当前页为周排行或者总排行时候互相重置
		 */
		swiperChange(e) {
			let defaultIdx = e.detail.current;
			this.defaultIdx = defaultIdx;
			let key = this.textList[defaultIdx];
			if (!this.obj[key] || !this.obj[key].length) this.getRankList();
			if (defaultIdx == 0) this.obj.historical = [];
			if (defaultIdx == 2) this.obj.week = [];
		},
		

		// 触底
		// @todo 加锁
		onLower() {
			// console.log('loadmore');
		}
	}
};
</script>

<style lang="scss" scoped>
.rank-list {
	margin: 0 30rpx;
	.tabs {
		position: fixed;
		z-index: 1;
		top: 0;
	}
}

.swiper {
	margin-top: 80rpx;
	height: calc(100vh - 90rpx);
	.swiper-item,
	.scroll-view {
		height: 100%;
	}
}
</style>
