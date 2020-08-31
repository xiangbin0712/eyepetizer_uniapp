<template>
	<view class="daily-paper">
		<view class="section" v-for="(items, i) in obj.itemList" :key="i">
			<section-header v-if="items.type === 'textCard'" :leftText="items.data.text" :rightText="items.data.subTitle"></section-header>
			<list-item
				v-if="items.type === 'followCard'"
				:type="items.type"
				:title="items.data.header.title"
				:avatar="items.data.header.icon"
				:bg="items.data.content.data.cover.homepage"
				:duration="items.data.content.data.duration"
				:description="items.data.header.description"
			></list-item>
		</view>
		<!-- <u-loadmore :status="status" /> -->
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
	props: {
		obj: {}
	},
	data() {
		return {};
	},

	mounted() {},

	methods: {}
};
</script>

<style lang="scss" scoped>
.section {
	margin: 0 30rpx;
}
</style>
