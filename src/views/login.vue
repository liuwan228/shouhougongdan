<template>
  <div class="main">
    <div class="logo"><img src="../assets/img/login_page.png" alt=""></div>
    <div class="title">欧普康视<br />售后工单系统</div>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="tel" :formatter="formatter" type="tel" label="手机号" placeholder="请输入手机号"
          error-message="手机号格式错误" />
        <van-field v-model="yzm" center clearable label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" type="info">发送验证码</van-button>
          </template>
        </van-field>
        <div class="mgt48">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>

      </van-form>
    </div>
    <div class="sub">
      <p>热线电话：400-630-0595</p>
      <p>服务时间：周一到周五 8：30-17:30</p>
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
        tel: '',
        yzm: ''
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onSubmit() {
       
      },
       formatter(value) {
          // 过滤输入的数字
          return value.replace(/\d/g, '');
        },
    }
  }
</script>

<style scoped lang="scss">
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
</style>