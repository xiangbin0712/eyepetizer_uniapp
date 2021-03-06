<template>
	<view :class="['myp-cp', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<view class="myp-cp-right" :style="{width: (evenWidth/2)+'px', height: evenWidth+'px'}">
			<view ref="myp-right" class="myp-cp-right-rotate" :style="mrRightStyle+noWeexRightAni"></view>
		</view>
		<view class="myp-cp-left" :style="{width: (evenWidth/2)+'px', height: evenWidth+'px'}">
			<view ref="myp-left" class="myp-cp-left-rotate" :style="mrLeftStyle+noWeexLeftAni"></view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	import weexMixin from './weexMixin.js'
	// #endif
	// #ifndef APP-NVUE
	import noWeexMixin from './noWeexMixin.js'
	// #endif
	import pxMixin from '@/mypUI/myp-mixin/pxMixin.js'
	
	export default {
		// #ifdef APP-NVUE
		mixins: [pxMixin, weexMixin],
		// #endif
		// #ifndef APP-NVUE
		mixins: [pxMixin, noWeexMixin],
		// #endif
		props: {
			progress: {
				type: Number,
				default: 0
			},
			width: {
				type: String,
				default: '100px'
			},
			borderWidth: {
				type: String,
				default: '6px'
			},
			borderColor: {
				type: String,
				default: '#FF0000'
			},
			bgType: {
				type: String,
				default: 'inverse'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			fromZero: {
				type: Boolean,
				default: false
			},
			aniToZero: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 2000
			},
			timingFunction: {
				type: String,
				default: 'ease-out'
			},
			// 仅仅只是app-nvue
			twoWay: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				evenWidth: 0,
				lastPr: 0,
				noWeexLeftAni: '',
				noWeexRightAni: ''
			}
		},
		computed: {
			mrBoxStyle() {
				const style = `width:${this.evenWidth}px;height:${this.evenWidth}px;padding-top:${this.borderWidth};padding-right:${this.borderWidth};padding-bottom:${this.borderWidth};padding-left:${this.borderWidth};border-radius:${this.evenWidth}px;`
				return style + this.boxStyle
			},
			mrRightStyle() {
				return `width:${this.evenWidth}px;height:${this.evenWidth}px;border-radius:${this.evenWidth}px;border-width:${this.borderWidth};border-left-color:${this.borderColor};border-bottom-color:${this.borderColor};`
			},
			mrLeftStyle() {
				return `width:${this.evenWidth}px;height:${this.evenWidth}px;border-radius:${this.evenWidth}px;border-width:${this.borderWidth};border-left-color:${this.borderColor};border-bottom-color:${this.borderColor};`
			}
		},
		methods: {
			toProgress(pr, duration) {
				const lastPr = this.lastPr
				this.lastPr = pr
				if (this.twoWay) {
					if (this.fromZero) {
						this.twoWayZeroProgress(pr, lastPr, duration)
					} else {
						this.twoWayProgress(pr, lastPr, duration)
					}
				} else {
					if (this.fromZero) {
						this.oneWayZeroProgress(pr, lastPr, duration)
					} else {
						this.oneWayProgress(pr, lastPr, duration)
					}
				}
			},
			getDeg(pr) {
				let rightDeg = 45
				let leftDeg = 225
				if (pr > 0.5) {
					rightDeg = 225
					leftDeg += (pr - 0.5) * 360
				} else {
					rightDeg += pr * 360
				}
				return {
					right: rightDeg,
					left: leftDeg
				}
			},
			// forward duration
			getDuration(pr, duration) {
				let right = 0
				let left = 0
				if (this.twoWay) {
					if (duration) {
						return {
							left: duration,
							right: duration
						}
					}
					if (pr >= 0.5) {
						return {
							left: this.duration * (pr - 0.5),
							right: this.duration * 0.5
						}
					}
					return {
						left: 0,
						right: this.duration * pr
					}
				} else {
					if (duration) {
						if (pr > 0.5) {
							return {
								left: parseInt(duration * (pr - 0.5) / pr),
								right: parseInt(duration * 0.5 / pr)
							}
						}
						return {
							left: 0,
							right: duration
						}
					}
					if (pr > 0.5) {
						return {
							left: this.duration * (pr - 0.5),
							right: this.duration * 0.5
						}
					} else {
						return {
							left: 0,
							right: this.duration * pr
						}
					}
				}
			},
			// back to zero duration. the duration is this.duration
			getBackDuration(pr, duration) {
				if (pr > 0.5) {
					return {
						left: duration * (pr - 0.5),
						right: duration * 0.5
					}
				} else {
					return {
						left: 0,
						right: duration * pr
					}
				}
			}
		},
		created() {
			const w = this.mypToPx(this.width)
			this.evenWidth = parseInt(w/2)*2
			setTimeout(()=>{
				this.toProgress(this.progress)
			}, 0)
		},
		watch: {
			progress(newV, oldV) {
				if (this.fromZero) {
					this.toProgress(newV)
				} else {
					if (newV !== oldV) {
						this.toProgress(newV)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-cp {
		position: relative;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		
		&-in {
			position: absolute;
			justify-content: center;
			align-items: center;
		}
		&-right {
			position: absolute;
			overflow: hidden;
			top: 0;
			right: 0;
			
			&-rotate {
				position: absolute;
				top: 0;
				right: 0;
				border-top-color: transparent;
				border-right-color: transparent;
				transition-property: transform;
				transform-origin: center;
				transform: rotate(45deg);
			}
		}
		&-left {
			position: absolute;
			overflow: hidden;
			top: 0;
			left: 0;
			
			&-rotate {
				position: absolute;
				top: 0;
				left: 0;
				border-top-color: transparent;
				border-right-color: transparent;
				transition-property: transform;
				transform-origin: center;
				transform: rotate(225deg);
			}
		}
	}
</style>
