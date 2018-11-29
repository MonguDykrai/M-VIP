<template>
  <div id="home" :class="['grid-container']" v-if="this.$route.path === '/'">
    <div class="row">
      <div v-if="showBanner" :class="['download-banner', 'pos-rev', 'bg-size-cover', 'h-rem-1d7333', 'wp100']">
        <span class="btn-close" @click="closeDownloadBanner">
          <i class="iconfont icon-close"></i>
        </span>
      </div>
    </div>

    <div class="row">
      <div :class="['search-wrapper', 'wp100', 'h-rem-1d111', 'bg-f9f9fa']">
        <div :class="['search-left', 'flex', 'hp100', 'w-rem-1d111', 'fl']">
          <router-link to="/register" :class="['login', 'flex', 'justify-content-center', 'align-items-center', 'wp100', 'link-color-585c64', 'fs-rem-d34667']">登录</router-link>
        </div>
        <div :class="['search-middle', 'flex', 'justify-content-center', 'align-items-center', 'hp100', 'w-rem-7d777', 'p-rem-185-0', 'fl']">
          <input type="search" placeholder="搜索品牌或商品" maxlength="20" autocomplete="off" :class="['wp100', 'hp100', 'border-color-dfe0e1', 'bg-white', 'fs-rem-d3733', 'pl-rem-d259', 'br-rem-d370']">
        </div>
        <div :class="['search-right', 'flex', 'w-rem-1d111', 'hp100', 'fr']">
          <router-link to="" @click.native="showWarningBox" :class="['classify', 'flex', 'justify-content-center', 'align-items-center', 'wp100', 'hp100']">
            <i :class="['bg-size-cover', 'w-rem-d64', 'h-rem-d64']"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="tab-bar">
        <div class="iscroll-wrapper" ref="tbIscrollWrapper" :class="['bg-f9f9fa']">
          <div class="scroller" ref="tbScroller">
            <ul ref="tbUL">
              <li v-for="(item, index) in tabList" :key="index" :class="['bg-f9f9fa']">
                <a href="javascript: void(0);" :class="['link-color-585c64', index]">{{ item }}</a>
              </li>
              <!-- <li><a href="javascript: void(0);">今日推荐</a></li>
                  <li><a href="javascript: void(0);">最后疯抢</a></li>
                  <li><a href="javascript: void(0);">时尚</a></li>
                  <li><a href="javascript: void(0);">美妆</a></li>
                  <li><a href="javascript: void(0);">母婴</a></li>
                  <li><a href="javascript: void(0);">家电</a></li>
                  <li><a href="javascript: void(0);">家居</a></li>
                  <li><a href="javascript: void(0);">国际</a></li>
                  <li><a href="javascript: void(0);">生活</a></li> -->
            </ul>
          </div>

          <div :class="['more', 'bg-f9f9fa']" ref="tbMore">
            <i class="icon-arrow-down"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="brand-ad">
        <img src="../assets/images/Home/img-brand-ad.jpg" alt="">
      </div>
    </div>

    <Selection />

    <Recommend />

  </div>
</template>

<script>
  import IScroll from 'iscroll'
  import Selection from './Selection.vue'
  import Recommend from './Recommend.vue'

  export default {
    name: 'home',
    components: {
      Selection,
      Recommend
    },
    data: function () {
      return {
        showBanner: true,
        ulTotalLength: 0,
        tabList: ['今日推荐', '最后疯抢', '时尚', '美妆', '母婴', '家电', '家居', '国际', '生活'],
      }
    },
    created: function () {

    },
    mounted: function () {
      this.initIScroll()
    },
    updated: function () {
      this.initIScroll()
    },
    methods: {
      initIScroll: function () {
        let { ulTotalLength } = this
        const { tbIscrollWrapper, tbScroller, tbUL, tbMore } = this.$refs
        const lis = Array.from(tbUL.children)

        lis.forEach(function (val) {
          const valMarginLeft = Number(window.getComputedStyle(val).marginLeft.slice(0, -2))
          const valMarginRight = Number(window.getComputedStyle(val).marginRight.slice(0, -2))
          const valWidth = Number(window.getComputedStyle(val).width.slice(0, -2))
          // console.log(valMarginLeft, valMarginRight, valWidth)
          const width = valMarginLeft + valMarginRight + valWidth
          ulTotalLength += width
        })

        const moreWidth = Number(window.getComputedStyle(tbMore).width.slice(0, -2))
        ulTotalLength = ulTotalLength + moreWidth
        tbScroller.style.width = `${ulTotalLength}px`

        const myIScroll = new IScroll(tbIscrollWrapper, { scrollX: true, scrollY: false, mouseWheel: true });
      },
      closeDownloadBanner: function () {
        console.log(this)
        console.log(this.$refs)
        this.showBanner = false
      },

      showWarningBox: function () {
        alert(1)
      }
    }
  }
</script>

<style scoped lang="less">
  /* iScroll 需要 */
  /* body {
    overflow: hidden;
  } */

  /* iScroll 需要 见笔记 issue 11201528 */
  /* html {
    touch-action: none;
  } */

  .download-banner {
    background-image: url(../assets/images/Home/05fc1148.download-banner.png);

    .btn-close {
      position: absolute;
      top: 0;
      left: 0;
      width: .64rem;
      height: .64rem;

      .icon-close {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 700;
        color: #F2B1D5;
        font-size: .52rem;
      }
    }

  }

  /* search-wrapper */
  .search-wrapper {
    /* border-bottom: 1px solid #CCC; */

    .search-left {

      .login {}
    }

    .search-middle {

      input {}
    }

    .search-right {

      .classify {

        i {
          background-image: url(../assets/images/Home/classify.png);
        }
      }
    }
  }

  .tab-bar {
    position: relative;
    width: 100%;
    height: .90667rem;

    .iscroll-wrapper {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      overflow: hidden;

      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        position: absolute;
        top: 0;
        right: 0;
        width: 1.0667rem;
        height: 100%;

        >.icon-arrow-down {
          font-size: .48rem;
        }
      }

      .scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        /* width: 1000px; */
        height: 100%;
        /* background-color: #f0f; */
        transform: translateZ(0);
        user-select: none;
        text-size-adjust: none;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          /* width: 100%; */
          height: 100%;
          text-align: center;

          li {
            display: flex;
            float: left;
            justify-content: center;
            align-items: center;
            /* width: 1.24074rem; */
            margin: 0 .26666rem;
            height: 100%;
            /* border-right: 1px solid #ccc; */
            background-color: #fafafa;
            font-size: .34667rem;
          }
        }

      }
    }
  }

  .brand-ad {
    width: 100%;

    img {
      width: 100%;
    }
  }
</style>