<template>
  <div id="home" v-if="this.$route.path === '/'">
    <div class="download-banner" v-if="showBanner">
      <span class="btn-close" @click="closeDownloadBanner">
        <i class="iconfont icon-close"></i>
      </span>
    </div>

    <div class="search-wrapper">
      <div class="left">
        <router-link to="/register" class="login">登录</router-link>
      </div>
      <div class="middle">
        <input type="search" placeholder="搜索品牌或商品" maxlength="20" autocomplete="off">
      </div>
      <div class="right">
        <router-link to="" class="classify">
          <i></i>
        </router-link>
      </div>
    </div>

    <div class="tab-bar">
      <div class="iscroll-wrapper" ref="tbIscrollWrapper">
        <div class="scroller" ref="tbScroller">
          <ul ref="tbUL">
            <li v-for="(item, index) in tabList" :key="index" style="background: #fff !important;">
              <a href="javascript: void(0);" :class="['link-color-585c64', 'link-activated', index]">{{ item }}</a>
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

        <div class="more" ref="tbMore">↓</div>
      </div>
    </div>


    <div class="brand-ad">
      <img src="../assets/images/Home/img-brand-ad.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll'


  export default {
    name: 'home',
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
    position: relative;
    background-image: url(../assets/images/Home/05fc1148.download-banner.png);
    background-size: cover;
    height: 1.7333rem;
    width: 100%;

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
    width: 100%;
    height: 1.111rem;
    box-sizing: border-box;
    /* border-bottom: 1px solid #CCC; */

    .left {
      float: left;
      display: flex;
      width: 1.111rem;
      /* background-color: red; */
      height: 100%;
      box-sizing: border-box;

      .login {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .34667rem;
        width: 100%;
        color: rgb(88, 92, 100);
      }
    }

    .middle {
      padding: .185rem 0;
      float: left;
      width: 7.777rem;
      height: 100%;
      /* background-color: green; */
      box-sizing: border-box;

      input {
        padding-left: .259rem;
        display: block;
        width: 100%;
        height: 100%;
        font-size: .3733rem;
        box-sizing: border-box;
        border-radius: .370rem;
        background-color: #fff;
        border: 1px solid #DFE0E1;
      }
    }

    .right {
      float: right;
      display: flex;
      width: 1.111rem;
      /* background-color: blue; */
      height: 100%;
      box-sizing: border-box;

      .classify {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        i {
          background-image: url(../assets/images/Home/classify.png);
          background-size: cover;
          width: .64rem;
          height: .64rem;
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
        background-color: transparent;
        border: 1px solid #ccc;
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