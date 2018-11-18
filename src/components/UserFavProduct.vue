<template>
  <div>
    <ul>
      <li><a href="javascript: void(0);" data-item="product">商品</a></li>
      <li><a href="javascript: void(0);" data-item="brand">品牌</a></li>
      <li><a href="javascript: void(0);" data-item="shop">店铺</a></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'UserFavProduct',
    beforeRouteEnter: function (to, from, next) {
      const status = localStorage.getItem('status')
      if (status) {
        next()

        return
      }
      next('/')
    },
    data: function () {
      return {
        selectedItem: 'product'
      }
    },
    created: function () {
      axios.get('http://localhost:9090/get-fav-product', {
        headers: {
          'authorization': localStorage.getItem('jwt')
        }
      })
      .then(data => {
        console.log(data)
      })
    }
  }
</script>

<style scoped lang="less">
  ul {
    list-style: none;

    li {
      float: left;
      margin-right: 5px;
    }
  }
</style>