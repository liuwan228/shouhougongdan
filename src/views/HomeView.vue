<template>
  <div class="main">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="list">
          <div class="left">
            <div class="name" @click="addOrder()">+新建工单</div>
          </div>
        </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="(item,index) in orderList" :key="index">
          <div class="left">
            <div class="name">{{item.name}}</div>
            <div class="sub">{{item.sub}}</div>
            <div class="number">{{item.number}}</div>
          </div>
          <div class="right">{{item.status}}</div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- <div @click="jump()">新建工单qq</div> -->
    <!-- <div class="aaa" @click="detail()">工单列表</div> -->
  </div>
</template>

<script>
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
          status: '等待客服联络'
        }],
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
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.orderList = [];
            this.refreshing = false;
          }

          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      addOrder() {
        this.$router.push('./prolist')
      },
      detail() {
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
    width: 20%;
    margin-left: 8px;
  }
</style>