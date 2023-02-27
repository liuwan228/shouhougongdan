<template>
  <div class="main">
    <div class="font30">请输入 <span class="name">梦戴维智慧润眼台灯</span> 的产品问题</div>
    <div>
      <van-form @submit="onSubmit">
        <div class="mgt24 text">
          <van-field v-model="value" rows="5" border autosize label="" type="textarea" placeholder="请输入您遇到的产品问题" />
        </div>
        <div class="font30 mgt24">请上传或拍摄有助于理解问题的照片</div>
        <div class="mgt24 uploadImg">
          <van-field name="uploader" label="">
            <template #input>
              <van-uploader :after-read="afterRead" :before-delete="beforeDelete" :before-read="beforeRead"
                preview-size="80px" v-model="fileList" upload-text="点击上传">
              </van-uploader>
            </template>
          </van-field>
        </div>
        <div class="mgt48">
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
        value: '',
        fileList: [],
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

      beforeRead(file) {
        if (file.type !== 'image/jpeg' || file.type !== 'image/jpg' || file.type !== 'image/png') {
          this.$toast('请上传图片格式');
          return false;
        }
        return true;
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        //创建FormData对象。上传图片需要转换二进制，这里要用到FormData
        console.log(file, "上传后file");
        var formdata = new FormData();
        //"file"表示给后台传的属性名字 
        formdata.append('file', file.file);
        //向后台发送相应请求
      },
      //图片删除前回调，删除时将公共变量forms中的文件信息一并删除
      beforeDelete(file) {
        console.log(file, "删除file");

      },

    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .text {
    ::v-deep .van-cell {
      border-radius: 12px;
    }
  }

  .name {
    color: #1989fa;
  }

  .uploadImg {
    ::v-deep .van-cell {
      height: 350px;
      border-radius: 12px;
    }
  }
</style>