<template>
	<div class="ebook-footer">
		<!-- <span class="ebook-footer-text">{{this.paginate}}</span> -->
		<span class="ebook-footer-text">{{this.progress + '%'}}</span>
	</div>
</template>

<script type="text/javascript">
	import ebookMixin from '../../mixins/ebookMixin';
	export default {
		name: 'ebook-footer',
		mixins: [ebookMixin]
	}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
	@import "../../assets/styles/global";

  .ebook-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    @include right;
    .ebook-footer-text {
      font-size: px2rem(12);
      color: #6d7178;
    }
  }
</style>