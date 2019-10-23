import Vuex from "vuex"
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    CCID: '',
    pos: {},
    position: [],
    revised: false,
    reviewed: Boolean,
    area_M: [],
    year: 2019,
    route: "",
    //order
    //存储订单信息
    orderProduct: [],
    //当前选中地址信息
    address: {},
    //所有购物车列表
    allCart: {
      wallpaper:[],
      soft:[]
    },
    //loading加载
    LOADING: false,
    orderBaseUrl: "http://14.29.223.114:10250/yulan-order",
    cancelTokenArr: [], // 取消请求token数组
    //导航数组，等权限控制做好通过后台读取
    menuTreeList: [],
    menuTreeListFlatten: [],
  },
  //order
  getters: {
    getOrderUrl: state => {
      return state.orderBaseUrl;
    },
    getCId: state => {
      return state.info.data.loginName;
    },
    getCMId: state => {
      return state.info.data.companyId;
    },
    getIsManage: state => {
      return state.info.data.isManager;
    },
    getCtype: state => {
      return state.info.customerType;
    },
    //order
    getOrderProduct: state => {
      return state.orderProduct;
    },
    getrealName: state => {
      return state.info.data.realName
    },
    getAddress: state => {
      return state.address
    },
    getCartlist: state => {
      return state.allCart
    }
  },
  mutations: {
    initState(state) {
      state.info = {};
      state.CCID = '';
      state.pos = {};
      state.position = [];
      state.revised = false;
      state.area_M = [];
      state.route = "";
      state.orderProduct = [];
      state.address = {};
      state.allCart = {
        wallpaper:[],
        soft:[]
      };
      state.LOADING = false;
      state.orderBaseUrl = "http://14.29.223.114:10250/yulan-order";
      state.cancelTokenArr = [];
      state.menuTreeList = [];
      state.menuTreeListFlatten = [];
    },
    getRoute(state, obj) {
      state.route = obj;
    },
    loginSuccess(state, obj) {
      state.info = obj;
    },
    getCCID(state, obj) {
      state.CCID = obj;
    },
    userCheck(state, obj) {
      state.info.data.userState = obj;
    },
    getPos(state, obj) {
      state.pos = obj;
    },
    getposition(state, obj) {
      state.position = obj;
    },
    agreementRevise(state, obj) {
      state.revised = obj;
    },
    setReviewed(state, obj) {
      state.reviewed = obj;
    },
    getarea_M(state, obj) {
      state.area_M = obj;
    },
    getYear(state, obj) {
      state.year = obj
    },
    //order
    setOrderProduct(state, allProduct) {
      state.orderProduct = allProduct
    },
    setAddress(state, curAddress) {
      state.address = curAddress
    },
    setcart(state, cartlist) {
      state.allCart = cartlist
    },
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    /*
  *设置菜单树
  */
    setMenuTreeList(state, data) {
      state.menuTreeList = data;
      state.menuTreeListFlatten = arrayChildrenFlatten(state.menuTreeList, []);
    },
    emptyMenuTreeList(state) {
      state.menuTreeList = [];
      state.menuTreeListFlatten = [];
    }
    //中断请求
    // pushToken (state, payload) {
    //   state.cancelTokenArr.push(payload.cancelToken)
    // },
    // clearToken ({ cancelTokenArr }) {
    //   cancelTokenArr.forEach(item => {
    //     console.log(item,'路由跳转取消请求')
    //   })
    //   cancelTokenArr = []
    // }
  },
  plugins: [createPersistedState()]
})

/*
  *多维数组数组扁平化
  */
function arrayChildrenFlatten(array, result) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (item.children && item.children.length > 0) {
      result.push(item);
      result = arrayChildrenFlatten(item.children, result);
    }
    else {
      result.push(item);
    }
  }
  return result;
}