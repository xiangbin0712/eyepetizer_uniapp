<template>
	<view class="tag">
		<view class="top flex-col" :style="{ backgroundImage: `url(${tagInfo.headerImage})` }">
			<text class="mask"></text>
			<text class="tag-name row">{{ tagInfo.name }}</text>
			<text class="tag-description row">{{ tagInfo.description }}</text>
			<view class="care-join row flex">
				<text class="care">{{ tagInfo.tagFollowCount }}</text>
				<text>人关注</text>
				<text class="line">|</text>
				<text class="join">{{ tagInfo.lookCount }}</text>
				<text>人参与</text>
			</view>
			<text class="btn row flex-center">+关注</text>
		</view>
		<!-- tabs -->
		<u-sticky :offset-top="navigationBarHeight">
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
		</u-sticky>
		<swiper class="swiper" :current="defaultIdx" @change="swiperChange">
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<!-- <scroll-view class="scroll-view" scroll-y="true"> -->
				<block v-for="(items, i) in tuijian.itemList" :key="i" v-if="tuijian">
					<section-header v-if="items.type === 'textCard'" :leftText="items.data.text"></section-header>
					<!-- followCard -->
					<list-item
						v-if="items.type === 'followCard'"
						:type="items.type"
						:title="items.data.header.title"
						:bg="items.data.content.data.cover.feed"
						:avatar="items.data.content.data.author.icon"
						:duration="items.data.content.data.duration"
						:description="items.data.header.description"
					></list-item>
					<!-- videoSmallCard -->
					<list-item
						v-if="items.type === 'videoSmallCard'"
						:type="items.type"
						:title="items.data.title"
						:bg="items.data.cover.feed"
						:category="items.data.category"
						:duration="items.data.duration"
					></list-item>

					<!-- autoPlayFollowCard -->
					<list-item
						v-if="items.type === 'autoPlayFollowCard'"
						:type="items.type"
						:title="items.data.content.data.title"
						:bg="items.data.content.data.cover.feed"
						:playUrl="items.data.content.data.playUrl"
						:issuerName="items.data.header.issuerName"
						:description="items.data.content.data.description"
						:time="items.data.header.time"
						:avatar="items.data.content.data.author.icon"
						:tags="items.data.content.data.tags"
						:consumption="items.data.content.data.consumption"
					></list-item>
				</block>
				<!-- </scroll-view> -->
			</swiper-item>
			<!-- 广场 -->
			<swiper-item class="swiper-item"><scroll-view class="scroll-view" scroll-y="true">1</scroll-view></swiper-item>
		</swiper>
	</view>
</template>

<script>
import CNavigation from '@/components/navigation/navigation.vue';
import SectionHeader from '@/components/section-header/section-header.vue';
import ListItem from '@/components/list-item/list-item.vue';
export default {
	components: {
		ListItem,
		CNavigation,
		SectionHeader
	},
	data() {
		return {
			tabList: [],
			defaultIdx: 0,
			tagInfo: {},
			id: null,
			tuijian: {},
			guangchang: {}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.init();
		}
	},
	methods: {
		async init() {
			this.getTagInfo();
			// this.getTuiJian();
			// this.getGuangChang();
		},
		async getTagInfo() {
			let res = await this.$u.get('v6/tag/index', {
				id: this.id
			});
			this.tagInfo = res.tagInfo;
			this.tabList = res.tabInfo.tabList;
			this.defaultIdx = res.tabInfo.defaultIdx;
			this.getTuiJian();
			this.getGuangChang();
		},
		async getTuiJian() {
			let res = await this.$u.get('v1/tag/videos', {
				id: this.id
			});
			console.log(res,"tuijian")
			this.tuijian = res;
		},
		async getGuangChang() {
			let res = await this.$u.get('v6/tag/dynamics', {
				id: this.id
			});
			this.guangchang = res;
		},

		tabsChange(index) {
			this.defaultIdx = index;
		},
		swiperChange(e) {
			this.defaultIdx = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	height: 440rpx;
	background-size: 100%;
	justify-content: flex-end;
	align-items: center;
	color: #ffffff;
	position: relative;
	.row {
		margin-bottom: 20rpx;
		z-index: 1;
	}
	.mask {
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.tag-name {
		font-weight: bold;
		font-size: 46rpx;
	}
	.btn.row {
		border: 1rpx solid #ffffff;
		font-size: 24rpx;
		font-weight: bold;
		border-radius: 6rpx;
		padding: 0 10rpx;
		margin-bottom: 40rpx;
	}
	.line {
		padding: 0 4rpx;
	}
	.care,
	.join {
		margin-right: 10rpx;
	}
}

.swiper {
	height: calc(100vh - 90rpx - 440rpx);
	margin: 0 30rpx;
	.swiper-item,
	.scroll-view {
		height: 100%;
		overflow: auto;
	}
}
</style>
