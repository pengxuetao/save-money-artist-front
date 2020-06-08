<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="收益明细" class="x-header" style="position: fixed"></x-header>
      <div>
        <group>
          <cell-box v-for="(item, index) in incomeList" :key="index" is-link>
            <flexbox @click.native="queryIncomeListDetail(item)">
              <flexbox-item :span="8">
                <p>
                  <nobr v-if="item.incomeType==='zj'">直接收益 -</nobr>
                  <nobr v-if="item.incomeType==='qd'">渠道收益 -</nobr>
                  <nobr v-if="item.incomeType!=='zj' && item.incomeType!=='qd'">未知 -</nobr>
                  {{ item.incomeMobile }}
                </p>
                <p>{{ item.incomeCupId }}</p>
                <p>{{ item.incomeCreateTime }}</p>
              </flexbox-item>
              <flexbox-item :span="3">
                <p style="text-align: center;font-size: 20px">+{{ item.incomeAmount }}元</p>
              </flexbox-item>
            </flexbox>
          </cell-box>
        </group>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Flexbox, FlexboxItem, Group, Cell, CellBox, Alert } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'IncomeRecordList',
  components: {
    ViewBox,
    XHeader,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    CellBox,
    Alert
  },
  data () {
    return {
      incomeList: []
    }
  },
  created () {
    this.getIncomeList()
  },
  methods: {
    getIncomeList () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        params: {
          page: 1,
          limit: 10
        },
        url: Global.serverUrl + 'income/queryIncomeListByUserId'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.incomeList = data.data.list
        // return data.data
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
      })
    },
    queryIncomeListDetail (item) {
      console.log(item.incomeMobile)
      this.$router.push({
        path: '/income/incomeRecordListDetail',
        query: {
          incomeInfo: item
        }
      })
    }
  }
}
</script>

<style>
  .x-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%
  }
</style>
