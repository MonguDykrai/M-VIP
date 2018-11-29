<template>
  <ul id="selection">
    <li v-for="(item, index) in selectionList" :key="index">
      <a href="">
        <div class="top">
          <i :style="{backgroundImage: item.prop}"></i>
        </div>
        <div class="bottom">
          <span>{{ item.title }}</span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'selection',
    data: function () {
      return {
        selectionList: [
          { title: '今日推荐', prop: 'url(../../images/今日推荐.png)'},
          { title: '最后疯抢', prop: 'url(../../images/最后疯抢.png)'},
          { title: '时尚', prop: 'url(../../images/时尚.png)'},
          { title: '美妆', prop: 'url(../../images/美妆.png)'},
          { title: '母婴', prop: 'url(../../images/母婴.png)'},
          { title: '家电', prop: 'url(../../images/家电.png)'},
          { title: '家居', prop: 'url(../../images/家居.png)'},
          { title: '国际', prop: 'url(../../images/国际.png)'},
          { title: '生活', prop: 'url(../../images/生活.png)'},
        ]
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="less">
  #selection {
    width: 100%;
    /*border: 1px solid black;*/
    /* display: -webkit-flex; */
    /* Safari */
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #DBDBDB;
  }

  #selection li {
    width: 25%;
    border-right: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    height: 1.92rem;
    font-size: 16px;
  }

  #selection li:nth-child(4n) {
    border-right: 0;
  }

  #selection li a {
    width: 100%;
    height: 100%;
  }

  .top {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 50%;
  }

  .bottom {
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
    padding-top: .21333rem;
    height: 50%;
  }

  .bottom span {
    color: #585c64;
    font-size: 12px;
  }

  i {
    width: .53333rem;
    height: .53333rem;
    background-size: cover;
  }

  i:nth-child(1n) {
    background-image: url(../assets/images/今日推荐.png);
  }

  i:nth-child(2n) {
    background-image: url(../assets/images/最后疯抢.png);
  }

  i:nth-child(3n) {
    background-image: url(../assets/images/时尚.png);
  }

  i:nth-child(4n) {
    background-image: url(../assets/images/美妆.png);
  }

  i:nth-child(5n) {
    background-image: url(../assets/images/母婴.png);
  }

  i:nth-child(6n) {
    background-image: url(../assets/images/家电.png);
  }

  i:nth-child(7n) {
    background-image: url(../assets/images/家居.png);
  }

  i:nth-child(8n) {
    background-image: url(../assets/images/国际.png);
  }

  i:nth-child(9n) {
    background-image: url(../assets/images/生活.png);
  }
</style>