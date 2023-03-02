<template>
  <div class="main">
    <div class="font30">请选择产品类型</div>
    <div class="prolist">
      <div class="list" v-for="(item,index) in proList" :key="index" @click="jump(item.produitId)">
        <div class="left">
          <img class="imgBox" :src="item.photo" alt="">
        </div>
        <div class="right">{{item.proName}}</div>
      </div>
    </div>
    <div class="sub">角膜塑形镜、减离焦镜片等其他产品的售后服务，请咨询购买渠道。</div>
  </div>
</template>

<script>
  import { apiProList } from '@/api/home';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        proList: [{
          imgUrl: require('@/assets/img/pro1.jpg'),
          name: '镜特舒超声波清洗仪I'
        }, {
          imgUrl: require('@/assets/img/pro2.jpg'),
          name: '镜特舒超声波清洗仪I'
        }],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.getProductType()
    },
    methods: {
      async getProductType() {
        const res = await apiProList()
        if (res.status == 0) {
          this.proList = res.list || []
        }
      },
      jump(id) {
        this.$router.push({path:'./orderlist',query:{id:id}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .sub {
    font-size: 20px;
    margin-top: 12px;
    color: #666;
  }

  .left {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 24px;

    .imgBox {
      width: 100%;
    }
  }

  .right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #0F0F0F;
    font-weight: 700;
  }
</style>