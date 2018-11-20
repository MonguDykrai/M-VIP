<template>
  <transition>
    <div id="favorite">
      <ul>
        <li><a href="javascript: void(0);" data-item-name="product" @click="switchItem">商品</a></li>
        <li><a href="javascript: void(0);" data-item-name="brand" @click="switchItem">品牌</a></li>
        <li><a href="javascript: void(0);" data-item-name="store" @click="switchItem">店铺</a></li>
      </ul>

      <img :src="list[0].imgUrl" style="width: 100%;" alt="">
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import tools from '../assets/js/tools.js'
  const ip = tools.getIp()
  // console.log(ip)

  export default {
    name: 'UserFav',
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
        selectedItem: 'product',
        list: [{ imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542611601314&di=98c82cf117a4c5c5bf60c141a2320f3c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F6a600c338744ebf8ce2a3c21d3f9d72a6059a751.jpg' }]
      }
    },
    created: function () {
      this.getItem()
    },
    methods: {
      switchItem: function (e) {
        const { itemName } = e.target.dataset
        console.log(itemName)
        this.selectedItem = itemName

        this.getItem()
      },
      getItem: function () {
        const { selectedItem } = this

        axios.get(`http://${ip}/get-fav-${selectedItem}`, {
          headers: {
            'authorization': localStorage.getItem('jwt')
          }
        })
          .then(data => {
            console.log(data)
            this.list = data.data.datas
          })
      }
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

  /* https://cn.vuejs.org/v2/guide/transitions.html#ad */
  .v-enter-active,
  .v-leave-active {
    transition: opacity .5s;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
</style>