<template>
  <div class="main">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="mgt24" >
          <van-button round block icon="plus" type="info">新建工单</van-button>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderList">
        <div class="list" v-for="(item,index) in orderList" :key="index" @click="orderDetail()">
          <div class="left">
            <div class="name">{{item.name}}</div>
            <div class="sub">{{item.sub}}</div>
            <div class="number">{{item.number}}</div>
          </div>
          <div class="right">{{item.status}}</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  // import { apiOrderList} from "@/api/home"
  export default {
    name: 'HomeView',
    components: {},
    props: {},
    data() {
      return {
        orderList: [{
          name: '梦戴维智慧润眼台灯',
          sub: '客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595',
          number: 'P2302000001',
          status: '等待客服联络'
        }, {
          name: '梦戴维智慧润眼台灯',
          sub: '客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595',
          number: 'P2302000001',
          status: '结束'
        },{
          name: '梦戴维智慧润眼台灯',
          sub: '客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595',
          number: 'P2302000001',
          status: '等待客服联络'
        }, {
          name: '梦戴维智慧润眼台灯',
          sub: '客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595',
          number: 'P2302000001',
          status: '结束'
        }],
        params: {
          name: "nihao",
          id: '111'
        },
        loading: false,
        finished: false,
        refreshing: false,
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async getOrderList() {
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
      onRefresh() {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.getOrderList();
      },
      // addOrder() {
      //   this.$router.push('./prolist')
      // },

      // 跳转
      jump(url) {
        this.$router.push(url)
      },
      orderDetail() {
        this.$router.push('./detail')

      }
    }
  }
</script>
<style scoped lang="scss">
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

  .right {
    width: 15%;
    margin-left: 16px;
    color: #1989fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
</style>