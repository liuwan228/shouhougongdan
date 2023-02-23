<template>
  <div class="main">
    <div class="title mgt24">请输入 梦戴维智慧润眼台灯 的产品购买信息</div>
    <van-form @submit="onSubmit">
      <div class="mgt24">
        <van-field v-model="value" colon border label="产品序列号" placeholder="请输入产品序列号" />
      </div>
      <div class="proImg mgt24">
        <van-field name="uploader" colon label="文件上传">
          <template #input>
            <van-uploader :after-read="afterRead" preview-size="100px" v-model="fileList" upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="tips">
        <van-checkbox v-model="checked" shape="square" icon-size="14px">找不到购买凭证，同意按出厂日期计算保修期</van-checkbox>
      </div>
      <div class="mgt24">
        <van-button round block icon="plus" @click="onSubmit" type="info">登记</van-button>
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
        this.$router.push('./orderlist')
      },
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }


  ::v-deep .van-cell {
    padding: 0;
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