<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="收益详情" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="详情">
          <cell title="收益金额" :value="incomeAmount"></cell>
          <cell-form-preview :list="list"></cell-form-preview>
        </group>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Group, Cell, CellFormPreview } from 'vux'

export default {
  name: 'IncomeRecordListDetail',
  components: {
    ViewBox,
    XHeader,
    Group,
    Cell,
    CellFormPreview
  },
  data () {
    return {
      incomeAmount: '+' + this.$route.query.incomeInfo.incomeAmount + '元',
      list: [{
        label: '收益类型',
        value: this.getTypeName(this.$route.query.incomeInfo.incomeType)
      }, {
        label: '收益产生手机号',
        value: this.$route.query.incomeInfo.incomeMobile
      }, {
        label: '收益产生银联ID',
        value: this.$route.query.incomeInfo.incomeCupId
      }, {
        label: '收益产生时间',
        value: this.$route.query.incomeInfo.incomeCreateTime
      }]
    }
  },
  methods: {
    getTypeName (incomeType) {
      if (incomeType === 'zj') {
        return '直接收益'
      }
      if (incomeType === 'qd') {
        return '渠道收益'
      }
      return '未知'
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
