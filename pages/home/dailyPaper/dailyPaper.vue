<template>
	<view class="daily-paper">
		<view class="section locationa" v-for="(items, i) in arr" :key="i">
				{{arr}}
			<view class="header">
				<text class="title">{{ items.data.text }}</text>
				<text class="text-right" v-if="items.data.rightText">{{ items.data.rightText }}</text>
			</view>
			<!-- 后续封装成组件 -->
			<!-- {{items}} -->
			<view class="list hairline-border" v-for="(item, index) in items.arr"  :key="index" >
				<view class="preview">
					<image :src="item.data.content.data.cover.feed" lazy-load mode=""></image>
					<text class="duration">{{ item.data.content.data.duration | formatTime }}</text>
				</view>
				<view class="text-content flex">
					<view class="auth"><image class="avatar" :src="item.data.content.data.author.icon" mode=""></image></view>
					<view class="info">
						<view class="title">{{ item.data.content.data.title }}</view>
						<view class="tags">{{ item.data.header.description }}</view>
					</view>
				</view>
			</view>

			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleArr: [],
			locationAArr: [], //开眼精选
			arr: []
		};
	},
	created() {
		this.getData();
	},
	filters: {
		formatTime(value) {
			if (!value) return '';
			let time = (value / 60).toFixed(2);
			if (time < 10) return '0' + time;
		}
	},
	methods: {
		async getData() {
			let url = 'v5/index/tab/feed?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&first_channel=pp&last_channel=pp';
			let res = await this.$u.get(url);
			this.splitData(res);
		},

		splitData(res) {
			let titleArr = this._filter(res.itemList, 'textCard');
			let followCard = this._filter(res.itemList, 'followCard');
			let locationA = followCard.filter((item, i) => {
				return i < 5;
			});
			let todyData = followCard.slice(0,4)
			let yestaday = ollowCard.filter((item, i) => {
				return i < 5;
			});
			let locationB =this._filter(res.itemList, 'informationCard');
			// 今日开眼精选
			titleArr[0].arr = locationA;
			// titleArr[1].arr = locationB;
			this.arr = titleArr
			// console.log(this.arr,123)

			// 每日资讯精选
			// let a = this._filter(res.itemList, 'informationCard');
			// arr1[1].arr="ceshi"

			// console.log(arr1[1], 123);
			// console.log(this._filter(res.itemList,"informationCard"))

			// this.arr = arr1;
		},

		// filter
		_filter(arr, type, num) {
			return arr.filter(item => {
				return item.type === type;
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

		.title {
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
