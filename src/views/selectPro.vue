<template>
  <div class="main">
    <div class="font30">请选择产品类型</div>
    <div class="prolist">
      <div class="list" v-for="(item,index) in proList" :key="index" @click="jump(item)">
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
  import {
    apiProList
  } from '@/api/home';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        proList: [],
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
      jump(item) {
        this.$store.commit('setProductInfo', item)
        this.$router.push('./orderlist')
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    width: 100%;
    height: 220px;
  }

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
     overflow: hidden;

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