<template>
  <div class="main">
    <div class="font30">请选择产品类型</div>
    <div class="prolist">
      <div class="list" v-for="(item,index) in proList" :key="index" @click="jump()">
        <div class="left">
          <img class="imgBox" :src="item.imgUrl" alt="">
        </div>
        <div class="right">{{item.name}}</div>
      </div>
    </div>
    <div class="sub">角膜塑形镜、减离焦镜片等其他产品的售后服务，请咨询购买渠道。</div>
  </div>
</template>

<script>
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
    mounted() {},
    methods: {
      jump() {
        this.$router.push('./orderlist')
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