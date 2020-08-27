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
				<scroll-view class="scroll-view" scroll-y="true">
					<block v-for="(item, i) in tuijian.itemList" :key="i" v-if="tuijian">
						<!-- {{item.data.header}} -->
						<section-header :leftText="item.data.text"></section-header>
						<list-item
							v-if="item.type === 'followCard' && item.data.dataType === 'FollowCard'"
							:title="item.data.header.title"
							:avatar="item.data.header.icon"
							:bg="item.data.content.data.cover.feed"
							:duration="item.data.duration"
							:description="item.data.content.data.author.name + item.data.content.data.category"
						></list-item>
					</block>
				</scroll-view>
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
			tuijian: {},
			guangchang: {}
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		async init() {
			this.getTagInfo();
			this.getTuiJian();
			this.getGuangChang();
		},
		async getTagInfo() {
			let res = await this.$u.get('v6/tag/index', {
				id: 16
			});
			this.tagInfo = res.tagInfo;
			this.tabList = res.tabInfo.tabList;
			this.defaultIdx = rs.tabInfo.defaultIdx;
		},
		async getTuiJian() {
			let res = await this.$u.get('v1/tag/videos', {
				id: 16
			});
			this.tuijian = res;
		},
		async getGuangChang() {
			let res = await this.$u.get('v6/tag/dynamics', {
				id: 16
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
	}
}
</style>
