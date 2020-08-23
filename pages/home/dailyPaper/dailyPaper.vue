<template>
	<view class="daily-paper">
		<view class="section" v-for="(items, i) in arr" :key="i">
			<view class="header">
				<text class="left-text">{{ items.data.text }}</text>
			</view>
			<view class="content"><list-item type="2" :arr="items.arr"></list-item></view>
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
			titleArr: [],
			locationAArr: [], //开眼精选
			arr: [],
			demo: []
		};
	},
	created() {
		this.getData();
	},

	methods: {
		async getData() {
			let url = 'v5/index/tab/feed?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp';
			let res = await this.$u.get(url);
			this.splitData(res);
		},

		splitData(res) {
			// let textCard = this._filter(res.itemList, 'TextCard'); //title
			// let followCard = this._filter(res.itemList, 'FollowCard'); // item
			let title = [];
			let items = [];
			res.itemList.forEach((item, i) => {
				if (item.type === 'textCard') {
					if (title.length) {
						title[title.length - 1].arr = items;
						items = [];
					}
					title.push(item);
				} else if (item.type === 'followCard') {
					items.push(item);
				}

				if (items.length) {
					title[title.length - 1].arr = items;
				}
			});
			this.arr = title;

			// this.demo = this._groupArray(followCard, 5);

			// let locationA = followCard.filter((item, i) => {
			// 	return i < 5;
			// });
			// let todyData = followCard.slice(0,4)
			// let yestaday = ollowCard.filter((item, i) => {
			// 	return i < 5;
			// });
			// 今日开眼精选
			// this.arr = textCard;

			// 每日资讯精选
			// let informationCard = this._filter(res.itemList, 'informationCard');
		},

		_groupArray(data, cols) {
			const list = [];
			let current = [];
			data.forEach(item => {
				current.push(item);
				if (current.length === cols) {
					list.push(current);
					current = [];
				}
			});

			// if(current.length){
			// 	list.push(current)
			// }
			return list;
		},

		// filter
		_filter(arr, type, num) {
			return arr.filter(item => {
				// return item.type === type;
				return item.data && item.data.dataType === type;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin: 0 30rpx;
	.header {
		padding-top: 20rpx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		.left-text {
			font-weight: bold;
			font-size: 44rpx;
		}
		.text-right {
			color: #4b85f2;
			font-weight: bold;
		}
	}
	.list {
		padding: 20rpx 0;
		&:after {
			border-bottom: 1rpx solid #ededed;
		}
	}

	.preview {
		position: relative;
		height: 380rpx;
		margin-bottom: 20rpx;
		width: 100%;
		image {
			position: absolute;
			height: 100%;
			width: 100%;
			border-radius: 10rpx;
		}
		.duration {
			position: absolute;
			color: #ffffff;
			font-weight: bold;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 4rpx;
			font-size: 24rpx;
			padding: 2rpx 4rpx;
			bottom: 10rpx;
			right: 20rpx;
		}
	}
	.text-content {
		// padding: 20rpx 0;
		.avatar {
			height: 80rpx;
			width: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.info {
			.title {
				font-weight: bold;
				font-size: 28rpx;
			}
			.tags {
				font-size: 24rpx;
				color: #888888;
			}
		}
	}
}
</style>
