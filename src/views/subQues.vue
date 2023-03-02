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
              <van-uploader :after-read="afterRead" max-count="4" multiple @delete="deleteImg"  :before-read="beforeRead"
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
import axios from 'axios';
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
         if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
          this.$toast("请上传正确格式的图片");
          return false;
        }
        return true;
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        //创建FormData对象。上传图片需要转换二进制，这里要用到FormData
        console.log(file, "上传后file");
        const formdata = new FormData();
        //"file"表示给后台传的属性名字 
        formdata.append('file', file.file);
        if(file instanceof Array && file.length){
          file.forEach(item=>{
            item.status = 'uploading';
            item.message = '上传中...';
            formdata.append("file",item.file)
          })
        }else{
          file.status = 'uploading';
          file.message = '上传中...';
          formdata.append("file",file.file)
        }
        //向后台发送相应请求
        axios.post('https://img2.orthok.cn/api/service/index', formdata, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          const data = res.data
          if (data.status == 0) {
            this.markPhoto = data.filename
            file.status = 'done';
            file.message = '成功';
          } else {
            this.$toast('上传失败')
          }
        })
      },
      //删除方法
      deleteImg(file) {
        for (let i = 0, len = this.uploadImage.length; i < len; i++) {
          if (file.file.name === this.uploadImage[i].name && file.file.size === this.uploadImage[i].size) {
            this.uploadImage.splice(i, 1)
            break
          }
        }
        console.log(this.uploadImage, "删除后的")
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