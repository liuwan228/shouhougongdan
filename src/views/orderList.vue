<template>
  <div class="main">
    <div class="font30">请选择已经登记的产品或登记新产品</div>
    <van-list @load="getOrderProList">
      <div class="list" v-for="(item,index) in orderProList" :key="index" @click="orderQues()">
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
    apiOrderList
  } from '@/api/home';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        typeId: '',
        orderProList: [],
      }
    },
    computed: {},
    watch: {},
    created() {
      this.typeId = this.$route.query.id
      console.log(this.typeId, "typeId")
    },
    mounted() {
      // this.getOrderProList()
    },
    methods: {
      async getOrderProList() {
        let params = {
          userId: window.localStorage.getItem("userid"),
          token: window.localStorage.getItem('token')
        }
        console.log(params, "params")
        const res = await apiOrderList(params)
        if (res.status == 0) {
          this.orderProList = res.list || []
        }
      },

      // 提交问题
      orderQues() {
        this.$router.push('./subques')
      },

      // 新登记产品
      orderNewPro() {
        this.$router.push({path:'./ordernewpro',query:{id:this.typeId}})
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