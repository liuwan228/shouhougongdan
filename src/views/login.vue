<template>
  <div class="main">
    <div class="logo"><img src="~@/assets/img/login_page.png" alt=""></div>
    <div class="title">欧普康视<br />售后工单系统</div>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="param.tel" label="手机号" :rules="userFormRules.tel" placeholder="请输入手机号" type="number"
          maxlength="11" />
        <van-field v-model="param.yzm" center clearable label="验证码" :rules="userFormRules.yzm" type="number"
          maxlength="6" placeholder="请输入验证码">
          <template #button>
            <van-button native-type="button" size="small" type="info">发送验证码</van-button>
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
  // import { loginBtn } from "@/api/user";
  export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
      return {
        param: {
          tel: '',
          yzm: ''
        },
        userFormRules: {
          tel: [{
            required: true,
            message: '手机号不能为空'
          }, {
            pattern: /^1[3,4,5,6,7,8][0-9]{9}$/,
            message: '手机号格式错误'
          }],
          yzm: [{
            required: true,
            message: '验证码不能为空'
          }, {
            pattern: /^d{6}$/,
            message: '验证码格式错误'
          }]
        },
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {

      // 请求短信验证码接口

      // 登录
      async onSubmit(values) {
        console.log('submit', values)
        // 1. 获取表单数据
        // const user = this.user

        // // TODO: 2. 表单验证

        // // 3. 提交表单请求登录
        // this.$toast.loading({
        //   message: '登录中...',
        //   forbidClick: true, // 禁用背景点击
        //   duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
        // })
        // try {
        //   const res = await loginBtn(user)
        //   console.log('登录成功', res)
        //   this.$toast.success('登录成功')
        // } catch (err) {
        //   if (err.response.status === 400) {
        //     this.$toast.fail('手机号或验证码错误')
        //   } else {
        //     this.$toast.fail('登录失败，请稍后重试')
        //   }
        // }

        // 4. 根据请求响应结果处理后续操作

      },
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