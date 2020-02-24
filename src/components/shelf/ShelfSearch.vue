<template>
  <div class="shelf-search-wrapper">
    <div class="shelf-search">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon" />
        </div>
        <div class="search-input-wrapper">
          <label>
            <input :placeholder="$t('shelf.search')" class="search-input" type="text"/>
          </label>
        </div>
        <div class="icon-clear-wrapper">
          <span class="icon-close-circle-fill icon" />
        </div>
      </div>
      <div class="icon-locale-wrapper">
        <span class="icon-cn icon" />
        <span class="icon-en icon" />
      </div>
      <div class="cancel-btn-wrapper">
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShelfSearch"
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: #ffffff;
    .shelf-search {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(52);
      .search-wrapper {
        flex: 1;
        display: flex;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right();
          .icon-search {
            font-size: px2rem(12);
          }
        }
        .search-input-wrapper {
          flex: 1;
          @include center();
          padding: 0 px2rem(10);
          box-sizing: border-box;
          .search-input {
            width: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left();
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper {
        flex: 0 0 px2rem(55);
        @include center();
        .icon-cn,.icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center();
        .cancel-text {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
  }
</style>
