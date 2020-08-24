<template>
	<view class="recommend">
		<block v-for="(items, i) in arr" :key="i">
			<section-header v-if="items.type === 'textCard'" :leftText="items.data.text" :rightText="items.data.rightText"></section-header>
			<list-item
				v-if="items.type === 'followCard'"
				:title="items.data.header.title"
				:avatar="items.data.header.icon"
				:bg="items.data.content.data.cover.homepage"
				:duration="items.data.content.data.duration"
				:description="items.data.header.description"
			></list-item>
			<!-- type:banenr3 dataType:Banner -->
			<list-item
				v-if="items.data.dataType === 'Banner'"
				:title="items.data.header.title"
				:avatar="items.data.header.icon"
				:bg="items.data.image"
				:label="items.data.label.text"
				:description="items.data.header.description"
			></list-item>
			<!-- 今日开眼资讯  后续封装成组件 -->
			<view class="information-card" v-if="items.type === 'informationCard'">
				<image :src="items.data.backgroundImage" lazy-load mode=""></image>
				<view class="title-list">
					<p v-for="(item, index) in items.data.titleList" :key="index">{{ item }}</p>
				</view>
			</view>

			<!-- 播放的广告 -->
			<list-item
				v-if="items.type === 'autoPlayVideoAd'"
				label="广告"
				:title="items.data.detail.title"
				:avatar="items.data.detail.icon"
				:bg="items.data.detail.imageUrl"
				:description="items.data.detail.description"
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
	data() {
		return {
			arr: [],
			nextPageUrl: ''
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		async getData() {
			let url =
				'v5/index/tab/allRec?page=0&udid=f4007ffeb2e60ff2&vc=6030012&vn=6.3.01&size=1080X2029&deviceModel=MI%208&first_channel=xiaomi&last_channel=xiaomi&system_version_code=29%20HTTP/1.1';
			let res = await this.$u.get(url);
			if (res && res.itemList) {
				this.nextPageUrl = res.nextPageUrl;
				this.arr = res.itemList;
			}
		}
	}
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

// banner
// .banner {
// 	height: 370rpx;
// 	width: 690rpx;
// 	image {
// 		border-radius: 10rpx;
// 		width: 100%;
// 	}
// }

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
