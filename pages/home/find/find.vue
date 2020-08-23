<template>
	<view>
		<view class="swiper"><u-swiper :height="410" :list="banner" :effect3d="true"></u-swiper></view>
		<!-- 热门分类 -->
		<view class="section hot-category">
			<view class="header container">
				<view class="title">热门分类</view>
				<view class="more" @click="goCategoriesAll">查看全部分类</view>
			</view>
			<view class="content container">
				<scroll-view class="scroll-view container" scroll-x="true">
					<view class="scroll-view-item" v-for="(items, i) in newCategoryList" :key="items.id">
						<view class="block flex-center" v-for="(item, index) in items" :key="item.data.id">
							<image :src="item.data.icon" mode=""></image>
							<text class="font-30">{{ item.data.title }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题策划 -->
		<view class="section campaign">
			<view class="header container">
				<view class="title">专题策划</view>
				<view class="more" @click="goMore(campaign)">查看全部分类</view>
			</view>
			<view class="content container">
				<view class="campaign-item" v-if="i < 4" v-for="(item, i) in campaign.itemList" :key="i"><image :src="item.data.image" mode=""></image></view>
			</view>
		</view>

		<!-- 本周榜单 -->
		<view class="section week-rank">
			<view class="header container">
				<view class="title">本周榜单</view>
				<view class="more" @click="goMore('rank')">查看全部</view>
			</view>
			<view class="content container">
				<view class="list flex" v-for="(item, i) in weekRankList" :key="i">
					<view class="preview"><image lazy-load :src="item.data.cover.feed" mode=""></image></view>
					<view class="text-content">
						<view class="title">{{ item.data.title }}</view>
						<view class="tag">{{ item.data.category }}/{{ item.data.author.name }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 推荐主题 -->
		<view class="section recommend-theme">
			<view class="header container">
				<view class="title">推荐主题</view>
				<view class="more" @click="goMore(campaign)">查看全部</view>
			</view>
			<view class="content container">
				<view class="list flex" v-for="(item, i) in tagBriefCard" :key="i">
					<view class="left flex">
						<image lazy-load :src="item.data.icon" mode=""></image>
						<view class="text-content flex-col">
							<text class="title">{{ item.data.title }}</text>
							<text class="description">{{ item.data.description }}</text>
						</view>
					</view>

					<view class="focus-btn hairline-border">+关注</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryList: [], //热门分类
			banner: [],
			campaign: [], //专题策划
			tagBriefCard: [], //推荐主题
			weekRankList: [], // 本周榜单
			marginLeft: 20,
			scrollLeft: null,
			marginRight: 0
		};
	},
	created() {
		this.getCategoryList(); // 热门分类
		this.getData();
	},
	computed: {
		newCategoryList() {
			let arr = [];
			this.categoryList.forEach((item, i) => {
				let inx = Math.floor(i / 6);
				if (!arr[inx]) arr[inx] = [];
				arr[inx].push(item);
			});
			return arr;
		}
	},

	methods: {
		async getCategoryList() {
			let ret = await this.$u.post('v5/category/list');
			this.categoryList = ret.itemList;
		},
		async getData() {
			let v7 = 'v7/index/tab/discovery?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp&last_channel=pp';
			let dataV4 = await this.$u.get('v4/rankList/videos?strategy=weekly');
			let dataV5 = await this.$u.get('v5/index/tab/discovery');
			let dataV7 = await this.$u.get(v7);
			// console.log(dataV5,1)

			// banner
			let bannerArr = dataV7.itemList[0].data.itemList;
			bannerArr.forEach(item => {
				this.banner.push({
					image: item.data.image
				});
			});

			// 专栏策划
			this.campaign = dataV5.itemList[11].data;

			//推荐主题
			this.getTagBriefCard(dataV7);

			// 本周排行
			this.getWeekRankList(dataV4);
		},
		//推荐主题
		getTagBriefCard(obj) {
			this.tagBriefCard = obj.itemList.filter(item => {
				return item.data && item.data.dataType === 'TagBriefCard';
			});
		},

		// 本周排行
		getWeekRankList(obj) {
			this.weekRankList = obj.itemList.filter(item => {
				return item.data && item.data.dataType === 'VideoBeanForClient';
			});
		},

		// 热门分类 全部分类
		goCategoriesAll(){
			uni.navigateTo({
				url:"../categories-all/categories-all"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.swiper {
	height: 410rpx;
	margin: 20rpx 0;
}

//热门分类
.section {
	border-top: 1rpx solid #eeeeee;
	border-bottom: 1rpx solid #eeeeee;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}
	& .title {
		font-size: 40rpx;
		font-weight: bold;
		color: #000000;
	}
	& .more {
		color: #4b85f2;
		font-weight: bold;
	}

	.content {
		margin: 20rpx 0;
	}
}
.hot-category {
	.scroll-view {
		transition: all 0.3s;
		overflow: hidden;
		white-space: nowrap;
	}
	.scroll-view-item {
		display: inline-flex;
		flex-wrap: wrap;
		width: 690rpx;
	}

	.block {
		border-radius: 4rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		height: 220rpx;
		width: 220rpx;
		background-color: rgba(0, 0, 0, 0.1);
		position: relative;
		image {
			position: absolute;
			height: 220rpx;
			width: 220rpx;
		}
		text {
			color: #ffffff;
			position: absolute;
		}
	}
}

//专题策划
.campaign {
	.content {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.campaign-item {
		height: 200rpx;
		width: 340rpx;
		image {
			height: 200rpx;
			width: 340rpx;
			border-radius: 4rpx;
		}
		&:nth-child(odd) {
			margin-right: 10rpx;
		}
		&:nth-child(1),
		&:nth-child(1) {
			margin-bottom: 10rpx;
		}
	}
}

// 本周榜单
.week-rank {
	.content {
		margin: 0 30rpx;
	}
	.list {
		padding: 10rpx 0;
	}
	.preview,
	image {
		height: 150rpx;
		width: 300rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.text-content {
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.title {
			font-size: 30rpx;
			line-height: 1;
			font-weight: bold;
		}
		.tag {
			font-size: 24rpx;
			color: #888888;
		}
	}
}

// 推荐主题
.recommend-theme {
	.content {
		margin: 0 30rpx;
	}
	.list {
		justify-content: space-between;
		// margin: 20rpx 0;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eeeeee;
		image {
			border-radius: 4rpx;
			height: 100rpx;
			width: 100rpx;
			margin-right: 30rpx;
		}
		.text-content .title {
			font-size: 30rpx;
			font-weight: bold;
		}
		.text-content .description {
			font-size: 24rpx;
			color: #888888;
		}

		.focus-btn {
			font-size: 24rpx;
			padding: 4rpx 10rpx;
			border-radius: 6rpx;

			&:after {
				border: 1px solid #888888;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
