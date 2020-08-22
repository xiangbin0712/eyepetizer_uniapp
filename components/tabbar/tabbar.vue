<template>
	<view class="tabbar">
		<view
			class="content flex"
			:class="{
				'hairline-border': borderTop
			}"
		>
			<view class="tabbar-item flex-center flex-1" @tap.stop="clickHandler(index)" v-for="(item, index) in list" :key="index">
				<view class="item midButton flex-center" v-if="item.midButton"><image :src="item.iconPath" mode=""></image></view>
				<view class="item flex-col  flex-center" v-else>
					<view class="icon"><image :src="item.iconPath" mode=""></image></view>
					<text class="text">{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageUrl: '' // 当前
		};
	},
	props: {
		// 是否隐藏原生tabbar
		hideTabBar: {
			type: Boolean,
			default: true
		},
		// 配置参数
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 是否显示顶部的横线
		borderTop: {
			type: Boolean,
			default: true
		}
	},

	created() {
		// 是否隐藏原生tabbar
		if (this.hideTabBar) uni.hideTabBar();
		let pages = getCurrentPages();
		// 页面栈中的最后一个即为项为当前页面，route属性为页面路径
		this.pageUrl = pages[pages.length - 1].route;
	},

	methods: {
		clickHandler(index) {
			// console.log(index, 12);
			this.switchTab(index);
		},

		// 切换tab
		switchTab(index) {
			// 发出事件和修改v-model绑定的值
			this.$emit('change', index);
			// 如果有配置pagePath属性，使用uni.switchTab进行跳转
			if (this.list[index].pagePath) {
				uni.switchTab({
					url: this.list[index].pagePath
				});
			} else {
				// 如果配置了papgePath属性，将不会双向绑定v-model传入的value值
				// 因为这个模式下，不再需要v-model绑定的value值了，而是通过getCurrentPages()适配
				this.$emit('input', index);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 80rpx;
	.content:after {
		border-top: 1rpx solid rgba(0, 0, 0, 0.2);
	}

	.tabbar-item {
		height: 100%;
		.midButton,
		image {
			height: 70rpx;
			width: 70rpx;
		}
		.icon image {
			height: 44rpx;
			width: 44rpx;
		}
		.text {
			font-size: 18rpx;
		}
	}
}
</style>
