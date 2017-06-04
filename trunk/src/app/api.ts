/**
 * by于婷
 */
export class Api{
  //http://www.clxkj.cn:8001
  //http://www.clxkj.cn:8101
  //http://192.168.31.216:8001
  //http://192.168.31.216:8010
  public static apiHost = "http://www.clxkj.cn:8001";//货主端

  //public  static apiOrder = "http://www.clxkj.cn:8101";
  //public  static apiOrder = "http://192.168.1.166:8100";//崔
  public static apiOrder = "http://www.clxkj.cn:8101";
  public static apiWallet = "http://www.clxkj.cn:8301";
  public static apifile = "http://www.clxkj.cn:8201";
  public static messageService ="/message-service";
  public static walletService ="/payment-service";

  public static userService="/user-service";
  public static orderService = "/order-service";

   /*
 // //请求头部
 //public static headers = new Headers({'Content-Type':'application / json',"userId":null,"accessToken":null});
 //public static options = new RequestOptions（{headers:headers}）;
 //  * 用户接口
   * */
  //用户注册
  public static register = Api.apiHost + Api.userService + "/owner/user/register";
  //企业认证
  public static submitAuth = Api.apiHost + Api.userService + "/owner/auth/submitAuth";
  //用户注册验证码  没有权限
  public static captchaReg = Api.apiHost + Api.userService + "/owner/user/captchaReg";
  //查询个人信息
  public static myself = Api.apiHost + Api.userService + "/owner/user/myself";
  //查看认证信息接口
  public static getAuthMessage = Api.apiHost + Api.userService + "/owner/auth/getAuthMessage";
  //修改认证信息接口
  public static updateAuthMessage = Api.apiHost + Api.userService + "/owner/auth/updateAuthMessage";
  //设置中的修改手机号码
  public static changeMobile = Api.apiHost + Api.userService + "/owner/user/changeMobile";
  //设置中的修改密码
  public static changePwd = Api.apiHost + Api.userService + "/owner/user/changePwd";
  //查询黑名单
  public static blacklist = Api.apiHost + Api.userService + "/owner/blackList/findList";
  //移除黑名单
  public static removeBlackList = Api.apiHost + Api.userService + "/owner/blackList";
  //查询司机详情 司机端
  public static carUserInfo = Api.apiHost + Api.userService + "/driver/user/userInfo";
  //获取员工列表
  public static getOwnerStaffMessage = Api.apiHost + Api.userService + "/owner/staff/getOwnerStaffMessage";
  //删除员工列表
  public static deleteOwnerStaff = Api.apiHost + Api.userService + "/owner/staff/deleteOwnerStaff";
  //验证手机号
  public static checkMobile = Api.apiHost + Api.userService + "/owner/user/checkMobile";
  //添加员工
  public static submitOwnerStaff = Api.apiHost + Api.userService + "/owner/staff/submitOwnerStaff";
  //用户验证码 有权限
  public static captcha = Api.apiHost + Api.userService + "/owner/user/captcha";
  // public static region = '/region.json';


  /*
   * 业务统计
   * */
  //获取订单次数
  public static countOrders = Api.apiOrder + Api.orderService + "/order/statistics/countOrders";
  //发布货源列表
  public static countPublishOrder = Api.apiOrder + Api.orderService + "/order/statistics/countPublishOrder";
  //查询已完成订单列表
  public static countOrderChildsToList = Api.apiOrder + Api.orderService + "/order/statistics/countOrderChildsToList";
  // 已经运送的货物数量列表，已支付运费的列表
  public static countCompleteOrderToList = Api.apiOrder + Api.orderService + "/order/statistics/countCompleteOrderToList";



  /*
   * 收货地址管理
   * */

  //查询收/发货地址
  public static addreFindList = Api.apiHost + Api.userService + "/owner/address/findList";
  //设置默认收/发货地址
  public static addreSetDefault = Api.apiHost + Api.userService + "/owner/address/setDefault";
  //删除收/发货地址
  public static deleteAddres = Api.apiHost + Api.userService + "/owner/address";
 //根据ID查询地址
  public static getAddres = Api.apiHost + Api.userService + "/owner/address";
  //修改收/发货地址
  public static putAddres = Api.apiHost + Api.userService + "/owner/address";
  //查询默认收发货地址
  public static findDefault = Api.apiHost + Api.userService + "/owner/address/findDefault";
  //添加意见反馈
  public static addFeedBack = Api.apiHost + Api.userService + "/owner/feedBack";
  //查询意见反馈
  public static optionFindList = Api.apiHost + Api.userService + "/owner/feedBack/findList";
  //创建货源
  public static submitOrderInfo = Api.apiOrder + Api.orderService + "/order/info/submitOrderInfo";


  /*
   * 我的货源
   * */

  //查询货源列表
  public static getOrderInfoListByUserId = Api.apiOrder + Api.orderService + "/order/info/getOrderInfoListByUserId";
 //根据订单编号查询
  public static getOrderInfoByOrderNo = Api.apiOrder + Api.orderService + "/order/info/getOrderInfoByOrderNo";
  //查看子单列表根据不同条件  收货历史
  public static getOrderChildListByParam = Api.apiOrder + Api.orderService + "/order/child/getOrderChildListByParam";




  //发布货源
  public static publishOrderInfo = Api.apiOrder + Api.orderService + "/order/info/publishOrderInfo";
  //根据不同条件查看货源列表 货源明细
  public static getOrderInfoListByParam = Api.apiOrder + Api.orderService + "/order/info/getOrderInfoListByParam";
  //查询钱包余额
  public static wallet =Api.apiWallet +Api.walletService +"/wallet";

  //查询银行卡列表
  public static bankCardFindList =Api.apiWallet +Api.walletService +"/bankCard/findList";
  //添加银行卡
  public static addbankCard =Api.apiWallet +Api.walletService +"/bankCard";

  //查询收支明细
  public static findList =Api.apiWallet +Api.walletService +"/trade/findList";


  //扫一扫查询全部信息
  public static getOrderDetailsByChildNo = Api.apiOrder + Api.orderService + "/order/child/getOrderDetailsByChildNo";
  //拒绝收货

  //确认信息
  public static updateConfirmLoadByChildNo = Api.apiOrder + Api.orderService +"/order/child/updateConfirmLoadByChildNo";
  //上传图片
  public static base64Image = Api.apifile + Api.messageService +"/file/base64Image";

}
