<template>
	<view class="img-box">
		<block class="u-img"><u-image  border-radius="10" loading-icon="" :mode="imgMode" width="100%" :height="height" :src="src"></u-image></block>
		<text class="tag">tag</text>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		src: String,
		height: {
			type: [Number, String],
			default: 350
		},
		imgMode: {
			type: String,
			default: 'heightFix'
		},
		tagPosition: {
			type: String,
			default: 'center'
		}
	}
};
</script>

<style lang="scss" scoped>
.img-box {
	position: relative;
	border: 3rpx solid;
}

.u-img {
	position: absolute;
}
.tag {
	position: absolute;
	left: 50%;
	top: 50%;
	color: #ffffff;
	border: 1px solid #ffffff;
	padding: 4rpx;
	transform: translate(-50%, -50%);
}
</style>
