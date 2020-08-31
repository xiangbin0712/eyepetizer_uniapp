<template>
	<view class="recommend">
		<block v-for="(items, i) in obj.itemList" :key="i">
			<section-header v-if="items.type === 'textCard'" :leftText="items.data.text" :rightText="items.data.rightText"></section-header>
			<section-header v-if="items.type === 'ugcSelectedCardCollection'" :leftText="items.data.header.title" :rightText="items.data.header.rightText"></section-header>

			<!-- 每日开眼精选 -->
			<list-item
				v-if="items.type === 'followCard'"
				:type="items.type"
				:title="items.data.header.title"
				:avatar="items.data.header.icon"
				:bg="items.data.content.data.cover.feed"
				:duration="items.data.content.data.duration"
				:description="items.data.header.description"
			></list-item>
			<!-- 今日开眼资讯  后续封装成组件 -->
			<view class="information-card" v-if="items.type === 'informationCard'">
				<image class="border-radio-10" :src="items.data.backgroundImage" lazy-load mode=""></image>
				<view class="title-list">
					<p class="text-over-one" v-for="(item, index) in items.data.titleList" :key="index">{{ item }}</p>
				</view>
			</view>

			<!-- videoSmallCard -->
			<list-item
				v-if="items.type === 'videoSmallCard'"
				:type="items.type"
				:title="items.data.title"
				:avatar="items.data.author.icon"
				:bg="items.data.cover.feed"
				:duration="items.data.duration"
				:name="items.data.author.name"
				:category="items.data.category"
			></list-item>
			<!-- 社区精选 -->
			<!-- type===ugcSelectedCardCollection -->
			<view class="ugcSelectedCardCollection flex-col" v-if="items.type === 'ugcSelectedCardCollection'">
				<!-- @todo 后续改成组件 -->
				<view class="box" v-for="(item, i) in items.data.itemList" :style="{ backgroundImage: `url(${item.data.cover.feed})` }" :key="i">
					<!-- avatar+name+图片数量 -->
					<view class="author-info flex">
						<image class="avatar border-radio-round" :src="item.data.userCover" mode=""></image>
						<text class="name text-bold text-white">{{ item.data.nickname }}</text>
					</view>
				</view>
			</view>
			<!-- 推荐创作主题 -->
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
import ListItem from '@/components/list-item/list-item.vue';
import SectionHeader from '@/components/section-header/section-header.vue';
export default {
	components: {
		ListItem,
		SectionHeader
	},
	props: {
		obj: {}
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.recommend {
	margin: 0 30rpx;
}
.title {
	border: 1px solid;
	height: 100rpx;
	.title-left {
		font-weight: bold;
		font-size: 36rpx;
	}
}

// 社区精选
.ugcSelectedCardCollection {
	height: 340rpx;
	width: 690rpx;
	flex-wrap: wrap;
	.box {
		background-size: 100% 100%;
		position: relative;
		background-repeat: no-repeat;
		&:not(:first-child) {
			flex: 1;
		}
		&:first-child {
			height: 100%;
			margin-right: 6rpx;
		}
		&:nth-child(2) {
			margin-bottom: 6rpx;
		}
	}
	.author-info {
		position: absolute;
		bottom: 20rpx;
		right: 10rpx;
		.avatar {
			height: 40rpx;
			width: 40rpx;
			border: 1px solid #ffffff;
			margin-right: 10rpx;
		}
		.name {
			font-size: 24rpx;
		}
	}
}

// 今日 开眼资讯
.information-card {
	image {
		height: 370rpx;
		width: 690rpx;
	}
	.title-list {
		padding: 20rpx 0;
		width: 690rpx;
		background-color: #ededed;
		p {
			color: #424242;
			line-height: 2;
			font-size: 26rpx;
			padding-left: 30rpx;
		}
	}
}
</style>
