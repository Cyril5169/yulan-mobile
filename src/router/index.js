import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/components/Sign'
import Protocol from '@/components/Protocol'
import Agreement from '@/components/Agreement'
import Msgsearch from '@/components/Msgsearch'
import Banner from '@/components/Banner'
import Client from '@/components/Client'
import Swiper from '@/card/swiper'
import Customer from '@/components/Customer'
import Salesman from '@/components/Salesman'
import ShowProtocol from '@/components/ShowProtocol'
import ReviewedProtocol from '@/components/ReviewedProtocol'
import CardSummary from '@/components/CardSummary'
import ProtocolSummary from '@/components/ProtocolSummary'
import ProtocolSummary2 from '@/components/ProtocolSummary2'
import CardSummary2 from '@/components/CardSummary2'
import protocolImage from '@/components/protocolImage'
import Tax from '@/components/tax'
import checkTax from '@/components/checkTax'
import checkProxy from '@/components/checkProxy'
import Success1 from '@/card/success1'
import Success2 from '@/card/success2'
import Success3 from '@/components/success3'
import Success5 from '@/components/success5'
import Success6 from '@/components/success6'
import Success4 from '@/card/success4'
import cardquery from '@/components/CardQuery'
import Proxy from '@/components/proxy'
import crAgreement from '@/components/crAgreement'
import Review from '@/components/review'
import Announcement from '@/components/Announcement'
import ReviseAgreement from '@/components/ReviseAgreement'
import testcard from '@/components/testcard'

//orderSystem
import SelectType from '@/ordersystem/componentorder/SelectType'
import SearchWall from '@/ordersystem/componentorder/SearchWall'
import SearchSoft from '@/ordersystem/componentorder/SearchSoft'
import SearchCurtain from '@/ordersystem/componentorder/SearchCurtain'
import TaskSearch from '@/ordersystem/componentorder/TaskSearch'
import BillManage from '@/ordersystem/componentorder/bill/BillManage'
import BillDetails from '@/ordersystem/componentorder/bill/BillDetails'
//软装类型
import Bzhen from '@/ordersystem/componentorder/SoftType/Bzhen'
import Ghua from '@/ordersystem/componentorder/SoftType/Ghua'
import Guadai from '@/ordersystem/componentorder/SoftType/Guadai'
import Hbian from '@/ordersystem/componentorder/SoftType/Hbian'
import Mliao from '@/ordersystem/componentorder/SoftType/Mliao'
import Qita from '@/ordersystem/componentorder/SoftType/Qita'
import Taoci from '@/ordersystem/componentorder/SoftType/Taoci'
//商品详情
import WallDetails from '@/ordersystem/componentorder/WallDetails'
import SoftDetails from '@/ordersystem/componentorder/SoftDetails'
import CurtainDetails from '@/ordersystem/componentorder/CurtainDetails'
//购物车
import ShoppingCart from '@/ordersystem/componentorder/cart/ShoppingCart'
import WallCart from '@/ordersystem/componentorder/cart/WallCart'
import SoftCart from '@/ordersystem/componentorder/cart/SoftCart'
import CurtainCart from '@/ordersystem/componentorder/cart/CurtainCart'
//我的订单
import MyOrder from '@/ordersystem/componentorder/orderform/MyOrder'
import FillOrder from '@/ordersystem/componentorder/orderform/FillOrder'
import OrderDetails from '@/ordersystem/componentorder/orderform/OrderDetails'
import AddressList from '@/ordersystem/componentorder/orderform/AddressList'
import AddressEdit from '@/ordersystem/componentorder/orderform/AddressEdit'
import NewAddress from '@/ordersystem/componentorder/orderform/NewAddress'
import ThMsg from '@/ordersystem/componentorder/orderform/ThMsg'
//个人中心
import MyPersonal from '@/ordersystem/componentorder/my/MyPersonal'
import MyCoupon from '@/ordersystem/componentorder/my/MyCoupon'
//银行汇款
import Bank from '@/ordersystem/componentorder/bankHk/Bank'
import BankDetails from '@/ordersystem/componentorder/bankHk/BankDetails'
import CreateBank from '@/ordersystem/componentorder/bankHk/CreateBank'
//委托喷绘
import WtPhLists from '@/ordersystem/componentorder/Wtph/WtPhLists'
import WtDetails from '@/ordersystem/componentorder/Wtph/WtDetails'
//退货赔偿
import TuiHuoLists from '@/ordersystem/componentorder/tuiHuo/TuiHuoLists'
import TuiHDetails from '@/ordersystem/componentorder/tuiHuo/TuiHDetails'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '*',
      redirect: '/Sign'
    },
    {
      path: '',
      redirect: '/Sign'
    },
    {
      path: '/cardquery/checktax',
      name: 'checkTax',
      component: checkTax
    },
    {
      path: '/cardquery/checkproxy',
      name: 'checkproxy',
      component: checkProxy
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/protocolsummary',
      name: 'ProtocolSummary',
      component: ProtocolSummary
    },
    {
      path: '/protocolsummary2',
      name: 'ProtocolSummary2',
      component: ProtocolSummary2
    },
    {
      path: '/cardsummary2',
      name: 'CardSummary2',
      component: CardSummary2
    },
    {
      path: '/cardsummary',
      name: 'CardSummary',
      component: CardSummary
    },
    {
      path: '/reviewedprotocol',
      name: 'ReviewedProtocol',
      component: ReviewedProtocol
    },
    {
      path: '/showprotocol',
      name: 'ShowProtocol',
      component: ShowProtocol
    },
    {
      path: '/protocol',
      name: 'Protocol',
      component: Protocol
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/salesman',
      name: 'Salesman',
      component: Salesman
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/msgsearch',
      name: 'Msgsearch',
      component: Msgsearch
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/client',
      name: 'Client',
      component: Client,
      // beforeEnter: (to, from, next) => {
      //   console.log(this);

      //   console.log(to);
      //   console.log(from);
      //   next();
      // }
    },
    {
      path: '/swiper',
      name: 'Swiper',
      component: Swiper,
      meta: {keepAlive: true}
    },
    {
      path: '/proimage',
      name: 'protocolImage',
      component: protocolImage
    },
    {
      path: '/swiper/tax',
      name: 'Tax',
      component: Tax
    },
    {
      path: '/success1',
      name: 'Success1',
      component: Success1
    },
    {
      path: '/success2',
      name: 'Success2',
      component: Success2
    },
    {
      path: '/success3',
      name: 'Success3',
      component: Success3
    },
    {
      path: '/success4',
      name: 'Success4',
      component: Success4
    },
    {
      path: '/success5',
      name: 'Success5',
      component: Success5
    },
    {
      path: '/success6',
      name: 'Success6',
      component: Success6
    },
    {
      path: '/crAgreement',
      name: 'crAgreement',
      component: crAgreement
    },
    // {
    //   path: '/cardquery',
    //   name: 'CardQuery',
    //   component: cardquery
    // },
    {
      path: '/cardquery',
      name: 'CardQuery',
      component: testcard
    },
    {
      path: '/proxy',
      name: 'Proxy',
      component: Proxy
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/reviseagreement',
      name: 'reviseagreement',
      component: ReviseAgreement
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: testcard
    // },


    //订单系统
    {
      path: '/shopstore',
      name: 'shopstore',
      component: SelectType
    },
    {
      path: '/searchwall',
      name: 'searchwall',
      component: SearchWall
    },
    {
      path: '/searchsoft',
      name: 'searchsoft',
      component: SearchSoft,
      redirect: '/searchsoft/hbian',
      children: [
        {path: '/searchsoft/bzhen', name: 'bzhen', component: Bzhen},
        {path: '/searchsoft/ghua', name: 'ghua', component: Ghua},
        {path: '/searchsoft/guadai', name: 'guadai', component: Guadai},
        {path: '/searchsoft/hbian', name: 'hbian', component: Hbian},
        {path: '/searchsoft/mliao', name: 'mliao', component: Mliao},
        {path: '/searchsoft/qita', name: 'qita', component: Qita},
        {path: '/searchsoft/taoci', name: 'taoci', component: Taoci},
      ]
    },
    {
      path: '/searchcurtain',
      name: 'searchcurtain',
      component: SearchCurtain
    },
    //商品详情
    {
      path: "/walldetails",
      name: 'walldetails',
      component: WallDetails
    },
    {
      path: "/softdetails",
      name: 'softdetails',
      component: SoftDetails
    },
    {
      path: "/curtaindetails",
      name: 'curtaindetails',
      component: CurtainDetails
    },
    //购物车
    {
      path: "/shoppingcart",
      name: 'shoppingcart',
      component: ShoppingCart,
      meta: {keepAlive: true},
      // redirect:'/mycart/wallcart',
      children: [
        // {path:"/mycart/allcart",name:"allcart",component:AllCart},
        {path:"/mycart/wallcart",name:"wallcart",component:WallCart},
        {path:"/mycart/softcart",name:"softcart",component:SoftCart},
        {path:"/mycart/curtaincart",name:"curtaincart",component:CurtainCart}
      ]
    },
    //我的订单
    {
      path: "/myorder",
      name: 'myorder',
      component: MyOrder
    },
    {
      path: "/fillorder",
      name: 'fillorder',
      component: FillOrder,
      // meta: {
      //   // isUseCache: false, // 这个字段的意思稍后再说
      //   keepAlive: true // 通过此字段判断是否需要缓存当前组件
      // }

    },
    {
      path: "/orderdetails/:state_id/:find",
      name: 'orderdetails',
      component: OrderDetails,
    },
    {
      path: "/addresslist",
      name: 'addresslist',
      component: AddressList,
    },
    {
      path: "/addressedit",
      name: 'addressedit',
      component: AddressEdit,
    },
    {
      path: "/newaddress",
      name: '  newaddress',
      component: NewAddress,
    },
    {
      path: "/thmsg/:orderId/:itemNo",
      name: 'thmsg',
      component: ThMsg,
    },
    {
      path: "/mypersonal",
      name: 'mypersonal',
      component: MyPersonal,
    },
    {
      path: "/mycoupon",
      name: 'mycoupon',
      component: MyCoupon,
    },
    {
      path: "/tasksearch",
      name: 'tasksearch',
      component: TaskSearch,
    },
    {
      path: "/billmanage",
      name: 'billmanage',
      component: BillManage,
    },
    {
      path: "/billdetails",
      name: 'billdetails',
      component: BillDetails,
    },
    {
      path:'/bank',
      name:"bank",
      component:Bank
    },
    {
      path: "/bankdetails",
      name: 'bankdetails',
      component: BankDetails,
    },
    {
      path: "/createbank",
      name: 'createbank',
      component: CreateBank,
    },
    {
      path: "/wtphlists",
      name: 'wtphlists',
      component: WtPhLists,
    },
    {
      path: "/wtdetails",
      name: 'wtdetails',
      component: WtDetails,
    },
    {
      path: "/tuihuolists",
      name: 'tuihuolists',
      component: TuiHuoLists,
    },
    {
      path: "/tuihdetails",
      name: 'tuihdetails',
      component: TuiHDetails,
    },
  ]
})
