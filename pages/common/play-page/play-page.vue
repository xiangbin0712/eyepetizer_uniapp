<template>
	<view class="play-page">
		<view class="vadio"><video v-if="vadioData" autoplay="true" :src="vadioData.playUrl"></video></view>
		<view class="content">
			<scroll-view class="scroll-view" v-if="vadioData" scroll-y="true">
				<view class="vadio-text-info">
					<image class="vadio-text-info-bg" :src="vadioData.cover.feed" mode=""></image>
					<view class="vadio-text-info-box flex-col">
						<text class="title text-white text-bold">{{ vadioData.title }}</text>
						<text class="tags">
							<text class="category">#{{ vadioData.category }}</text>
							<text class="bias-line">/</text>
							<text class="category">{{ vadioData.author.name }}</text>
						</text>
						<p class="description">{{ vadioData.description }}</p>
						<view class="action-rows flex">
							<view class="action-item">
								<i class=" iconfont icon-B text-bold"></i>
								<text class="text">{{ vadioData.consumption.collectionCount }}</text>
							</view>
							<view class="action-item">
								<i class=" iconfont icon-fenxiang text-bold"></i>
								<text class="text">{{ vadioData.consumption.shareCount }}</text>
							</view>
							<view class="action-item">
								<i class=" iconfont icon-xiazai_huaban text-bold"></i>
								<text class="text">缓存</text>
							</view>
							<view class="action-item">
								<i class=" iconfont icon-shoucang text-bold"></i>
								<text class="text">收藏</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 栏目名 -->
				<view class="demo">
					<view class="section-header flex">
						<view class="left flex flex-1">
							<image class="avatar border-radio-round" :src="vadioData.author.icon" mode=""></image>
							<view class="flex-1 flex-col">
								<text class="title text-white text-bold">{{ vadioData.author.name }}</text>
								<text class="sub-title">{{ vadioData.author.description }}</text>
							</view>
						</view>
					</view>
					<block v-for="(items, index) in related" :key="index">
						<list-item
							class="section-vadio"
							v-if="items.type === 'videoSmallCard'"
							titleColor="#ffffff"
							:type="items.type"
							:title="items.data.title"
							:avatar="items.data.author.icon"
							:bg="items.data.cover.homepage || items.data.cover.detail"
							:duration="items.data.duration"
							:category="items.data.category"
							:description="items.data.description"
						></list-item>
					</block>
				</view>
			</scroll-view>
			<!-- <view class="comment">comment</view> -->
		</view>
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
			id: null,
			vadioData: null,
			related: [],
			replies: {},
			title: '',
			output: ''
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.init();
		}
	},
	methods: {
		init() {
			this.getVadio();
		},

		async getVadio() {
			let res = await this.$u.get(`v2/video/${this.id}`);
			if (res) this.vadioData = res;
			this.getRelated();
			this.getReplies();
		},
		// 关联视频
		async getRelated() {
			let res = await this.$u.get('v4/video/related', {
				id: this.id
			});
			this.related = res.itemList;
		},
		//评论
		async getReplies() {
			let res = await this.$u.get('v2/replies/video', {
				videoId: this.id
			});
			this.replies = res;
		}
	}
};
</script>

<style lang="scss" scoped>
.play-page {
	display: flex;
	height: 100vh;
	width: 750rpx;
	flex-direction: column;
}
.vadio,
video {
	height: 500rpx;
	width: 750rpx;
}

.section-vadio {
	margin: 0 30rpx;
}
.content {
	flex: 1;
	// .comment {
	// 	height: 100rpx;
	// 	width: 750rpx;
	// 	position: fixed;
	// 	bottom: 0;
	// 	background-color: rgba(0, 0, 0, 0.7);
	// }
	.demo {
		background-color: rgba(0, 0, 0, 0.7);
	}
}

.scroll-view {
	height: calc(100vh - 500rpx);
	.vadio-text-info {
		background-color: rgba(0, 0, 0, 0.8);
	}
	.vadio-text-info-box {
		margin: 0 30rpx;
		color: #eeeeee;
		.title {
			font-size: 36rpx;
			margin: 20rpx 0;
		}
		.tags {
			margin: 20rpx 0;
			font-size: 26rpx;
		}
		.bias-line {
			margin: 0 4rpx;
		}
		.description {
			font-size: 27rpx;
			line-height: 1.1;
		}
		.action-rows {
			height: 100rpx;
			.action-item {
				margin-right: 40rpx;
				display: flex;
				align-items: center;
			}
			.iconfont {
				margin-right: 10rpx;
			}
		}
	}
	.section-header {
		margin: 0 30rpx;
		padding: 30rpx 0;
		.avatar {
			margin-right: 20rpx;
			height: 80rpx;
			width: 80rpx;
		}
		.sub-title {
			color: #eeeeee;
		}
	}
}
</style>
