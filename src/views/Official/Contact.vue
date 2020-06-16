<!--  -->
<template>
  <div class="main official">
    <ul class="left">
      <li
        :class="{'active':currIdx==index}"
        @click="changeModel(index)"
        v-for="(item,index) in menu"
        :key="index"
      >{{item}}</li>
    </ul>
    <div class="right cus-service">
      <div v-show="currIdx==0" class="section section1">
        <div class="headline">客服信息</div>
        <div class="item">
          <span>客服电话：</span>0755-8302-6070
        </div>
        <div class="item">
          <span>客服邮箱：</span>kefu@szgyzb.com
        </div>
        <div class="item">
          <span>客服时间：</span>周一至周六 8：30~17：30
        </div>
        <div class="item">
          <span>地址：</span>深圳市南山区粤海街道滨海社区海天一路19、17、18号深圳市软件产业基地4栋A9层902
        </div>
      </div>
      <div v-show="currIdx==1" class="section">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">注册问题</el-menu-item>
          <el-menu-item index="2">账户问题</el-menu-item>
          <el-menu-item index="3">付款问题</el-menu-item>
          <el-menu-item index="4">交易问题</el-menu-item>
          <el-menu-item index="5">安全问题</el-menu-item>
        </el-menu>
        <div class="answer" v-if="activeIndex=='1'">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                不注册七分钱账号能否支付费用？
              </template>
              <div>不注册无法使用支付功能。</div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                电脑网页无法注册账户有那几种情况？
              </template>
              <div>1、已经用过的手机不能重复注册，一个手机只能对应一个七分钱账户；</div>
              <div>
                2、如提示验证码输入错误，请重新输入一般是因为：
                <ul>
                  <li>a、输入的验证码和图片显示不相符；</li>
                  <li>b、使用的输入法不对（只有在输入法为英文状态下，验证码才有效，否则提示“输入错误，请重新输入”）；</li>
                  <li>c、浏览器问题（建议使用IE浏览器，若图片不能正常显示，可刷新页面，若还是不行，请按如下步骤调整您IE浏览器设置。第一步：打开浏览器，选择菜单中的“工具” —“Internet选项” ；第二步：选择“常规”中“Internet的临时文件”项目中的“删除文件”，并且选择“历史记录”项目中的“清除历史记录”； 第三步：关闭浏览器，重新打开注册页面再次尝试。）</li>
                </ul>
              </div>
              <div>3、如提交时提示注册信息不成功，一般是因为在注册七分钱账户时，一旦您填写完信息点击'同意一下协议并注册'，页面没有跳转至下一页仍在原页面，说明您填写的内容不符合要求，需要您重新修改。请您查看页面是否在错误选项边上设有红色的提示，您可根据提示内容来修改注册信息。若未出现红色提示，请将您的IE浏览器升级到6.0以上版本：点击“浏览器”—“工具”—“Internet”选项，在常规中选项中点击“删除cookies”、“删除文件”，然后关闭浏览器，重新打开再作尝试。</div>
              <div>4、如提示填表项数据异常的，请重启电脑后重新注册。</div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                用户注册后需要绑定邮箱吗？
              </template>
              <div>用户可以根据自己选择是否绑定邮箱，绑定邮箱后可以用于找回密码，增加安全性。</div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                用户注册后需要实名认证吗？
              </template>
              <div>交易不用实名认证，但提现必须实名认证。</div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                用户注册实名认证需要什么资料？
              </template>
              <div>用户实名需要按提示填写姓名、身份证号码，进行手机号码验证。</div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                手机收不到校验码的是什么原因？
              </template>
              <div>1、手机软件屏蔽，如360手机卫士，建议更改设置或卸载后查看是否可以收到可以确认是否此问题；</div>
              <div>2、短信服务运营商问题，可能有些区域存在此类问题，需要运营商进行调试解决。</div>
            </el-collapse-item>
            <el-collapse-item name="7">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                香港/澳门/台湾、外籍用户可以申请实名认证吗？
              </template>
              <div>目前无法申请，只能凭身份证实名认证。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="answer" v-if="activeIndex=='2'">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                什么是七分钱充值/提现/支付？
              </template>
              <div>1、充值：将银行卡的钱通过充值将钱转入七分钱账户余额，充值免费，只能用储蓄卡充值；</div>
              <div>2、提现：从七分钱账户里的钱转到您的银行卡账户中，提现免费，1-5个工作日到账；</div>
              <div>3、支付：可以使用七分钱账户余额支付或者使用银行卡在线支付，在线支付可用信用卡。</div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                可以有哪些方式给七分钱账户充值？
              </template>
              <div>目前只有银联在线充值。</div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                我可以用亲朋好友的银行卡给我的七分钱充值吗？
              </template>
              <div>可以，您登录七分钱后，可以用他人的银行卡给您的“七分钱账户”进行充值。</div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱账户金额能否转账？
              </template>
              <div>七分钱账户暂未开通转账功能。</div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱移动端与网页端有哪些不同？
              </template>
              <div>1、移动端暂未开通提现功能，网页端可以提现；</div>
              <div>2、移动端暂未开通实名认证功能，网页端可以实名认证；</div>
              <div>3、移动端暂未开通捆绑邮箱功能，网页端可以捆绑邮箱；</div>
              <div>4、移动端暂未开通设置安全保护问题功能，网页端可以安全保护问题。</div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱提现可以不是本人的银行卡账号吗？
              </template>
              <div>不可以，必须是本人开户银行卡。</div>
            </el-collapse-item>
            <el-collapse-item name="7">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱登录密码和支付密码可以一样吗？
              </template>
              <div>不可以。</div>
            </el-collapse-item>
            <el-collapse-item name="8">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                一个七分钱账户是否只能对应一张银行卡吗？
              </template>
              <div>每次提现只能对应捆绑一张的银行卡，捆绑的银行卡可以更改。</div>
            </el-collapse-item>
            <el-collapse-item name="9">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱账户无法正常登录是什么原因，如何解决？
              </template>
              <div>可能出现异常交易情况，账户被冻结，请联系客服根据具体情况由客服协助处理，客服热线400-633-0707。</div>
            </el-collapse-item>
            <el-collapse-item name="10">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                提供银行账号捆绑需注意什么？
              </template>
              <div>提供银行账号时候，您需确保银行账号姓名与申请实名认证的七分钱账号的真实姓名与身份证号码一致，如不一致将无法进行认证。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="answer" v-if="activeIndex=='3'">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱支持哪些银行卡支付？
              </template>
              <div>支持绝大多数全国性银行，多数区域性银行，详细查询银联在线支持银联列表。</div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                支持哪些银行信用卡支付？
              </template>
              <div>支持绝大多数全国性银行，多数区域性银行，详细查询银联在线支持银联列表。</div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                各大银行帮助中心？
              </template>
              <dl>
                <dt>中国工商银行：</dt>
                <dd>客服热线：95588</dd>
                <dd>贵宾服务专线：400-66-95588（面向理财金、白金卡客户，目前仅在北京地区开通）</dd>
                <dt>中国建设银行：</dt>
                <dd>客服热线：95533 信用卡：8008200588</dd>
                <dt>中国银行：</dt>
                <dd>客服热线：95566 信用卡24小时热线：4006695566</dd>
                <dt>招商银行：</dt>
                <dd>客服热线：95555 金葵花：40088-95555 信用卡：4008205555</dd>
                <dt>中国交通银行：</dt>
                <dd>客服热线：95559 信用卡：400-800-9888</dd>
                <dt>中国农业银行：</dt>
                <dd>客服热线：95599 信用卡：8008195599</dd>
                <dt>中信银行：</dt>
                <dd>客服热线：95558 金葵花：40088-95555 信用卡：4008895558</dd>
                <dt>中国民生银行：</dt>
                <dd>客服热线：95568 信用卡：400-66-95568</dd>
                <dt>华夏银行：</dt>
                <dd>客服热线：95577 信用卡：4006695577 010-66209557 24小时海外客服热线：+8610-66209557</dd>
                <dt>中国光大银行：</dt>
                <dd>客服热线：95595 信用卡：4008-1-95595</dd>
                <dt>上海浦发银行：</dt>
                <dd>客服热线：95528 信用卡：8008208788 021-38784988</dd>
                <dt>福建兴业银行：</dt>
                <dd>客服热线：95561 信用卡：95561</dd>
                <dt>广东发展银行：</dt>
                <dd>客服热线：95508 网上银行：800-830-8003</dd>
                <dt>平安银行：</dt>
                <dd>客服热线：95511转3 信用卡：95511转2</dd>
                <dt>中国邮政储蓄银行：</dt>
                <dd>客服热线：95580</dd>
              </dl>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="answer" v-if="activeIndex=='4'">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                怎么查询七分钱提现银行卡号？
              </template>
              <div>在用户资料可以查询。</div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何查询我的交易明细？
              </template>
              <div>在历史交易记录可以查询。</div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                我可以查询多长时间的交易？
              </template>
              <div>APP端可查询3个月，PC端可查询1年。</div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                充值是否有金额和次数限制？
              </template>
              <div>充值50元起，无笔数限制，但用户七分钱账户余额最多为5000元，例如：用户七分钱账户余额为4000元，用户进行单笔或多笔充值总金额只能为1000元。</div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                交易退款是否要收取手续费？
              </template>
              <div>用户退款免费。</div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何提现？
              </template>
              <div>点击提现功能后，上传资料审核，资料包括：本人银行卡卡号、身份证正反面扫描件、手持身份证半身照、手持银行卡半身照。</div>
            </el-collapse-item>
            <el-collapse-item name="7">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                用户退款需要多长时间到账？
              </template>
              <div>1-5个工作日内到账。</div>
            </el-collapse-item>
            <el-collapse-item name="8">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                我只有存折没有银行卡能提现吗？
              </template>
              <div>不可以。</div>
            </el-collapse-item>
            <el-collapse-item name="9">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                七分钱操作提现的银行卡需要开通网上银行吗？
              </template>
              <div>不需要。-633-0707。</div>
            </el-collapse-item>
            <el-collapse-item name="10">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                交易失败，账号里的金额已扣掉怎么办？
              </template>
              <div>有可能是银行卡问题，请根据提示联系银行咨询，或者致电七分钱客服，由客服协助处理，客服热线400-633-0707。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="answer" v-if="activeIndex=='5'">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何修改登录密码？
              </template>
              <div>1、记得登录密码时，直接使用当前密码 → 设置新密码；</div>
              <div>2、忘记登录密码时，使用手机/邮箱验证码找回登录密码。（只有在成功绑定邮箱后才能使用邮箱验证码方式找回登录密码） 。</div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何修改支付密码？
              </template>
              <div>1、记得支付密码时，使用当前支付密码 → 设置新支付密码；</div>
              <div>2、忘记支付密码时，通过“手机验证码 + 安全问题找回”或者“手机验证码 + 身份证号码找回”。 （若用户没有设置安全问题，则系统只提供一种“手机号码+身份证号码”找回，当设置了安全问题后，则两种方式都可选择）。</div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何修改绑定手机号码？
              </template>
              <div>1、“旧手机验证码 + 支付密码 +新手机验证码”修改；</div>
              <div>2、“身份证号码 + 支付密码 + 新手机验证码” 修改；</div>
              <div>3、“安全问题 + 支付密码 + 新手机验证码” 修改。（需已设置安全问题）</div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何修改邮箱？
              </template>
              <div>1、“身份证号码 + 支付密码 + 新邮箱验证码” 修改；</div>
              <div>2、“旧邮箱验证码 + 支付密码 + 新邮箱验证码” 修改；（需旧邮箱可用）</div>
              <div>3、“安全问题 + 支付密码 + 新邮箱验证码” 修改。（需已设置安全问题）</div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                如何修改安全问题？
              </template>
              <div>1、记得安全问题时，使用当前安全问题 → 设置新安全问题；</div>
              <div>2、忘记安全问题时，致电七分钱客服，通过人工服务找回。</div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                可以创建多个七分钱账户吗？
              </template>
              <div>可以，用不同的手机号码可以创建不同的七分钱账户。</div>
            </el-collapse-item>
            <el-collapse-item name="7">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                一个手机可以绑定几个七分钱账户？
              </template>
              <div>只能1个。</div>
            </el-collapse-item>
            <el-collapse-item name="8">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                通过实名认证后我可以直接修改真实的姓名和身份证号码吗？
              </template>
              <div>不可以。</div>
            </el-collapse-item>
            <el-collapse-item name="9">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                提交身份证需要注意哪些？
              </template>
              <div>1、证件要求完整、清晰、有效；</div>
              <div>2、证件有效期在3个月内的不予受理；</div>
              <div>3、申请人真实姓名和证件号码与提交的证件信息一致；</div>
              <div>4、证件图片大小要求在2M之内，格式为jpg或gif；</div>
              <div>5、证件都需要彩色原件扫描件或者数码照片。</div>
            </el-collapse-item>
            <el-collapse-item name="10">
              <template slot="title">
                <i class="header-icon el-icon-question"></i>
                用户如何注销七分钱账户？
              </template>
              <div>无法注销，如不使用，用户可通过客服申请账户冻结。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-show="currIdx==2" class="section section3">
        <div class="headline">我们会珍视您提的每一条建议</div>
        <el-form class="form" :model="form" ref="form" label-width="100px">
          <el-form-item label="建议意见" prop="advice">
            <el-input type="textarea" v-model="form.advice"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >提交反馈</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeNames: ["1"],
      menu: ["客服信息", "常见问题", "意见反馈"],
      currIdx: 0,
      form: {
        advice: "",
        phone: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    if (this.$route.params.currIdx) {
      this.currIdx = this.$route.params.currIdx;
    }
  },

  methods: {
    changeModel(idx) {
      this.currIdx = idx;
    },
    handleSelect(key) {
      this.activeIndex = key;
      this.activeNames = "1";
    }
  }
};
</script>
<style lang="stylus">
.el-collapse-item__header {
  padding: 0 20px;
  background: #f0f4f7;
  margin-top: 15px;
  border-radius: 4px;
  border-bottom: none;

  .el-icon-question {
    color: #268cc3;
    font-size: 26px;
    margin-right: 5px;
  }
}

.el-collapse-item__content {
  padding: 20px;
  background: #f6fbff;

  ul {
    padding: 10px 0 10px 20px;
    font-size: 10px;
    color: #268cc3;
  }

  dt {
    color: #666;
    font-weight: 700;
    font-size: 14px;
    line-height: 36px;
  }

  dd {
    color: #69737b;
    line-height: 30px;
  }
}

.el-collapse-item__header.is-active {
  background: #56abe4;
  color: #fff;

  .el-icon-question {
    color: #fff;
  }
}

.section1 {
  font-size: 16px;

  .item {
    color: #999;
    line-height: 40px;

    span {
      color: #2b2b2b;
    }
  }
}

.form {
  width: 500px;
  margin: 0 auto;
}
</style>