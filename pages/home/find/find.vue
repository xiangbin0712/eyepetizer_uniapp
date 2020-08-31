<template>
	<view>
		<block v-if="obj" v-for="(items, i) in obj.itemList" :key="i">
			<view class="swiper" v-if="items.type === 'horizontalScrollCard'">
				<u-swiper :height="410" :list="items.data.itemList | setSwiperData" :effect3d="true"></u-swiper>
			</view>
			<!-- section-header -->
			<view class="section-header">
				<section-header
					v-if="(items.type === 'specialSquareCardCollection' || 'columnCardList') && items.data.header"
					:leftText="items.data.header.title"
					:rightText="items.data.header.rightText"
					:actionUrl="items.data.header.actionUrl"
				></section-header>
				<section-header v-if="items.type === 'textCard'" :leftText="items.data.text" :rightText="items.data.rightText"></section-header>
			</view>
			<!-- 热门分类 -->
			<view class="section hot-category" v-if="items.type === 'specialSquareCardCollection'">
				<scroll-view class="scroll-view" scroll-x="true">
					<view class="box-container">
						<view
							class="box border-radio-10 flex-center"
							@click="goTag(box)"
							:style="{ backgroundImage: `url(${box.data.image})` }"
							v-for="(box, i) in items.data.itemList"
							:key="i"
						>
							<text class="text text-bold text-white">{{ box.data.title }}</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 专题策划 -->
			<view class="cehua flex section" v-if="items.type === 'columnCardList'">
				<view v-for="(item, index) in items.data.itemList" :key="index" class="preview border-radio-10 flex-center" :style="{ backgroundImage: `url(${item.data.image})` }">
					<view class="mask border-radio-10"></view>
					<text class="text text-bold tac text-white">{{ item.data.title }}</text>
				</view>
			</view>
			<!-- 开眼专栏 -->
			<view class="section zhuanlan" v-if="items.type === 'banner'"><image class="border-radio-10" :src="items.data.image" lazy-load mode=""></image></view>
			<!-- 本周榜单 -->
			<list-item
				v-if="items.type === 'videoSmallCard'"
				class="videoSmallCard  section hairline-border"
				:type="items.type"
				:name="items.data.author.name"
				:category="items.data.category"
				:bg="items.data.cover.feed"
				:title="items.data.title"
				description=""
				:id="items.data.id"
			></list-item>

			<!-- 推荐主题 -->
			<list-item
				v-if="items.type === 'briefCard'"
				class="briefCard section  hairline-border"
				:type="items.type"
				:bg="items.data.icon"
				:title="items.data.title"
				:description="items.data.description"
			></list-item>
		</block>
	</view>
</template>

<script>
import { setSwiperData } from '@/common/filters.js';
import SectionHeader from '@/components/section-header/section-header.vue';
export default {
	components: {
		SectionHeader
	},
	props: {
		obj: {}
	},
	filters: {
		setSwiperData
	},

	data() {
		return {};
	},
	computed: {
		categoryList() {
			if (!this.obj) return [];
			let result = [];
			let obj = this.obj.itemList.filter(items => {
				return items.type === 'specialSquareCardCollection';
			});
			let arr = obj[0].data.itemList;
			for (let i = 0; i < arr.length; i += 6) {
				result.push(arr.slice(i, i + 6));
			}
			return result;
		}
	},

	methods: {
		goTag(params) {
			let id = params.data.id;
			uni.navigateTo({
				url: `../tag/tag?id=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper {
	height: 410rpx;
	margin: 20rpx 0;
}
.section-header,
.section {
	margin: 0 30rpx;
}
.section {
	&.hairline-border:after {
		border-bottom: 1px solid #ededed;
	}
}
.hot-category {
	margin-top: 20rpx;
	.scroll-view {
		transition: all 0.3s;
		white-space: nowrap;
		overflow: hidden;
		.box-container {
			display: inline-grid;
			grid-auto-flow: column;
			grid-template-columns: repeat(8, 200rpx);
			grid-template-rows: repeat(2, 200rpx);
			grid-column-gap: 10rpx;
			grid-row-gap: 10rpx;
			.box {
				background-size: 100%;
			}
		}
	}
}

// 专题策划
.cehua {
	flex-wrap: wrap;
	padding: 20rpx 0;
	justify-content: space-between;
	.preview {
		background-size: 100%;
		height: 200rpx;
		width: 345rpx;
		position: relative;
		margin-bottom: 10rpx;
		.mask {
			position: absolute;
			height: 200rpx;
			width: 345rpx;
			background-color: rgba(0, 0, 0, 0.3);
		}
		.text {
			position: absolute;
			margin: 0 20rpx;
			z-index: 99;
		}
	}
}

// 开眼专栏
.zhuanlan {
	height: 400rpx;
	padding: 20rpx 0;
}

// 本周榜单
.videoSmallCard {
}
// 推荐主题
.briefCard {
	&.hairline-border:after {
		border-bottom: 1px solid #ededed;
	}
}
</style>
