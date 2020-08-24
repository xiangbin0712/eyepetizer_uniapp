<template>
	<view class="daily-paper">
		<view class="section" v-for="(items, i) in arr" :key="i">
			<section-header v-if="items.type === 'textCard'" :leftText="items.data.text" :rightText="items.data.rightText"></section-header>
			<list-item
				v-if="items.type === 'followCard'"
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
	data() {
		return {
			arr: [],
			nextPageUrl: '',
			status: 'loading '
		};
	},

	mounted() {
		this.getData();
	},

	methods: {
		async getData() {
			// let url = 'v5/index/tab/feed?udid=2bc07e33a6d845e28af9e2f21a51f17e77e49885&vc=6030071&vn=6.3.7&size=1080X2029&deviceModel=MI%208&first_channel=pp';
			let url =
				'v5/index/tab/feed?udid=f4007ffeb2e60ff2&vc=6030012&vn=6.3.01&size=1080X2029&deviceModel=MI%208&first_channel=xiaomi&last_channel=xiaomi&system_version_code=29';
			let res = await this.$u.get(url);
			if (res && res.itemList) {
				this.arr = res.itemList;
				this.nextPageUrl = res.nextPageUrl;
			}
		},
		async upData() {
			let res = await this.$u.get(this.nextPageUrl);
			if (res && res.itemList) {
				this.nextPageUrl = res.nextPageUrl;
				let arr = this.arr.concat(res.itemList);
				this.arr = arr;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin: 0 30rpx;
}
</style>
