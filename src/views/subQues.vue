<template>
  <div class="main">
    <div class="font30">请输入 <span class="name">{{productInfo.proName}}</span> 的产品问题</div>
    <div>
      <van-form ref="form">
        <div class="mgt24 text">
          <van-field v-model="question" :rules="[{ required: true,}]" rows="7" border autosize label="" type="textarea"
            placeholder="请输入您遇到的产品问题" />
        </div>
        <div class="font30 mgt24">请上传或拍摄有助于理解问题的照片</div>
        <div class="mgt24 uploadImg">
          <van-field name="uploader" label="">
            <template #input>
              <van-uploader :before-read="beforeRead" :after-read="afterRead" :max-count="6" @delete="deleteImg"
                preview-size="80px" v-model="fileList" upload-text="点击上传"> </van-uploader>
            </template>
          </van-field>
        </div>
        <div class="mgt48">
          <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    mapState
  } from 'vuex'
  import {
    apiOrderQues
  } from '@/api/home';
  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        question: '',
        fileList: [],
        sellId: '', //记录id
        uploadImage: [], //上传文件列表
        photoList: [], //返回后文件列表
        orderId: '', //问题id
        isUpload: false, //是否上传图片
        isUploadDone: false, //是否上传结束
      }
    },
    computed: {
      ...mapState(['productInfo'])
    },
    watch: {},
    created() {
      this.sellId = this.$route.query.id
    },
    mounted() {},
    methods: {
      onSubmit() {
        this.$refs.form.validate().then(() => {
          // 验证通过
          if (this.isUpload && !this.isUploadDone) {
            this.$toast('请等待图片上传完成后提交')
            return
          }
          let params = {
            userId: window.localStorage.getItem("userId"),
            token: window.localStorage.getItem('token'),
            // userId: '7',
            // token: 'CEF5832E38898C62715A8EDCF06AA2A6',
            produitId: this.productInfo.produitId,
            sellId: this.sellId,
            question: this.question,
            photo: this.photoList,
          };
          apiOrderQues(params).then((res) => {
            if (res.status == 0) {
              this.orderId = res.orderId;
              this.$router.replace({path:'./home'})
            } else {
              this.$toast(res.errMsg);
            }
          })

        }).catch(() => {
          //验证失败
        })


      },

      beforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
          this.$toast.fail('请选择正确图片格式上传')
          return false
        }
        return file
      },
      afterRead(file,detail) {
        let index =detail.index
        // 此时可以自行将文件上传至服务器
        //创建FormData对象。上传图片需要转换二进制，这里要用到FormData
        const formdata = new FormData();
        //"file"表示给后台传的属性名字 
        formdata.append('file', file.file);
        file.status = 'uploading';
        file.message = '上传中...';
        // this.uploadImage.push(file.file)
        this.isUpload = true
        this.isUploadDone = false
        //向后台发送相应请求
        axios.post('https://img2.orthok.cn/api/service/index', formdata, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          const data = res.data
          if (data.status == 0) {
            this.photoList[index]=data.filename
            file.status = 'done';
            file.message = '上传成功';
            this.isUploadDone = true
            console.log(this.photoList,"this.photoList")
          } else {
            this.isUploadDone = false
            this.$toast('上传失败')
          }
        })
      },
      //删除方法
      deleteImg(file,detail) {
        for (let i = 0, len = this.photoList.length; i < len; i++) {
          if (detail.index === i) {
            this.photoList.splice(i, 1)
            break
          }
        }
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