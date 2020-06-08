import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import SummaryIncome from '@/components/income/SummaryIncome'
import IncomeDetail from '@/components/income/IncomeDetail'
import IncomeRecordList from '@/components/income/IncomeRecordList'
import IncomeRecordListDetail from '@/components/income/IncomeRecordListDetail'
import CurrentIncomePolicy from '@/components/income/CurrentIncomePolicy'
import LowerIncomePolicy from '@/components/income/LowerIncomePolicy'
import MyChannel from '@/components/channel/MyChannel'
import AddChannel from '@/components/channel/AddChannel'
import ChannelListDetail from '@/components/channel/ChannelListDetail'
import ChannelProfileDetail from '@/components/channel/ChannelProfileDetail'
import ChannelCurrentIncomePolicy from '@/components/channel/ChannelCurrentIncomePolicy'
import MyProfile from '@/components/profile/MyProfile'
import MyProfileDetail from '@/components/profile/MyProfileDetail'
import ChangePassword from '@/components/profile/ChangePassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/income/summaryIncome',
      name: 'SummaryIncome',
      component: SummaryIncome
    },
    {
      path: '/income/incomeDetail',
      name: 'IncomeDetail',
      component: IncomeDetail
    },
    {
      path: '/income/incomeRecordList',
      name: 'IncomeRecordList',
      component: IncomeRecordList
    },
    {
      path: '/income/incomeRecordListDetail',
      name: 'IncomeRecordListDetail',
      component: IncomeRecordListDetail
    },
    {
      path: '/income/currentIncomePolicy',
      name: 'CurrentIncomePolicy',
      component: CurrentIncomePolicy
    },
    {
      path: '/income/lowerIncomePolicy',
      name: 'LowerIncomePolicy',
      component: LowerIncomePolicy
    },
    {
      path: '/channel/myChannel',
      name: 'MyChannel',
      component: MyChannel
    },
    {
      path: '/channel/addChannel',
      name: 'AddChannel',
      component: AddChannel
    },
    {
      path: '/channel/channelListDetail',
      name: 'ChannelListDetail',
      component: ChannelListDetail
    },
    {
      path: '/channel/channelProfileDetail',
      name: 'ChannelProfileDetail',
      component: ChannelProfileDetail
    },
    {
      path: '/channel/channelCurrentIncomePolicy',
      name: 'ChannelCurrentIncomePolicy',
      component: ChannelCurrentIncomePolicy
    },
    {
      path: '/profile/myProfile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/profile/myProfileDetail',
      name: 'MyProfileDetail',
      component: MyProfileDetail
    },
    {
      path: '/profile/changePassword',
      name: 'ChangePassword',
      component: ChangePassword
    }
  ]
})
