<script>
import systemMixin from '@/mypUI/myp-mixin/systemMixin.js';
export default {
	globalData: {
		currentTab: 0
	},
	mixins: [systemMixin],
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS || H5
		this.mypInitSystemInfo();
		// #endif
		// #ifndef APP-PLUS || H5
		setTimeout(() => {
			this.mypInitSystemInfo();
		}, 0);
		// #endif
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
		// #endif

		this.init();
		this.getSysInfo();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		init() {
			//app启动时打开启动广告页
			var w = plus.webview.open('hybrid/html/advertise/advertise.html', '本地地址', { top: 0, bottom: 0, zindex: 999 }, 'fade-in', 500);
			//设置定时器，4s后关闭启动广告页
			setTimeout(function() {
				plus.webview.close(w);
			}, 4000);
		},

		getSysInfo() {
			uni.getSystemInfo({
				success: e => {
					let factor = 750 / e.windowWidth;
					let _navigationBarHeight = 0;
					e.platform == 'android' ? (_navigationBarHeight = e.statusBarHeight + 50) : (_navigationBarHeight = e.statusBarHeight + 45);
					this.$u.vuex('navigationBarHeight', _navigationBarHeight * factor);
				}
			});
		}
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
/* #ifdef APP-NVUE */
@import '@/mypUI/base.scss';
// /* #endif */

/* #ifdef APP-PLUS */
@import 'uview-ui/index.scss';
@import 'uview-ui/theme.scss';
@import './static/css/base.scss';
/* #endif */
</style>
