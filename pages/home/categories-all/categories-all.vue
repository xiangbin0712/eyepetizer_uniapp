<!-- 全部分类 -->
<template>
	<view class="categories-all">
		<!-- <u-lazy-load class="card" :class="item.type" v-for="(item, index) in obj.itemList" :key="index" height="370" :image="item.data.image"></u-lazy-load> -->
		<view class="card" @click="onClick(item.data.actionUrl)" :class="item.type" v-for="(item, index) in categoriesList" :key="index">
			<u-lazy-load :height="370" :image="item.data.image" :index="index"></u-lazy-load>
			<text class="text">{{ item.data.title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoriesList: null,
			loadingImg: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg',
			errorImg: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg'
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			const url =
				'v4/categories/all?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp&last_channel=pp&system_version_code=29';
			let res = await this.$u.get(url);
			this.categoriesList = res.itemList;
		},

		onClick(actionUrl) {
			uni.navigateTo({
				url:"../rank-list/rank-list"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.categories-all {
	display: flex;
	flex-wrap: wrap;
	width: 750rpx;
	justify-content: space-between;
	.card {
		height: 374rpx;
		position: relative;
		margin-bottom: 4rpx;
		&.squareCard {
			width: 375rpx;
		}

		&.rectangleCard {
			width: 750rpx;
		}
		.text {
			position: absolute;
			color: #ffffff;
			// z-index: 1;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-weight: bold;
			font-size: 36rpx;
		}
	}
}
</style>
