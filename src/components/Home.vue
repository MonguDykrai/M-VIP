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

    <div id="iscroll-wrapper">
      <div id="scroller">
        <ul>
          <li>Cell 1</li>
          <li>Cell 2</li>
          <li>Cell 3</li>
          <li>Cell 4</li>
          <li>Cell 5</li>
          <li>Cell 6</li>
          <li>Cell 7</li>
          <li>Cell 8</li>
          <li>Cell 9</li>
          <li>Cell 10</li>
          <li>Cell 11</li>
          <li>Cell 12</li>
          <li>Cell 13</li>
          <li>Cell 14</li>
          <li>Cell 15</li>
          <li>Cell 16</li>
          <li>Cell 17</li>
          <li>Cell 18</li>
          <li>Cell 19</li>
          <li>Cell 20</li>
          <li>Cell 21</li>
          <li>Cell 22</li>
          <li>Cell 23</li>
          <li>Cell 24</li>
          <li>Cell 25</li>
          <li>Cell 26</li>
          <li>Cell 27</li>
          <li>Cell 28</li>
          <li>Cell 29</li>
          <li>Cell 30</li>
          <li>Cell 31</li>
          <li>Cell 32</li>
          <li>Cell 33</li>
          <li>Cell 34</li>
          <li>Cell 35</li>
          <li>Cell 36</li>
          <li>Cell 37</li>
          <li>Cell 38</li>
          <li>Cell 39</li>
          <li>Cell 40</li>
          <li>Cell 41</li>
          <li>Cell 42</li>
          <li>Cell 43</li>
          <li>Cell 44</li>
          <li>Cell 45</li>
          <li>Cell 46</li>
          <li>Cell 47</li>
          <li>Cell 48</li>
          <li>Cell 49</li>
          <li>Cell 50</li>
        </ul>
      </div>

      <div id="more"></div>
    </div>

    <div class="brand-ad">
      <img src="../assets/images/Home/img-brand-ad.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll'
  console.log(IScroll)

  export default {
    name: 'home',
    data: function () {
      return {
        showBanner: true
      }
    },
    created: function () {
    },
    methods: {
      closeDownloadBanner: function () {
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

  #iscroll-wrapper {}

  .brand-ad {
    width: 100%;

    img {
      width: 100%;
    }
  }
</style>