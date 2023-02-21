<template>
  <div>
    <div class="">已登记产品列表</div>
    <div class="" @click="jump()">登记新产品</div>
  </div>

</template>

<script>
  export default {
    name: '',
    mixins: [],
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
        this.$router.push('./ordernewpro')
      }
    }
  }
</script>

<style scoped lang="scss"></style>