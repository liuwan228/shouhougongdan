<template>
  <div class="main">
    <div class="title mgt24">请输入 梦戴维智慧润眼台灯 的产品购买信息</div>
    <div class="mt24">
      <van-cell-group>
        <van-field v-model="value" label="" placeholder="请输入产品序列号" />
      </van-cell-group>
    </div>
    <div class="proImg mgt24">
      <van-uploader :after-read="afterRead" v-model="fileList" upload-text="点击上传或拍摄产品铭牌">

      </van-uploader>
    </div>
    <div class="buyimg mgt24">
      <van-uploader :after-read="afterRead"> </van-uploader>
    </div>
    <div class="tips">
      <van-checkbox v-model="checked">找不到购买凭证，同意按出厂日期计算保修期</van-checkbox>
    </div>
    <van-button type="primary" block to="/home">登记</van-button>
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
        value:'',
        checked: true,
        fileList: [{
          url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
        }, ],
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
  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }

  .van-cell-group {
    border: 1px solid #ebedf0;
  }

  .proImg {
    width: 100%;
    height: 3.5rem;
    border-radius: .16rem;
    box-sizing: border-box;
    border: .01rem solid #ccc;
    overflow: hidden;

    ::v-deep .van-uploader {
      width: 100%;
      height: 100%;

      .van-uploader__wrapper {
        width: 100%;
        height: 100%;

        .van-uploader__upload {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          margin: 0;
        }
      }

    }


  }
</style>