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
    <div class="right">
      <div v-show="currIdx==0" class="section">
        <div class="headline">平面设计师</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、建立并完善企业VI体系；</dd>
          <dd>2、协助部门总监及策划经理完成项目方案设计及形象表现工作；</dd>
          <dd>3、负责公司内外宣传、环境布置以及所需物料的统筹、设计工作；</dd>
          <dd>4、根据公司产品的特点，进行画册、宣传册、横幅、易拉宝、产品手册等的平面设计制作；</dd>
          <dd>5、及时完成上级交办的其他工作。</dd>
          <dt>任职要求</dt>
          <dd>1、视觉传达或平面设计相关专业毕业；</dd>
          <dd>2、3年以上工作经验，必须有高水准的成熟作品；</dd>
          <dd>3、要求精通CDR，PS，AI等平面设计软件；</dd>
          <dd>4、熟练易企秀、MAKA等H5页面制作工具</dd>
          <dd>5、责任心强，性格开朗，善于沟通，有良好的团队合作意识；</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==1" class="section">
        <div class="headline">客服专员</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、接听客户来电（同时做好电话记录），及时反馈妥善处理；</dd>
          <dd>2、收集客户信息和意见，对公司运营提出有效建议；</dd>
          <dd>3、负责客户问题资料，进行整理、归类、保管建档以及反馈；</dd>
          <dd>4、日常本职工作维护：网站在线咨询、接听客服热线、每位留言客户的回访；</dd>
          <dd>5、完成上级领导临时交代的其它任务；</dd>
          <dt>任职要求</dt>
          <dd>1、 18-27岁，大专及以上学历，声音甜美，普通话标准，具备相关金融行业知识，有金融行业（银行、P2P、保险等）客服经验或有第三方支付、基金行业经验；</dd>
          <dd>2、 有服务行业（网络公司、呼叫中心、培训公司等）客服经验；</dd>
          <dd>3、 有良好的沟通能力，工作主动、责任心强，服务意识强。</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==2" class="section">
        <div class="headline">市场专员</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、良好的市场开拓能力</dd>
          <dd>2、具有同行业的人脉资源</dd>
          <dd>3、具有丰富的媒体资源</dd>
          <dd>4、有策划及参与社区、写字楼等市场活动经验</dd>
          <dd>5、优秀的人际沟通协调能力、观察力、应变能力和执行能力</dd>
          <dd>6、较强的谈判技巧，耐心、思路清晰，能制定计划、目标、实施方案手册</dd>
          <dd>7、1-3年工作经验，了解生鲜电商行业，有社区运营、新媒体营销、互联网广告从业经验者优先考虑</dd>
          <dt>任职要求</dt>
          <dd>1、协助、指导各中心制定公司整体市场企划：广告、促销、宣传、推广活动等各项策略</dd>
          <dd>2、负责各种市场渠道（社区、写字楼、企业）的开发与建设</dd>
          <dd>3、负责收集、整理、分析各类同行业信息资料，建立信息资料库为中心领导决策提供决策依据</dd>
          <dd>4、组织编制各种活动、促销方案执行，同时做好相关人员的培训工作</dd>
          <dd>5、负责合作伙伴的商务合作谈判，并维护与合作伙伴的关系</dd>
          <dd>6、根据公司发展，积极开拓外部资源，建立与其他渠道的跨界合作</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==3" class="section">
        <div class="headline">大客户经理</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、负责七分钱移动支付的商务拓展，在合作商户APP中增加“七分钱支付”；</dd>
          <dd>2、通过和各合作伙伴，如线上线下、活动合作、资源互换等各类方式，有效整合支付产品和品牌的推广；</dd>
          <dd>3、维护现有合作伙伴关系，深入挖掘潜在资源进行深度合作；</dd>
          <dd>4、负责落地活动及品牌推广活动的策划与执行。</dd>
          <dt>任职要求</dt>
          <dd>1、大专及以上学历，1年以上销售、商户拓展等工作经验；</dd>
          <dd>2、从事过金融、O2O等行业的商务拓展，能独立开展业务；</dd>
          <dd>3、协助公司及合作伙伴，开展支付推广的营销活动及方案；</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==4" class="section">
        <div class="headline">支付产品总监</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、负责公司支付产品线的策划、规划；</dd>
          <dd>2、结合线上线下用户、商户及支付机构的需求，协调公司相关资源推进产品执行落地；</dd>
          <dd>3、与公司商务、技术等团队进行内部沟通和协调，监控产品开发进展情况，并做出灵活调整，确保产品能达到既定目标。</dd>
          <dt>任职要求</dt>
          <dd>1、本科以上学历，有第三方支付公司或线下支付产品设计等相关领域产品经理工作经验；</dd>
          <dd>2、熟悉支付产品策划，能够独立完成产品策划、规划及执行；</dd>
          <dd>3、工作积极主动，高效敬业，有很强的组织协调能力和任务驱动能力，能在压力下快速产生成果。</dd>
          <dd>4、细致，具备良好的产品表达能力，分析问题逻辑条理清晰。</dd>
          <dd>5、深刻理解支付领域用户需求，熟练使用Auxre，Visio，MindManager等交互原型设计软件。</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==5" class="section">
        <div class="headline">交互（UI）设计师</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、负责公司产品WEB端，移动端App的交互设计；</dd>
          <dd>2、设计产品整体架构、保证产品易用性；设计用户界面交互原型，并通过原型进行评估；对产品整体用户体验与交互设计质量负责；</dd>
          <dd>3、对现有产品的可用性测试和评估提出改进方案，持续优化产品的用户体验；</dd>
          <dd>4、跟进UED工作流程，确保交互规范的落实与交互设计稿的完美实现。</dd>
          <dt>任职要求</dt>
          <dd>1、具备移动端app产品设计经验或1-3年以上专业设计工作经验，有成功案例；</dd>
          <dd>2、对交互设计过程有深入的了解，可以独立完成整个设计过程；</dd>
          <dd>3、主动性高，具优秀的理解、沟通、需求分析与协调能力，很强的语言文字表达能力；</dd>
          <dd>4、简历请附作品。</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==6" class="section">
        <div class="headline">.NET中级开发工程师</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1.参与公司电商系统和电商配送系统、仓储管理系统、智能化分拣、ERP系统等相关的设计和开发等工作。</dd>
          <dd>2.按照软件需求编写概要设计、详细设计、代码、及相关技术文档；</dd>
          <dd>3.对反馈的软件产品故障进行定位、跟踪、调试和修复；</dd>
          <dd>4.对产品完善提出合理化建议；</dd>
          <dd>5.能独立完成业务模块的开发，并指导初级工程师开发；</dd>
          <dd>6.完成上级临时分派的相关事务。</dd>
          <dt>任职要求</dt>
          <dd>1.熟悉软件工程思想和方法，掌握软件开发理论、流程、方法；-3年以上专业设计工作经验，有成功案例；</dd>
          <dd>2.熟悉B/S、C/S结构，精通C#语言,深入理解.net多层架构，能熟练使用ASP.Net、Winform平台进行程序开发；熟悉SQLServer、Oracle、MySQL等大型数据库开发和管理，熟悉存储过程，熟悉大数据量处理；</dd>
          <dd>3.有良好的设计思路和编程习惯，熟悉软件开发流程，能够根据产品需求完成技术概要设计和详细设计；</dd>
          <dd>4.独立开发能力强、沟通能力强、工作认真负责、能够承受工作压力、具有团队合作精神；</dd>
          <dd>5.有以下方面经验的优先：熟悉项目管理、互联网开发、电子商务、仓储系统、物流系统，深入研究电商仓库管理系统，参与电商仓库管理系统产品构建过程，对物流有深入的了解、有物流或供应链行业经验背景，开发过仓储管理系统产品和对电商物流有较深理解。</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
      <div v-show="currIdx==7" class="section">
        <div class="headline">JAVA高级开发工程师</div>
        <dl>
          <dt>岗位职责</dt>
          <dd>1、负责七分钱支付系统群相关子系统的开发及维护工作；</dd>
          <dd>2、根据产品需求完成程序设计、编码、测试工作；</dd>
          <dd>3、按照项目计划，按时提交高质量的代码及文档。</dd>
          <dt>任职要求</dt>
          <dd>1、本科或以上学历，计算机相关专业；</dd>
          <dd>2、三年以上Java开发经验，基础扎实，代码规范严谨；</dd>
          <dd>3、熟悉使用eclipse、svn、maven等工具，熟悉tomcat的配置和使用；</dd>
          <dd>4、熟悉常用的接口技术、加解密技术；</dd>
          <dd>5、有支付行业、银行业工作经验者优先；</dd>
          <dd>6、能吃苦耐劳，承受一定的工作压力；</dd>
          <dd>7、学习能力强，思维敏捷，喜欢钻研；具备良好的沟通能力和优秀的团队协作能力。</dd>
          <dt>在这里工作，您将和我们一起拥有、并得到：</dt>
          <dd>1）一份不错的起薪，不同岗位不一样，13薪，五险一金，项目奖金等。此外我们会有系统的股权和期权激励计划；</dd>
          <dd>2）提供环境优美的小区员工住宿，不定时提供水果和休闲零食；</dd>
          <dd>3）深圳福田CBD大楼，一个宽松自由和高大上的办公环境；</dd>
          <dd>4）一起开发富有想象力和创造力的产品、构筑第三方支付平台。希望我们一起不被打标签的、做好的产品和服务。</dd>
          <dt>力资源部联系邮箱：hr@szgyzb.com 联系电话：0755-83026070</dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currIdx: 0,
      menu: [
        "平面设计师",
        "客服专员",
        "市场专员",
        "大客户经理",
        "支付产品总监",
        "交互(UI)设计师",
        ".NET中级开发工程师",
        "JAVA高级开发工程师"
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    changeModel(idx) {
      this.currIdx = idx;
    }
  }
};
</script>
<style lang="stylus">
dl {
    max-width :880px;
  dt {
    color: #2b2b2b;
    font-size: 16px;
    margin-top: 30px;
    line-height: 36px;
  }

  dd {
    color: #999;
    line-height: 30px;
  }
}
</style>