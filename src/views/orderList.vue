<template>
  <div class="main">
    <div class="font30">请选择已经登记的产品或登记新产品</div>
    <van-list @load="getOrderProList">
      <div class="list" v-for="(item,index) in orderProList" :key="index" @click="orderQues(item.sellId)">
        <div class="left">
          <div class="name">{{item.proName}}</div>
          <div class="sub">{{item.addtime}}</div>
          <div class="sub">序列号：{{item.SN}}</div>
        </div>
      </div>
    </van-list>
    <div class="mgt48">
      <van-button round block icon="plus" type="info" @click="orderNewPro()">登记新购买的产品</van-button>
    </div>
  </div>

</template>

<script>
  import {
    apiSellList
  } from '@/api/home';
  import { mapState } from 'vuex'
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        orderProList: [],
      }
    },
    computed: {...mapState(['productInfo'])},
    watch: {},
    created() { },
    mounted() {
      // this.getOrderProList()
    },
    methods: {
      async getOrderProList() {
        let params = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          // userId: '7',
          // token: 'CEF5832E38898C62715A8EDCF06AA2A6',
          produitId:this.productInfo.produitId,
        }
        const res = await apiSellList(params)
        if (res.status == 0) {
          this.orderProList = res.list || []
        }
      },

      // 提交问题
      orderQues(id) {
        this.$router.push({path:'./subques',query:{id:id}})
      },
      // 新登记产品
      orderNewPro() {
        this.$router.push('./ordernewpro')
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .left {
    flex: 1;

    .name {
      font-size: 30px;
      color: #0F0F0F;
      font-weight: 700;
    }

    .sub {
      font-size: 20px;
      margin-top: 12px;
      color: #666;
    }
  }
</style>