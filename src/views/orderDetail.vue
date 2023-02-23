<template>
  <div class="main">
    <div class="pro_detail mgt24">
      <div class="name">梦戴维智慧润眼台灯</div>
      <div class="sub">序列号：WML01-2301xxxxx</div>
      <div class="sub">工单号：P2301xxxxxx</div>
      <div class="sub">质保期：待确认</div>
    </div>
    <div class="orde_status mgt24">
      <van-steps direction="vertical" :active="progessList.length-1">
        <van-step v-for="(item,index) in progessList" :key="index">
          <div class="date">{{item.time}}</div>
          <div class="status">{{item.sub}}</div>
          <!-- 完成提交，等待客服联络 -->
          <div class="stage1" v-if="item.status=='0' ">
            <span class="sub">问题描述： {{item.info}} </span>
            <div class="imgList">
              <van-image width="60" height="60" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <span>客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595</span>
          </div>
          <!-- 客服已联络解决问题，售后流程结束 -->

          <!-- 客服已联络，请将产品寄回 -->
          <div class="stage2" v-if="item.status=='1' ">
            <span class="sub">请注意： · 请将产品问题简述和手机号码写在一张小卡片上，随产品一起寄回。 · 请将产品妥善打包，尽可能使用原包装，并附所有配件。寄到如下地址。</span>
            <span>收件地址：安徽省合肥市高新区望江西路4899号欧普康视</span>
            <span>收件人：李芳玲</span>
            <span>收件电话：0551-65319181 </span>
            <span>寄出后，请填写如下信息，以便我们跟踪您寄出的产品和给您寄回产品。</span>
            <div class="mgt24" v-if="progessList.length<2">
              <van-form @submit="onSubmit(query)">
                <van-field v-model="query.express_name" label="" placeholder="快递公司名称" />
                <van-field v-model="query.express_num" label="" placeholder="快递单号" />
                <van-field v-model="query.person_name" label="" placeholder="收件人姓名" />
                <van-field v-model="query.person_tel" label="" placeholder="收件人手机" />
                <van-field v-model="query.person_address" label="" placeholder="收件人地址" />
                <div class="mgt24">
                  <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
              </van-form>
            </div>

          </div>
          <!-- 产品已寄回，请等待售后人员收货检测 -->

          <!-- 售后已收到产品，正在进行检测 -->

          <!-- 售后已完成处理并寄回，请您查收快递 -->

          <!-- 产品已收到，售后流程结束 -->

          <!-- 产品问题在保修外，需要您付费维修 -->

          <!-- 维修费用已支付，售后正在维修中 -->
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        query: {
          express_name: '',
          express_num: '',
          person_name: '',
          person_tel: '',
          person_address: '',
        }, //寄件人信息
        progessList: [{
          time: '2023年2月9日 13:21',
          status: '0',
          sub: '完成提交，等待客服联络',
          info: '功能不好',
          imgUrl: [{
            url: require('@/assets/img/pro1.jpg'),
            id: '1'
          }, {
            url: require('@/assets/img/pro1.jpg'),
            id: '2'
          }],
        }, {
          time: '2023年2月10日 13:21',
          status: '1',
          sub: '客服已联络，请将产品寄回',
          info: '功能不好',
          imgUrl: [{
            url: require('@/assets/img/pro1.jpg'),
            id: '1'
          }, {
            url: require('@/assets/img/pro1.jpg'),
            id: '2'
          }],
        }, {
          time: '2023年2月11日 13:21',
          status: '2',
          sub: '产品已寄回，请等待售后人员收货检测',
          express_name: '韵达',
          express_num: '400-630-0595',
          person_name: '李四',
          person_tel: '15256738723',
          person_address: '安徽省合肥市高新区望江西路4899号',
        }, {
          time: '2023年2月12日 13:21',
          status: '3',
          sub: '售后已收到产品，正在进行检测',
          info: '工程师有可能与您联系，请保持电话畅通。',
        }, {
          time: '2023年2月13日 13:21',
          status: '4',
          sub: '售后已完成处理并寄回，请您查收快递',
          back_express_name: '申通',
          back_express_num: 'ST108435135284',
        }, {
          time: '2023年2月14日 13:21',
          status: '5',
          sub: '产品已收到，售后流程结束',
        }, {
          time: '2023年2月13日 10:21',
          status: '7',
          sub: '产品问题在保修外，需要您付费维修',
          pro1_name: '适配器',
          pro1_money: '34',
          pro2_name: '主控板',
          pro2_money: '299',
          sum: '333'
        }, {
          time: '2023年2月14日 10:21',
          status: '8',
          sub: '维修费用已支付，售后正在维修中',
        }]

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
    }
  }
</script>

<style scoped lang="scss">
  .pro_detail {
    .name {
      font-size: 28px;
      color: #1989fa;
      font-weight: 700;
    }

    .sub {
      font-size: 12px;
      margin: 4px 0;
    }
  }
</style>