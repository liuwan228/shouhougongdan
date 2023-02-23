<template>
  <div class="main">
    <div class="title mgt24">请输入 梦戴维智慧润眼台灯 的产品问题</div>
    <div>
      <van-form @submit="onSubmit">
        <div class="mgt24 text">
          <van-field v-model="value" rows="5" border autosize label="" type="textarea" placeholder="请输入您遇到的产品问题" />
        </div>
        <div class="title mgt24">请上传或拍摄有助于理解问题的照片</div>
        <div class="mgt24">
          <van-field name="uploader" label="">
            <template #input>
              <van-uploader :after-read="afterRead" preview-size="100px" v-model="fileList" upload-text="点击上传">
              </van-uploader>
            </template>
          </van-field>
        </div>
        <div>
          <van-button round block type="info" to="/home" native-type="submit">提交</van-button>
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
        fileList:[],
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
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
    }
  }
</script>

<style scoped lang="scss">
  .text {
    ::v-deep .van-cell {
      border: 1px solid #666;
    }
  }
</style>