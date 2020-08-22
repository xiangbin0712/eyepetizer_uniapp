<!-- 专题 -->
<template>
	<view class="campaign"><view class="box">{{list.itemList}}</view></view>
</template>

<script>
export default {
	data() {
		return {
			list: null
		};
	},

	onLoad(options) {
		if (options.data) {
			// this.list = JSON.parse(options.data.itemList);
			this.list = options.data
		}
	}
};
</script>

<style lang="scss" scoped></style>
