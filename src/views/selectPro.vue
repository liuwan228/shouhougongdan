<template>
  <div class="">
    <div @click="jump()">选择产品类型</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
     jump(){
        this.$router.push('./orderlist')
      }
  }
}
</script>

<style scoped lang="scss"></style>
