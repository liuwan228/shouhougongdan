<template>
  <div class="home">
    <div @click="jump()">新建工单</div>
    <div class="aaa"  @click="detail()">工单列表</div>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      jump() {
        this.$router.push('./prolist')
      },
      detail(){
        this.$router.push('./detail')

      }
    }
  }
</script>
<style scoped lang="scss">
  .aaa {
    margin-top: 75px;
  }
</style>