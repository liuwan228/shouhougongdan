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
            <van-uploader :after-read="afterReadMark" :before-read="beforeRead" @delete="deleteImg" max-count="1" preview-size="100px"
              v-model="markPhotoList" upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="tips mgt24">上传或拍摄购买凭证<span class="font18">（画面完整并有购买日期,包括发票、盖章收据、电商订单截图等）</span></div>
      <div class="proImg mgt24">
        <van-field name="uploader" colon label="">
          <template #input>
            <van-uploader :after-read="afterRead" :before-read="beforeRead" max-count="1" preview-size="100px" v-model="billList"
              upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="mgt24">
        <van-checkbox v-model="checked" shape="square" icon-size="14px">找不到购买凭证，同意按出厂日期计算保修期</van-checkbox>
      </div>
      <div class="mgt24">
        <van-button round block @click="onSubmit" type="info">登记</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
  import axios from "axios"
  import {
    apiOrderPro
  } from '@/api/home';
  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        value: '',
        checked: true,
        markPhoto: '', //铭片地址
        billPhoto: '',
        markPhotoList: [], //铭牌
        billList: [], //发票
        produitId:'',//产品id
      }
    },
    computed: {},
    watch: {

    },
    created() {
      this.produitId = this.$route.query.id
      console.log(this.produitId, "produitId")
    },
    mounted() {},
    methods: {
      //校验图片的格式
      beforeRead(file) {
        if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
          this.$toast("请上传正确格式的图片");
          return false;
        }
        return true;
      },
      afterReadMark(file) {
        let formData = new FormData();
        formData.append("file", file.file);
        file.status = 'uploading';
        file.message = '上传中...';
        // 此时可以自行将文件上传至服务器
        axios.post('https://img2.orthok.cn/api/service/index', formData, {
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
        console.log(this.markPhoto, "this.markPhoto")
      },
      //上传购买凭证
      afterRead(file) {
        let formData = new FormData();
        formData.append("file", file.file);
         file.status = 'uploading';
        file.message = '上传中...';
        axios.post('https://img2.orthok.cn/api/service/index', formData, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          const data = res.data
          if (data.status == 0) {
            this.billPhoto = data.filename
             file.status = 'done';
            file.message = '成功';
          } else {
            this.$toast('上传失败')
          }
        })
        console.log(this.billPhoto, "this.billPhoto")

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

      async onSubmit() {
        let params = {
          userId: this.$store.state.userId,
          token: window.localStorage.getItem('token'),
          // token:'0086F7AEE3CE6A3395481A84F7D61172',
          produitId: this.produitId,
          SN: this.value,
          markPhoto: this.markPhoto,
          billPhoto: this.billPhoto,
          isByManufacture: this.checked?'1':'0'
        };
        const res = await apiOrderPro(params)
        if(res.status==0){
          this.sellId=res.sellId
          this.$router.push('./subques')
        }else{
          this.$toast(res.errMsg);
        }
        
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