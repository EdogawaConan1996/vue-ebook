<template>
	<div class="flap-card-wrapper" v-show="flapCardVisible">
		<div class="flap-card-bg">
			<div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
				<div class="flap-card-circle">
					<div class="flap-card-semi-circle">
						<div class="flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
						<div class="flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="close-btn-wrapper" @click="close">
			<span class="icon-close"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import storeHomeMixin from '../../mixins/storeHomeMixin';
	import flapCardList from '../../utils/store';
	export default {
		name: 'flap-card',
		mixins: [storeHomeMixin],
		data() {
			return {
				flapCardList,
				front: 0,
				back: 1
			}
		},
		methods: {
			close() {
				this.setFlapCardVisible(false)
			},
			semiCircleStyle(item, dir) {
				return {
					backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
					backgroundSize: item.backgroundSize,
					backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
				}
			},
			rotate(index, type) {
				const item = this.flapCardList[index]
				let dom;
				if (type === 'front') {
					// eslint-disable-next-line no-console
					console.log(111111111)
					dom = this.$refs.right[index]
				} else {
					dom = this.$refs.left[index]
				}
				dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
				dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`;
			},
			startFlapCardAnimation() {
				setInterval(() => {
					const frontFlapCard = this.flapCardList[this.front]
					const backFlapCard = this.flapCardList[this.back]
					frontFlapCard.rotateDegree += 10
					frontFlapCard._g -= 5
					backFlapCard.rotateDegree -= 10
					backFlapCard._g += 5
					this.rotate(0,'front')
					this.rotate(1,'back')
				}, 500)
			}
		},
		mounted() {
			this.startFlapCardAnimation()
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import "../../assets/styles/global.scss";
	.flap-card-wrapper {
		@include absCenter();
		z-index: 1000;
		background: rgba(0,0,0,.6);
		@include center();
		.flap-card-bg {
			position: relative;
			width: px2rem(64);
			height: px2rem(64);
			border-radius: px2rem(5);
			background-color: #ffffff;
			.flap-card {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1500;
				margin: auto;
				width: px2rem(48);
				height: px2rem(48);
				.flap-card-circle {
					width: 100%;
					height: 100%;
					.flap-card-semi-circle {
						width: 100%;
						height: 100%;
						display: flex;
						.flap-card-semi-circle-left {
							flex: 0 0 50%;
							width: 50%;
							height: 100%;
							background-color: #ffc666;
							background-repeat: no-repeat;
							background-position: center right;
							border-radius: px2rem(24) 0 0 px2rem(24);
							transform-origin: right;
							backface-visibility: hidden;
						}
						.flap-card-semi-circle-right {
							flex: 0 0 50%;
							width: 50%;
							height: 100%;
							background-repeat: no-repeat;
							background-position: center left;
							border-radius: 0 px2rem(24) px2rem(24) 0;
							transform-origin: left;
							backface-visibility: hidden;
						}
					}
				}
			}
		}
		.close-btn-wrapper {
			position: absolute;
			left: 0;
			bottom: px2rem(30);
			z-index: 1100;
			width: 100%;
			@include center();
			.icon-close {
				width: px2rem(45);
				height: px2rem(45);
				border-radius: 50%;
				background: #333333;
				font-size: px2rem(25);
				color: #ffffff;
				@include center();
			}
		}
	}
</style>