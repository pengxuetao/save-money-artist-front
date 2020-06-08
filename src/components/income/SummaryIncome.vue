<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-bottom="55px">
      <div>
        <card :header="{title: '总收益'}">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <span>{{ summaryIncome.totalIncomeAmount }}</span>
              <br/>
              累计收益(元)
            </div>
            <div class="vux-1px-r">
              <span>{{ summaryIncome.canDrawIncomeAmount }}</span>
              <br/>
              可提现收益(元)
            </div>
            <div class="vux-1px-r">
              <span>{{ summaryIncome.drewIncomeAmount }}</span>
              <br/>
              已提现收益(元)
            </div>
            <div>
              <span>{{ summaryIncome.generalizeCount }}</span>
              <br/>
              有效推广数量(个)
            </div>
          </div>
        </card>
        <group title="渠道收益">
          <cell title="我的渠道" link="/channel/myChannel"></cell>
          <cell title="我的收益" link="/income/incomeDetail"></cell>
        </group>
        <!--<group>-->
          <!--<group-title slot="title">我的渠道<x-button type="primary" style="float:right;" mini link="/channel/myChannel">查看详情</x-button></group-title>-->
        <!--</group>-->
        <!--<group>-->
          <!--<group-title slot="title">我的收益<x-button type="primary" style="float:right;" mini link="/income/incomeDetail">查看详情</x-button></group-title>-->
        <!--</group>-->
        <group title="我的推广">
          <cell title="我的商户码" is-link></cell>
          <cell title="我的渠道链接" is-link></cell>
        </group>
      </div>
      <tabbar slot="bottom" class="tabbar" style="position: fixed">
        <tabbar-item>
          <img slot="icon" src="../../assets/icon_nav_msg.png">
          <span slot="label">资讯</span>
        </tabbar-item>
        <tabbar-item selected>
          <img slot="icon" src="../../assets/icon_nav_article.png">
          <span slot="label">收益</span>
        </tabbar-item>
        <tabbar-item link="/profile/myProfile">
          <img slot="icon" src="../../assets/icon_nav_cell.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, XButton, Group, GroupTitle, Cell, Card, Alert } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'SummaryIncome',
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XButton,
    Group,
    GroupTitle,
    Cell,
    Card,
    Alert
  },
  data () {
    return {
      summaryIncome: {}
    }
  },
  created () {
    this.getSummaryIncome()
  },
  methods: {
    getSummaryIncome () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'income/querySummaryIncome'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.summaryIncome = data.data
        // return data.data
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
      })
    }
  }
}
</script>

<style>
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%
  }
</style>
