<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    components: {},
    created() {
      // 在页面加载时读取localStorage
      if (window.localStorage.getItem('proinfo')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(window.localStorage.getItem('proinfo'))))
      }
      // 在页面刷新时将store保存到localStorage里
      window.addEventListener('beforeunload', () => {
        window.localStorage.setItem('proinfo', JSON.stringify(this.$store.state))
      })
    },
    mounted() {},
    methods: {},
  }
</script>
<style lang="scss">

</style>