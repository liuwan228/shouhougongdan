<template>
  <div class="main" id="scroll">
    <div class="pro_detail">
      <div class="name">{{ progessInfo.proName }}</div>
      <div class="pro_sub">序列号：{{ progessInfo.SN }}</div>
      <div class="pro_sub">工单号：{{ progessInfo.bianhao }}</div>
      <div class="pro_sub">质保期：{{ progessInfo.warrantyPeriod }}</div>
    </div>
    <div class="orde_status mgt24">
      <van-steps direction="vertical" :active="progessList.length - 1" active-color="#38f" icon-size="28px">
        <van-step v-for="(item, index) in progessList" :key="index">
          <div class="title">{{ item.addtime }}</div>
          <div class="title">{{ chenkedStatus(item.gdStatus) }}</div>
          <!-- 完成提交，等待客服联络 -->
          <div class="stage1" v-if="item.gdStatus == '0'">
            <div class="sub">问题描述： {{ item.question }} </div>
            <div class="imgList" v-show="item.photo !== ''">
              <div v-for="(item,index) in item.photo.split(',')" :key="index" class="img_box">
                <van-image width="60" height="60" :src="item" />
              </div>
            </div>
            <div class="sub">客服将在1个工作日内回电，请保持电话畅通，或直接拨打热线电话：400-630-0595</div>
          </div>
          <!-- 客服已联络解决问题，售后流程结束 -->
          <div class="stage1" v-if="item.gdStatus == '9'">
            <span class="sub">{{ item.kfCheckNotes }}</span>
          </div>
          <!-- 客服已联络，请将产品寄回 -->
          <div class="stage2" v-if="item.gdStatus == '1'">
            <div class="sub">请注意：
              <ul>
                <li>· 请将产品问题简述和手机号码写在一张小卡片上，随产品一起寄回。</li>
                <li>· 请将产品妥善打包，尽可能使用原包装，并附所有配件。寄到如下地址。</li>
              </ul>
            </div><br>
            <div id="text">
              <div class="sub">收件地址：安徽省合肥市高新区望江西路4899号欧普康视</div>
              <div class="sub">收件人：李芳玲</div>
              <div class="sub">收件电话：0551-65319181 </div>
            </div>
            <div><span class="changeAddress" @click="copy()">复制以上地址</span></div><br>
            <div class="sub">寄出后，请填写如下信息，以便我们跟踪您寄出的产品和给您寄回产品。</div>
            <div class="mgt24 addressBox" v-if="progessList.length < 3">
              <van-form>
                <van-field v-model="perInfo.shr" :maxlength="4" label="姓名"
                  :rules="[{ required: true, message: '请填写寄件人姓名' }]" placeholder="寄件人姓名" />
                <van-field v-model="perInfo.shdh" label="手机号" :rules="userTel" placeholder="寄件人手机" />
                <van-field v-model="perInfo.jhKuaidicom" label="快递公司" :rules="[{ required: true, message: '请填写快递公司' }]"
                  placeholder="寄回快递公司名称" />
                <van-field v-model="perInfo.jhKuaididanno" label="快递单号"
                  :rules="[{ required: true, message: '请填写快递单号' }]" placeholder="寄回快递单号" />
                <van-field @click="showSsq = true" label="地区" :rules="[{ required: true, message: '请选择地址' }]"
                  v-model="ssqInfo" right-icon="arrow" placeholder="选择省/市/区" />
                <van-popup v-model="showSsq" position="bottom" :style="{ height: '30%', width: '100%' }">
                  <van-area title="地址" value="110101" :area-list="areaList" @cancel="showSsq = false"
                    @confirm="confirmAddress" :columns-placeholder="['请选择', '请选择', '请选择']" />
                </van-popup>
                <van-field v-model="perInfo.shdz" :rules="[{ required: true, message: '请填写详细地址' }]" label="详细地址"
                  placeholder="街道门牌、楼层房间号等信息" />
                <div class="mgt24">
                  <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
                </div>
              </van-form>
            </div>

          </div>
          <!-- 产品已寄回，请等待售后人员收货检测 -->
          <div class="stage3" v-if="item.gdStatus == '2'">
            <div class="sub">寄件快递：{{ item.jhKuaidicom }}</div>
            <div class="sub">寄件单号：{{ item.jhKuaididanno }}</div>
            <div class="sub">回寄件人姓名：{{ item.shr }}</div>
            <div class="sub">回寄收件人手机号：{{ item.shdh }}</div>
            <div class="sub">回寄收件人地址：{{ item.shprovince + item.shcity + item.sharea + item.shdz }}</div>
            <div class="sub mgt24" v-if="progessInfo.realStatus<6">回寄信息错误？点击 <span class="changeAddress"
                @click="ChangeAddress(item)">这儿修改</span></div>
            <div class="mgt24 addressBox" v-show="showAddress">
              <van-form>
                <van-field v-model="perInfo.shr" :maxlength="4" label="姓名"
                  :rules="[{ required: true, message: '请填写寄件人姓名' }]" placeholder="寄件人姓名" />
                <van-field v-model="perInfo.shdh" label="电话" :rules="userTel" placeholder="寄件人手机" />
                <van-field v-model="item.jhKuaidicom" label="快递公司" readonly
                  :rules="[{ required: true, message: '请填写快递公司' }]" placeholder="寄回快递公司名称" />
                <van-field v-model="item.jhKuaididanno" readonly label="快递单号"
                  :rules="[{ required: true, message: '请填写快递单号' }]" placeholder="寄回快递单号" />
                <van-field @click="showSsq = true" label="地区" :rules="[{ required: true, message: '请选择地址' }]"
                  v-model="ssqInfo" right-icon="arrow" placeholder="选择省/市/区" />
                <van-popup v-model="showSsq" position="bottom" :style="{ height: '30%', width: '100%' }">
                  <van-area title="地址" value="110101" :area-list="areaList" @cancel="showSsq = false"
                    @confirm="confirmAddress" :columns-placeholder="['请选择', '请选择', '请选择']" />
                </van-popup>
                <van-field v-model="perInfo.shdz" :rules="[{ required: true, message: '请填写详细地址' }]" label="详细地址"
                  placeholder="街道门牌、楼层房间号等信息" />
                <div class="mgt24">
                  <van-button round block type="info" native-type="submit" @click="onSubmitChange">提交</van-button>
                </div>
              </van-form>
            </div>
          </div>
          <!-- 售后已收到产品，正在进行检测 -->
          <div class="stage4" v-if="item.gdStatus == '3'">
            <span class="sub">工程师有可能与您联系，请保持电话畅通。</span>
          </div>

          <!-- 产品问题在保修外，需要您付费维修 -->
          <div class="stage5" v-if="item.gdStatus == '4'">
            <span class="sub">您需要支付{{ item.money }}元</span>
            <template v-if="isShowPay">
              <div class="mgt24">
                <van-button round block type="info" native-type="submit" @click="jumpToPay">跳转支付页面</van-button>
              </div>
              <div class="mgt24">
                <van-button round block plain type="info" native-type="submit" @click="jumpToPay">不想修了，寄回</van-button>
              </div>
            </template>
          </div>
          <!-- 售后已完成处理并寄回，请您查收快递 -->
          <div class="stage5" v-if="item.gdStatus == '6'">
            <div class="sub">回寄快递：{{ item.hjKuaidicom }} </div>
            <div class="sub">回寄单号：{{ item.hjKuaididanno }} </div>
            <div class="mgt24" v-show="isShowBut">
              <van-button round block type="info" @click="getConfirmReceipt">确认收件</van-button>
            </div>
          </div>
          <!-- 产品已收到，售后流程结束 -->
          <div class="stage4" v-if="item.gdStatus == '7'">
            <span class="sub">{{ item.title }}</span>
          </div>
          <!-- 维修费用已支付，售后正在维修中 -->
          <div class="stage4" v-if="item.gdStatus == '5'">
            <span class="sub">{{ item.title }}</span>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
  import {
    areaList
  } from "@vant/area-data";
  import {
    apiOrderDetail,
    apiAddress,
    apiReceipt,
    apiChangeReceipt,
    apiAgressPay
  } from '@/api/detail';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        showSsq: false, //省市区选择
        showAddress: false, //显示修改地址
        showSSQ: false,
        areaList,
        orderId: '', //订单Id
        ssqInfo: '', //省市区地址
        isShowBut: false, //是否展示确认收获按钮
        userTel: [{
          required: true,
          message: '手机号不能为空'
        }, {
          validator: value => {
            return /^1[23456789]\d{9}$/.test(value);
          },
          message: "请输入正确格式的手机号"
        }],
        perInfo: {}, //寄件人信息
        progessInfo: {},
        progessList: [],
        isShowPay: false,
      }
    },
    computed: {},
    watch: {},
    created() {
      this.orderId = this.$route.query.id
    },
    mounted() {
      this.getDetailInfo()
    },
    methods: {
      // 提交地址表单
      async onSubmit() {
        let obj = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          orderId: this.orderId,
        }
        let params = Object.assign(this.perInfo, obj);
        const res = await apiAddress(params)
        if (res.status == 0) {
          this.showSsq = false;
          this.getDetailInfo()
        } else {
          this.$toast(res.errMsg)
        }
      },
      // 获取详情页信息
      async getDetailInfo() {
        let params = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          // userId: '7',
          // token: 'CEF5832E38898C62715A8EDCF06AA2A6',
          orderId: this.orderId,
        };
        const res = await apiOrderDetail(params)
        if (res.realStatus == '6') {
          this.isShowBut = true
        }
        if (res.realStatus == '4') {
          this.isShowPay = true
        }

        this.progessInfo = res
        this.progessList = res.list
        console.log(this.progessList, "this.progessList")
        this.progessList.forEach(item => {
          if (item.gdStatus == '1') {
            this.$set(this.perInfo, 'shprovince', item.lastShprovince)
            this.$set(this.perInfo, 'shcity', item.lastShcity)
            this.$set(this.perInfo, 'sharea', item.lastSharea)
            this.$set(this.perInfo, 'shdz', item.lastShdz)
            this.$set(this.perInfo, 'shdh', item.lastShdh)
            this.$set(this.perInfo, 'shr', item.lastShr)
            this.ssqInfo = `${item.lastShprovince}${item.lastShcity}${item.lastSharea}`;
          }
        })

      },
      // 选择省市区
      confirmAddress(val) {
        this.ssqInfo = val
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
        this.$set(this.perInfo, 'shprovince', val[0].name)
        this.$set(this.perInfo, 'shcity', val[1].name)
        this.$set(this.perInfo, 'sharea', val[2].name)
        // this.ssqInfo = val[0].name + val[1].name + val[2].name
        this.$nextTick(() => {
          this.showSsq = false
        });
      },
      // 修改地址
      ChangeAddress(value) {
        this.showAddress = true
        this.scrollToBottom()
        console.log(value, "value")
        this.$set(this.perInfo, 'shr', value.shr)
        this.$set(this.perInfo, 'shdh', value.shdh)
        this.$set(this.perInfo, 'shdz', value.shdz)
        this.$set(this.perInfo, 'shprovince', value.shprovince)
        this.$set(this.perInfo, 'shcity', value.shcity)
        this.$set(this.perInfo, 'sharea', value.sharea)
        this.ssqInfo = value.shprovince + value.shcity + value.sharea;
      },
      //确认修改
      async onSubmitChange() {
        let obj = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          orderId: this.orderId,
        }
        let params = Object.assign(this.perInfo, obj);
        const res = await apiChangeReceipt(params)
        if (res.status == 0) {
          this.showAddress = false
          this.getDetailInfo()

        } else {
          this.$toast(res.errMsg)
        }
      },
      // 支付
      async jumpToPay() {
        let params = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          orderId: this.orderId,
          isUserAgree: '1'
        };
        const res = await apiAgressPay(params)
        if (res.status == 0) {
          this.isShowPay = false
          this.getDetailInfo()
        } else {
          this.$toast(res.errMsg)
        }
      },

      // 确认收货
      async getConfirmReceipt() {
        let params = {
          userId: window.localStorage.getItem("userId"),
          token: window.localStorage.getItem('token'),
          orderId: this.orderId,
        };
        const res = await apiReceipt(params)
        if (res.status == 0) {
          this.$toast('已确认收货')
          this.isShowBut = false
          this.getDetailInfo()
        } else {
          this.$toast(res.errMsg)
        }
      },
      // 一键复制
      copy() {
        let text = document.getElementById('text').innerText;
        this.$copyText(text).then(
          e => {
            console.log('复制成功：', e);
            this.$toast('已复制到剪切板')
          },
          e => {
            console.log('复制失败：', e);
          }
        )
      },
      // 工单状态
      chenkedStatus(value) {
        switch (value) {
          case '0':
            return '完成提交，等待客服联络'
          case '1':
            return '客服已联络，请将产品寄回'
          case '2':
            return '产品已寄回，请等待售后人员收货检测'
          case '3':
            return '售后已收到产品，正在进行检测'
          case '4':
            return '产品问题在保修外，需要您付费维修'
          case '5':
            return '维修费用已支付，售后正在维修中'
          case '6':
            return '售后已完成处理并寄回，请您查收快递'
          case '7':
            return '产品已收到，售后流程结束'
          case '9':
            return '客服已联络解决问题，售后流程结束'
        }
      },
      scrollToBottom() {
        this.$nextTick(() => {
          var div = document.getElementById('scroll')
          div.scrollTop = div.scrollHeight
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-button--round {
    border-radius: 16px;
  }

  .imgList {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 18px 0;

    .img_box {
      margin-right: 10px;
    }
  }

  .pro_detail {
    .name {
      font-size: 32px;
      color: #1989fa;
      font-weight: 700;
    }

    .pro_sub {
      font-size: 24px;
      margin: 4px 0;
      color: #222;
    }

  }

  .orde_status {
    .title {
      font-size: 30px;
      color: #1989fa;
      margin-bottom: 4px;
    }

    .sub {
      margin-top: 8px;
      color: #666;
    }

    ::v-deep .van-field__label {
      width: 4.2em;
    }

    // ::v-deep .van-cell {
    //     border: 1px solid #ebedf0;
    //     margin-top: 24px;
    //   }
    ::v-deep .van-step__circle {
      width: 24px;
      height: 24px;
    }

    ::v-deep .van-step__circle-container {
      font-size: 36px;
    }
  }

  //地址
  .addressBox .van-address-edit {
    padding: 0;
  }

  .changeAddress {
    color: #1989fa;
    text-decoration: underline;
  }
</style>