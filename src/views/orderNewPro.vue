<template>
  <div class="main">
    <div class="font30">请输入 <span class="name">{{productInfo.proName}}</span> 的产品购买信息</div>
    <van-form validate-first ref="form">
      <div class="mgt24">
        <van-field v-model="value" colon border label="" placeholder="请输入产品序列号" />
      </div>
      <div class="tips mgt24">上传或拍摄产品铭牌 <span class="font18">（通常贴在产品底部）</span> </div>
      <div class="proImg mgt24">
        <van-field :rules="[{ required: true, message: '请上传产品铭牌' }]" name="uploader" colon label="">
          <template #input>
            <van-uploader :after-read="afterReadMark" :before-read="beforeRead" max-count="1" preview-size="100px"
              v-model="markPhotoList" upload-text="点击上传">
            </van-uploader>
          </template>
        </van-field>
      </div>
      <div class="tips mgt24">上传或拍摄购买凭证<span class="font18">（画面完整并有购买日期,包括发票、盖章收据、电商订单截图等）</span></div>
      <div class="proImg mgt24">
        <van-field name="uploader" colon label="">
          <template #input>
            <van-uploader :after-read="afterRead" :before-read="beforeRead" max-count="1" preview-size="100px"
              v-model="billList" upload-text="点击上传">
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
  import {
    mapState
  } from 'vuex'
  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        value: '',
        checked: false,
        markPhoto: '', //铭片地址
        billPhoto: '',
        markPhotoList: [], //铭牌
        billList: [], //发票
        productObj: {}, //产品信息
         isUpload: false, //是否上传图片
        isUploadDone: false, //是否上传结束
      }
    },
    computed: {
      ...mapState(['productInfo'])
    },
    watch: {

    },
    created() {
      // this.productObj = this.$route.query.item
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
        this.isUpload = true
        this.isUploadDone = false
        this.uploadImg(file).then((res) => {
          const data = res.data
          if (data.status == 0) {
            this.markPhoto = data.filename
            file.status = 'done';
            file.message = '成功';
            this.isUploadDone = true
          } else {
             this.isUploadDone = false
            this.$toast('上传失败')
          }
        })
      },
      //上传购买凭证
      afterRead(file) {
         this.isUpload = true
        this.isUploadDone = false
        this.uploadImg(file).then((res) => {
          const data = res.data
          if (data.status == 0) {
            this.billPhoto = data.filename
            file.status = 'done';
            file.message = '成功';
             this.isUploadDone = true
          } else {
            this.$toast('上传失败')
             this.isUploadDone = false
          }
        })
      },
      //上传图片接口
      uploadImg(file) {
        let formData = new FormData();
        formData.append("file", file.file);
        file.status = 'uploading';
        file.message = '上传中...';
        return axios.post('https://img2.orthok.cn/api/service/index', formData, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
      },
      onSubmit() {
        this.$refs.form.validate().then(() => {
          // 验证通过
          if (!this.checked) {
            this.$toast('请上传购买凭证')
            return
          }
          if (this.isUpload && !this.isUploadDone) {
            this.$toast('请等待图片上传完成后提交')
            return
          }
          let params = {
            userId: window.localStorage.getItem("userId"),
            token: window.localStorage.getItem('token'),
            // token:'0086F7AEE3CE6A3395481A84F7D61172',
            produitId: this.productInfo.produitId,
            SN: this.value,
            markPhoto: this.markPhoto,
            billPhoto: this.billPhoto,
            isByManufacture: this.checked ? '1' : '0'
          }
          apiOrderPro(params).then((res) => {
            if (res.status == 0) {
              this.sellId = res.sellId
              this.$router.push({
                path: './subques',
                query: {
                  id: this.sellId
                }
              })
            } else {
              this.$toast(res.errMsg);
            }
          })

        }).catch(() => {
          //验证失败
          // this.$toast('校验失败')

        })


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
      font-size: 24px;
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