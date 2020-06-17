import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import MyProfile from '@/components/profile/MyProfile'
import AddSignature from '@/components/profile/AddSignature'
import EditSignature from '@/components/profile/EditSignature'
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
      path: '/profile/addSignature',
      name: 'AddSignature',
      component: AddSignature
    },
    {
      path: '/profile/editSignature/:id',
      name: 'EditSignature',
      component: EditSignature
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
