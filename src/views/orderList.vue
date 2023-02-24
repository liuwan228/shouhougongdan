<template>
  <div class="main">
    <div class="font28">请选择已经登记的产品或登记新产品</div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderProList">
      <div class="list" v-for="(item,index) in orderProList" :key="index" @click="orderQues()">
        <div class="left">
          <div class="name">{{item.name}}</div>
          <div class="sub">{{item.orderTime}}</div>
          <div class="number">序列号：{{item.number}}</div>
        </div>
      </div>
    </van-list>
    <div class="mgt24" @click="orderNewPro()">
      <van-button round block icon="plus" type="info">登记新购买的产品</van-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        orderProList: [{
          name: '梦戴维智慧润眼台灯',
          orderTime: '登记时间：2023-1-12',
          number: 'P2302000001',
        }, {
          name: '梦戴维智慧润眼台灯',
          orderTime: '登记时间：2023-1-12',
          number: 'P2302000001',
        }],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async getOrderProList() {
        if (this.refreshing) {
          this.orderList = [];
          this.refreshing = false;
        }
        // const res = await apiOrderList(this.params)
        // console.log(res,"res")
        // let orderList = res.LIST || []
        this.loading = false;
        // for (let i = 0; i < orderList.length; i++) {
        //   let item = orderList[i]
        //   this.orderList.push(item)
        // }
        // this.finished = this.orderList.length >= res.TOTAL_NUM
      },
      orderQues() {
        this.$router.push('./subques')
      },
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
      font-size: 28px;
      color: #0F0F0F;
      font-weight: 700;
    }

    .sub {
      font-size: 12px;
      color: #666;
      margin: 8px 0;
    }

    .number {
      font-size: 12px;
      color: #666;
    }
  }
</style>