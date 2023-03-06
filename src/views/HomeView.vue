<template>
  <div class="main">
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
    <van-button round block icon="plus" type="info" @click="jump('./prolist')">新建工单</van-button>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="list" v-for="(item,index) in orderList" :key="index">
        <div class="left">
          <div class="name" @click="orderDetail(item.orderId)">{{item.proName}}</div>
          <div class="sub">{{chenkedSub(item.gdStatus)}}</div>
          <div class="number">{{item.bianhao}}</div>
        </div>
        <div class="right" @click="orderDetail(item.orderId)">{{chenked(item.gdStatus)}}</div>
      </div>
    </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
  import axios from "axios";
  import {
    apiGetUserInfo,
    apiOrderList
  } from '@/api/home';

  export default {
    name: 'HomeView',
    components: {},
    props: {},
    data() {
      return {
        orderList: [],
        status: '',
        loading: true, //加载状态
        finished: false, //是否加载完成
        // refreshing: false, //刷新
        openid: '',
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.wxLogin()
    },
    methods: {
      //获取工单列表数据
      async getOrderList() {
        // if (this.refreshing) {
        //   this.orderList = [];
        //   this.refreshing = false;
        // }
        const res = await apiOrderList({
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token')
        })
        console.log(res, "res")
        let orderList = res.list || []
        // 如果返回的数组是空或数组长度是0
        if (orderList == null || orderList.length === 0) {
          this.loading = false; // 关闭加载状态
          this.finished = true; // 加载结束
          return;
        }
        this.loading = false;
        for (let i = 0; i < orderList.length; i++) {
          let item = orderList[i]
          this.orderList.push(item)
        }
        this.finished = this.orderList.length >= res.list.length
      },


      // 下拉刷新
      // onRefresh() {
      //   // 清空列表数据
      //   this.finished = false;
      //   // 重新加载数据
      //   // 将 loading 设置为 true，表示处于加载状态
      //   this.loading = true;
      //   this.getOrderList();
      // },
      wxLogin() {
        // 定时器，为了让用户授权才能使用，如果没授权，则5秒后重新弹框提示用户授权
        // var tokenTimer = setInterval(() => {
        // 判断有没有token
        const token = window.localStorage.getItem('token')
        // const token = '0086F7AEE3CE6A3395481A84F7D61172'
        console.log("token", token)
        if (!token) {
          // 获取地址栏后面的参数code
          let code = this.getParam(window.location.href, 'code')
          console.log(code, "code")
          // 如果有code，则需要用code换取token
          if (code) {
            // 接口需要自己定义
            axios.post('https://oppay.orthok.cn/api/wx/gd', {
              code: code
            }, {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }).then(res => {
              console.log(res, "resssssssss")
              const data = res.data
              if (data.status == 0) {
                // clearInterval(tokenTimer) // 清除定时器
                // this.$toast('授权成功') // 提示用户授权成功
                console.log(data, "data")
                this.openid = data.openid
                this.$store.commit('setOpenId', data.openid)
                this.getUserInfo()
                //未注册跳转到注册页，携带openId
              } else {
                this.$toast({
                  message: "授权失败，请稍后重试...",
                  icon: 'none'
                })
              }
            })
          } else {
            // 如果没有code，则需要进行微信授权
            let redirect_uri = encodeURIComponent(window.location.href); // 回调地址
            let appid = 'wxb59c24f73ec56ad0'; // 公众号appId（重要！！！）
            window.location.href =
              `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect&connect_redirect=1`
          }
        } else {
          /**
           * 有token,说明已经授权了，
           * 需要调用获取用户信息接口，自己定义的
           * 并清除定时器
           */
          // clearInterval(tokenTimer)
          console.log("已经有token了", token)
          this.getOrderList() // 获取用户信息接口，自己定义的
        }
        // }, 8000)
      },

      // 获取地址栏链接中某个参数的值 (仅H5)
      getParam(url, key) {
        var pattern = new RegExp('[?&]*' + key + '=([^&]+)');
        try {
          var value = url.match(pattern)[1];
          return value;
        } catch (err) {
          return null;
        }
      },

      // 根据openid获取用户信息
      async getUserInfo() {
        let res = await apiGetUserInfo({
          openid: this.openid
        })
        console.log(res, "用户信息")
        if (res.status == 0) {
          this.$store.commit('setUserId', res.userId)
          window.localStorage.setItem("userId", res.userId)
          window.localStorage.setItem("token", res.token) // 保存token到本地
          this.getOrderList()
        } else {
          this.$router.push('./login')
        }
      },
            // 工单状态
      chenked(value) {
        switch (value) {
          case '0':
            return '等待客服联络'
          case '1':
            return '售后寄回'
          case '2':
            return '等待售后收获'
          case '3':
            return '正在处理'
          case '4':
            return '查看费用'
          case '5':
            return '正在处理'
          case '6':
            return '查看运单号'
          case '7':
            return '结束'
          case '9':
            return '结束'
        }
      },
      chenkedSub(value) {
        switch (value) {
          case '0':
            return '客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595'
          case '1':
            return '请将您的电话号码和故障说明写在一张小卡片上，按地址寄回售后。'
          case '2':
            return '请耐心等待售后收货'
          case '3':
            return '售后已收货，正在进行处理。'
          case '4':
            return '此次维修产生了费用，请对费用进行确认和支付。'
          case '5':
            return '售后已收货，正在进行处理。'
          case '6':
            return '您的产品已寄回，您可以查看运单号，以便查询物流进度。'
          case '7':
            return '售后流程已结束。'
          case '9':
            return '售后流程已结束。'
        }
      },
      // 跳转
      jump(url) {
        this.$router.push(url)
      },
      // 跳转到工单详情页
      orderDetail(id) {
        console.log(id, "id")
        this.$router.push({
          path: './detail',
          query: {
            id: id
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .left {
    flex: 1;

    .name {
      font-size: 30px;
      color: #0F0F0F;
      font-weight: 700;
    }

    .sub {
      font-size: 20px;
      color: #666;
      margin: 12px 0;
    }

    .number {
      font-size: 20px;
      color: #666;
    }
  }

  .right {
    width: 15%;
    margin-left: 24px;
    color: #1989fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
</style>