<template>
  <div class="main">
    <div class="title mt24">请输入 梦戴维智慧润眼台灯 的产品问题</div>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="value" label="" placeholder="请输入您遇到的产品问题" />
        <van-field name="uploader" label="">
          <template #input>
            <van-uploader v-model="uploader">
              <van-button icon="plus"  plain type="info">上传文件</van-button>
            </van-uploader>
          </template>
        </van-field>
        <div>
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        value: '23241553677',
        uploader: [{
          url: 'https://img01.yzcdn.cn/vant/leaf.jpg'
        }],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
    }
  }
</script>

<style scoped lang="scss">

</style>