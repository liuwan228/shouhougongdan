<template>
  <div class="main">
    <div class="logo"><img src="~@/assets/img/login_page.png" alt=""></div>
    <div class="title">欧普康视<br />售后工单系统</div>
    <div>
      <van-form @submit="onSubmit" ref='form'>
        <van-field v-model="tel" label="手机号" :rules="userTel" name="tel" placeholder="请输入手机号" type="tel"
          maxlength="11" />
        <van-field v-model="yzm" center clearable :rules="[{ required: true, message: '请填写验证码' }]" label="验证码"
          type="digit" placeholder="请输入验证码">
          <template #button>
            <van-button native-type="button" size="small" type="info" @click="sendCode()" :disabled="disabled ">
              {{codeMsg}}
            </van-button>
          </template>
        </van-field>
        <div class="mgt48">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="sub">
      <p>热线电话：400-630-0595</p>
      <p>服务时间：周一到周五 8:30-17:30</p>
    </div>
  </div>
</template>

<script>
  import {
    loginBtn,
    apiGetCode
  } from "@/api/login";
  // import { setLocal } from '@/utils/mylocal'

  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        disabled: false,
        codeMsg: '获取验证码',
        codeNum: 30,
        tel: '', //手机号
        yzm: '', //输入验证码
        code: '',
        userTel: [{
          required: true,
          message: '手机号不能为空'
        }, {
          validator: value => {
            return /^1[23456789]\d{9}$/.test(value);
          },
          message: "请输入正确格式的手机号"
        }],
      }
    },
    computed: {},
    watch: {},
    
    created() {},
    mounted() {},
    methods: {
      // 点击获取验证码
      sendCode() {
        //验证手机号格式是否正确
        if (!this.userTel[1].validator(this.tel)) return
        // 请求短信验证码接口
        apiGetCode({
          mobile: this.tel
        }).then((res) => {
          if (res.status == 0) {
            this.$toast('验证码已发送')
          }
          console.log("验证码", res)
        })
        this.disabled = true;
        //倒计时
        let timer = setInterval(() => {
          --this.codeNum;
          this.codeMsg = `${this.codeNum}秒重新发送`;
        }, 1000)
        //定时器
        setTimeout(() => {
          clearInterval(timer)
          this.codeNum = 30;
          this.disabled = false;
          this.codeMsg = "获取验证码"
        }, 30000)
      },
      // 登录
      onSubmit() {
        // 提交表单请求登录
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true, // 禁用背景点击
          duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
        })
        loginBtn({ mobile: this.tel, yzm: this.yzm, openid: this.$store.state.openid }).then((res) => {
          if (res.status == 0) {
            console.log('登录成功', res)
            this.$toast('登录成功')
            window.localStorage.setItem("token", res.token) // 保存token到本地
            window.localStorage.setItem("userId", res.userId) // 保存userId到本地
            this.$store.commit('setUserId', res.userId)
            // setLocal('userInfo', res.data.data)
            // 3.0登录成功跳转到首页
            this.$router.push('./home')
          } else {
            this.$toast(res.errMsg);
            return false;
          }
        })
      },
      // 验证信息
      validate(key) {
        let bool = true;
        if (!this.userTel[key].validator.test(this[key])) {
          //提示信息
          bool = false;
          return false;
        }
        return bool;
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .logo {
    width: 100%;
    height: 100px;
    text-align: left;
    padding-top: 20px;
  }

  .logo img {
    height: 100%;
  }

  .title {
    font-size: 64px;
    color: #000;
    text-align: center;
    margin: 50px 0;
    letter-spacing: 6px;
  }

  .mgt48 {
    margin: 48px 0;
  }

  .sub {
    p {
      color: #666;
    }
  }
</style>