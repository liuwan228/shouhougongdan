<template>
  <div class="main">
    <div class="title">请输入 梦戴维智慧润眼台灯 的产品购买信息</div>
    <van-cell-group>
      <van-field v-model="value" label="" placeholder="请输入产品序列号" />
    </van-cell-group>
    <div class="proImg">
      <van-uploader :after-read="afterRead" v-model="fileList" preview-size="180px" upload-text="点击上传或拍摄产品铭牌">

      </van-uploader>
    </div>
    <div class="buyimg">
      <van-uploader :after-read="afterRead"> </van-uploader>
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

      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
    }
  }
</script>

<style scoped lang="scss">
  .proImg {
    width: 100%;
    height: 350px;
    border-radius: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    overflow: hidden;

    ::v-deep .van-uploader__upload {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>