<template>
	<view class="icon-botton flex-center" hover-class="bg-hover" @click="$emit('click')">
		<text class="iconfont font-40 font-b">{{dealIcon}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			icon: String,
		},
		computed: {
			dealIcon() {
				let str = this.icon
				return eval("'" + str + "'") 
			}
		},
	}
</script>



<style scoped>
	.icon-botton {
		height: 90rpx;
		width: 90rpx;
	}

	.bg-hover {
		background-color: rgba(0, 0, 0, .2);
	}
</style>
