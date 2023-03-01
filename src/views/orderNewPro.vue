<template>
  <div class="main">
    <div class="font30">请输入 <span class="name">梦戴维智慧润眼台灯</span> 的产品购买信息</div>
    <van-form @submit="onSubmit">
      <div class="mgt24">
        <van-field v-model="value" colon border label="" placeholder="请输入产品序列号" />
      </div>
      <div class="tips mgt24">上传或拍摄产品铭牌</div>
      <div class="proImg mgt24">
        <van-field name="uploader" colon label="">
          <template #input>
            <van-uploader :after-read="afterRead" preview-size="100px" v-model="fileList" upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="tips mgt24">上传或拍摄购买凭证<span class="font18">（画面完整并有购买日期,包括发票、盖章收据、电商订单截图等）</span></div>
      <div class="proImg mgt24">
        <van-field name="uploader" colon label="">
          <template #input>
            <van-uploader :after-read="afterRead" preview-size="100px" v-model="fileList" upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="mgt24">
        <van-checkbox v-model="checked" shape="square" icon-size="14px">找不到购买凭证，同意按出厂日期计算保修期</van-checkbox>
      </div>
      <div class="mgt24">
        <van-button round block @click="onSubmit()" type="info">登记</van-button>
      </div>
    </van-form>

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
        value: '',
        checked: true,
        fileList: [],
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
      onSubmit(values) {
        console.log('submit', values);
        this.$router.push('./subques')
      },
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }

  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .name {
    color: #1989fa;
  }

  .tips {
    font-size: 26px;

    .font18 {
      font-size: 18px;
      color: #666;
    }
  }

  .proImg {
    width: 100%;
    box-sizing: border-box;



    // ::v-deep .van-uploader {
    //   width: 100%;
    //   height: 100%;

    //   .van-uploader__wrapper {
    //     width: 100%;
    //     height: 100%;

    //     .van-uploader__upload {
    //       width: 100%;
    //       height: 100%;
    //       box-sizing: border-box;
    //       margin: 0;
    //     }
    //   }

    // }


  }
</style>