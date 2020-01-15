<template>
	<transition name="fade">
		<div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
			<transition name="slide-right">
				<div class="content">
					<div class="content-page-wrapper" v-if="bookAvailable">
						<div class="content-page">
							<component :is="currentTab === 1 ? contents : bookmark"/>
						</div>
						<div class="content-page-tab">
							<div class="content-page-tab-item" :class="{'selected': currentTab === 1}" @click="selectTab(1)">{{$t('book.navigation')}}</div>
							<div class="content-page-tab-item" :class="{'selected': currentTab === 2}" @click="selectTab(2)">{{$t('book.bookmark')}}</div>
						</div>
					</div>
					<div class="content-empty" v-else>
						<ebook-loading />
					</div>
				</div>
			</transition>
			<div class="content-bg" @click="hideTitleAndMenu"></div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import ebookMixin from '../../mixins/ebookMixin.js';
	import EbookSlideContents from "./EbookSlideContents";
	import EbookSlideBookmark from "./EbookSlideBookmark";
	import EbookLoading from "./EbookLoading";
	export default {
		name: "EbookSlide",
		components: {EbookLoading},
		mixins: [ebookMixin],
		data() {
			return {
				currentTab: 1,
				contents: EbookSlideContents,
				bookmark: EbookSlideBookmark
			}
		},
		methods: {
			selectTab(index) {
				this.currentTab = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global.scss";
	.slide-content-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		z-index: 300;
		.content {
			flex: 0 0 85%;
			width: 85%;
			height: 100%;
			.content-page-wrapper {
				height: 100%;
				width: 100%;
				display: flex;
				flex-direction: column;
				.content-page {
					flex: 1;
					width: 100%;
					overflow: hidden;
				}
				.content-page-tab {
					display: flex;
					flex: 0 0 px2rem(48);
					width: 100%;
					height: px2rem(48);
					.content-page-tab-item {
						flex: 1;
						font-size: px2rem(12);
						@include center();
						&.selected {

						}
					}
				}
			}
			.content-empty {
				width: 100%;
				height: 100%;
				@include center();
			}
		}
		.content-bg {
			flex: 0 0 15%;
			width: 15%;
			height: 100%;
		}
	}
</style>
