/**
 * by郭进亮
 */
import {environment} from '../environments/environment';
export class Api{

  // public static apiHost = "http://www.clxkj.cn:8088";
  // public static apiHost = "http://192.168.1.253:80";//货主端  建新
  // public static apiHost = "http://192.168.1.230:80";//货主端  崔
  //public static apiWallet = "http://www.clxkj.cn:8301";
  //public static apifile = "http://www.clxkj.cn:8201";
  public static messageService = "/message-service";
  public static walletService = "/payment-service";
  public static userService= "/user-service";
  public static orderService = "/order-service";
  public static traceService = "/trace-service";
  public static paymentService = "/payment-service";
  public static bankFindList = environment.apiHost + Api.paymentService + "/bankCard/findList";
  // 绑定快捷支付
  public static binding = environment.apiHost + Api.paymentService + "/cpcn/binding";
  // 查询快捷支付
  public static findFasterList = environment.apiHost + Api.paymentService + "/bankCard/findFasterList";
  //充值
  public static fasterPay = environment.apiHost + Api.paymentService + "/cpcn/fasterPay";
  public static fasterPayVerify = environment.apiHost + Api.paymentService + "/cpcn/fasterPayVerify";
  //提现
  public static settlement = environment.apiHost + Api.paymentService + "/cpcn/settlement";
  // 微信充值http://47.92.136.150:8301/payment-service/recharage/weixin
  // public static weiXin =  environment.apiHost + Api.paymentService + "/recharage/weixin";
  //用户注册
  public static register = environment.apiHost + Api.userService + "/owner/user/register";
  //企业认证
  public static submitAuth = environment.apiHost + Api.userService + "/owner/auth/submitAuth";

  //用户注册验证码  没有权限
  public static captchaReg = environment.apiHost + Api.userService + "/owner/user/captchaReg";
  //查询个人信息
  public static myself = environment.apiHost + Api.userService + "/owner/user/myself";
  //查看认证信息接口
  public static getAuthMessage = environment.apiHost + Api.userService + "/owner/auth/getAuthMessage";
  //修改认证信息接口
  public static updateAuthMessage = environment.apiHost + Api.userService + "/owner/auth/updateAuthMessage";
  //设置中的修改手机号码
  public static changeMobile = environment.apiHost + Api.userService + "/owner/user/changeMobile";
  //设置中的修改密码
  public static changePwd = environment.apiHost + Api.userService + "/owner/user/changePwd";
  //查询黑名单
  public static blacklist = environment.apiHost + Api.userService + "/owner/blackList/findList";
  //移除黑名单
  public static removeBlackList = environment.apiHost + Api.userService + "/owner/blackList";
  //移除黑名单 根据司机id
  public static removeByDriverId = environment.apiHost + Api.userService + "/owner/blackList/removeByDriverId";
  //查询是否为黑名单
  public static isBlackList = environment.apiHost + Api.userService + "/owner/blackList/countOwnerBlackById";
  //查询司机详情 司机端
  public static carUserInfo = environment.apiHost + Api.userService + "/driver/user/userInfo";
  //获取员工列表
  public static getOwnerStaffMessage = environment.apiHost + Api.userService + "/owner/staff/getOwnerStaffMessage";
  //删除员工列表
  public static deleteOwnerStaff = environment.apiHost + Api.userService + "/owner/staff/deleteOwnerStaff";
  //验证手机号
  public static checkMobile = environment.apiHost + Api.userService + "/owner/user/checkMobile";
  //添加员工
  public static submitOwnerStaff = environment.apiHost + Api.userService + "/owner/staff/submitOwnerStaff";
  //《货主端》我的收货。。。根据收货人id查询收货列表 /order-service/order/child/getOrderChildListByReceiveId
  public static getOrderChildListByReceiveId = environment.apiHost + Api.orderService + "/order/child/getOrderChildListByReceiveId";
  //《货主端》根据发货人id查询发货列表 /order-service/order/child/getOrderChildListByReceiveId
  public static mygetOrderChildListBySendId = environment.apiHost + Api.orderService + "/order/child/getOrderChildListBySendId";
  //用户验证码 有权限
  public static captcha = environment.apiHost + Api.userService + "/owner/user/captcha";
  /*
   * 业务统计
   * */
  //获取订单次数
  public static countOrders = environment.apiHost + Api.orderService + "/order/statistics/countOrders";
  //发布货源列表
  public static countPublishOrder = environment.apiHost + Api.orderService + "/order/statistics/countPublishOrder";
  //查询已完成订单列表
  public static countOrderChildsToList = environment.apiHost + Api.orderService + "/order/statistics/countOrderChildsToList";
  // 已经运送的货物数量列表，已支付运费的列表
  public static countCompleteOrderToList = environment.apiHost + Api.orderService + "/order/statistics/countCompleteOrderToList";
  // 《货主端》根据货主id获取各种订单的次数GET /order-service/order/child/getOrderChildListByOwnerId
  public static getOrderChildListByOwnerIdChild = environment.apiHost + Api.orderService + "/order/child/getOrderChildListByOwnerId";
  /*
   * 收货地址管理
   * */
  //查询收/发货地址
  public static addreFindList = environment.apiHost + Api.userService + "/owner/address/findList";
  //设置默认收/发货地址
  public static addreSetDefault = environment.apiHost + Api.userService + "/owner/address/setDefault";
  //删除收/发货地址
  public static deleteAddres = environment.apiHost + Api.userService + "/owner/address";
 //根据ID查询地址
  public static getAddres = environment.apiHost + Api.userService + "/owner/address";
  //修改收/发货地址
  public static putAddres = environment.apiHost + Api.userService + "/owner/address";
  //查询默认收发货地址
  public static findDefault = environment.apiHost + Api.userService + "/owner/address/findDefault";
  //添加意见反馈
  public static addFeedBack = environment.apiHost + Api.userService + "/owner/feedBack";
  //查询意见反馈
  public static optionFindList = environment.apiHost + Api.userService + "/owner/feedBack/findList";
  //获取订单状态根据订单编码
  public static getStatusByOrderNo = environment.apiHost + Api.orderService + "/order/info/getStatusByOrderNo?orderNo=";
  //创建货源
  public static submitOrderInfo = environment.apiHost + Api.orderService + "/order/info/submitOrderInfo";
  //其他描述标签
  public static getSystemLabelByType = environment.apiHost + Api.userService + "/system/label/getSystemLabelByType";
  /*
   * 我的货源
   * */
  //查询货源列表
  public static getOrderInfoListByUserId = environment.apiHost + Api.orderService + "/order/info/getOrderInfoListByUserId";
 //根据订单编号查询
  public static getOrderInfoByOrderNo = environment.apiHost + Api.orderService + "/order/info/getOrderInfoByOrderNo";
  //根据主单编号取消主单剩余货源 /order-service/order/info/cancel/
  public static cancelInfoByMainOrder = environment.apiHost + Api.orderService + "/order/info/cancel/";
  //销煤主单取消
  //http://192.168.1.231:8100/order-service/order/sale/cancel/all/compensation/11111111111
  public static compensation1 =  environment.apiHost + Api.orderService + "/order/sale/cancel/all/compensation/"
  //《货主端》根据主单编号获取取消全部货单赔偿金
  public static compensationInfoByMainOrder = environment.apiHost + Api.orderService + "/order/info/cancel/all/compensation/";
 //《货主端》根据子单编号获取取消子订单的赔偿金GET
  public static compensationOwnerCancel = environment.apiHost + Api.orderService + "/order/child/owner-cancel/compensation/";
  //《货主端》根据子单编号取消子订单, 返回赔偿金额PUT /order-service/order/child/owner-cancel/{childNo}
  public static orderChildOwnerCancel = environment.apiHost + Api.orderService + "/order/child/owner-cancel/";

//PUT /order-service/order/info/group/cancel/{orderNo}
//《货主端》根据主单编号分组取消未装车订单及剩余货单
  public static fenzuCancelorderChildOwner = environment.apiHost + Api.orderService + "/order/info/group/cancel/";



  //发布货源
  public static publishOrderInfo = environment.apiHost + Api.orderService + "/order/info/publishOrderInfo";
  //销煤
  public static submitOrder = environment.apiHost + Api.orderService + "/order/sale/submitOrderInfo"
  //根据不同条件查看货源列表 货源明细
  public static getOrderInfoLocationList = environment.apiHost + Api.orderService + "/order/info/getOrderInfoLocationList";
  //查看子单列表根据不同条件  收货历史
  public static getOrderChildListByParam = environment.apiHost + Api.orderService + "/order/child/getOrderChildListByParam";
  //货源明细
  public static getOrderInfoListByParam = environment.apiHost + Api.orderService + "/order/info/getOrderInfoListByParam";


  //查询钱包余额
  public static wallet =environment.apiHost +Api.walletService +"/wallet";
  //查询银行卡列表
  public static bankCardFindList =environment.apiHost +Api.walletService +"/bankCard/findList";
  //添加银行卡
  public static addbankCard =environment.apiHost +Api.walletService +"/bankCard";
  //移除银行卡
  public static unBinding =environment.apiHost +Api.walletService +"/bankCard/unBinding";
  //密码重置第一步
  public static walletCheckMobile =environment.apiHost +Api.walletService +"/wallet/checkMobile";
  // 密码重置第二步
  public static walletCheckBankCard =environment.apiHost +Api.walletService +"/wallet/checkBankCard";
  // 密码重置第三步
  public static walletResetPwd =environment.apiHost +Api.walletService +"/wallet/resetPwd";
  //查询收支明细
  public static findList =environment.apiHost +Api.walletService +"/trade/findList";
  //按日期查询收支明细
  public static findDateList =environment.apiHost +Api.walletService +"/trade/findDateList";
  //查询收支详情
 public static tradeDetails =environment.apiHost +Api.walletService +"/trade";
  //修改交易密码
  public static mychangePwd =environment.apiHost +Api.walletService +"/wallet/changePwd";


  //扫一扫接口调用
  //http://47.92.136.150:8001/user-service/owner/user/getWeixinJsApiSign?url=
  public static getWeixinJsApiSign = environment.apiHost + Api.userService + "/owner/user/getWeixinJsApiSign";
  //扫一扫查询全部信息
  //http://47.92.136.150:8101/order-service/order/child/getOrderByChildNo?childNo=eewewwe&userId=124
  public static getOrderByChildNo = environment.apiHost + Api.orderService + "/order/child/getOrderByChildNo";
  public static getOrderDetailsByChildNo = environment.apiHost + Api.orderService + "/order/child/getOrderDetailsByChildNo";
  //public static getOrderDetailsByChildNo = Api.apiHost + Api.orderService + "/order/child/getOrderDetailsByChildNo";
  //http://47.92.136.150:8101/order-service/order/child/ownerConfirmTruck?userId=77&childNo=22017051293782379&param=1
  //货主确认收货前，确认车辆
  public static ownerConfirmTruck = environment.apiHost + Api.orderService + "/order/child/ownerConfirmTruck";
  //货主拒绝收货
  public static refuseLoad =  environment.apiHost + Api.orderService + "/order/child/refuseLoad";
  //货主查看拒绝原因
  //http://192.168.1.230:8100/order-service/order/child/getCancelReasonByChildNo?childNo=12017051039071631
  public static getCancelReasonByChildNo = environment.apiHost +  Api.orderService + "/order/child/getCancelReasonByChildNo";
  //货主确认收货
  public static updateConfirmUnLoadByChildNo = environment.apiHost + Api.orderService +"/order/child/updateConfirmUnLoadByChildNo";
  //确认装货
  public static updateConfirmLoadByChildNo = environment.apiHost + Api.orderService +"/order/child/updateConfirmLoadByChildNo";
  //上传图片
  public static base64Image = environment.apiHost + Api.messageService +"/file/base64Image";
  public static base64Avatar = environment.apiHost + Api.messageService +"/file/base64Avatar";
  // banner图
  public static list = environment.apiHost + Api.messageService +"/banner/list";
  //提交异常信息
  public static exception = environment.apiHost + Api.orderService +"/orderException/exception";
  //货主确认收货后得到司机状态
  public static getOrderChildByChildNo = environment.apiHost + Api.orderService+"/order/child/getOrderChildByChildNo";
  //货主添加赔偿金
  public static compensation =  environment.apiHost + Api.orderService+"/compensation";
  //货主提交评价
  //http://47.92.136.150:8001/user-service/driver/evaluate/submitDriverEvaluate
  //http://47.92.136.150:8001/user-service/owner/evaluate/submitOwnerEvaluate
  public static submitDriverEvaluate  =  environment.apiHost + Api.userService+"/driver/evaluate/submitDriverEvaluate";
  //轨迹查询接口
  public static sparsePointRecords = environment.apiHost + Api.traceService +'/pointRecords';
  //http://192.168.1.230:8100/order-service/order/child/getStatusByChildNo?childNo=12017051039071631
  //根据订单编码获取订单状态
  public static getStatusByChildNo = environment.apiHost + Api.orderService + "/order/child/getStatusByChildNo";
  //http://192.168.1.231:8200/message-service/newestSystemMessage?receiver=4411135645456466&receiverRole=driver
  public static newestSystemMessage  = environment.apiHost + Api.messageService + "/newestSystemMessage";
  //http://192.168.1.231:8200/message-service/messages?receiver=124&receiverRole=owner&type=-1&lastId=12333&pageSize=5
  public static messages = environment.apiHost + Api.messageService + '/messages';
  //设置密码 http://47.92.136.150:8301/payment-service/wallet/setPwd
  public static setPwd = environment.apiHost + Api.walletService + '/wallet/setPwd';
  //查看评价 http://192.168.1.230:8001/user-service/driver/evaluate/getDriverEvaluateById?userId=136&fromId=191
  public static getDriverEvaluateById = environment.apiHost + Api.userService + "/driver/evaluate/getDriverEvaluateById";
  //获取卸货备注和图片http://47.92.136.150:8101/order-service/order/child/getOwnerRemarkByChildNo?childNo=22017061476015203
  public static getOwnerRemarkByChildNo =  environment.apiHost + Api.orderService + "/order/child/getOwnerRemarkByChildNo";
  //销售煤接口，添加皮重毛重 http://192.168.1.230:8100/order-service/order/childSale/updateConfirmUnLoadByChildNo
  public static updateConfirmUnLoadByChildNo1 = environment.apiHost + Api.orderService +"/order/childSale/updateConfirmUnLoadByChildNo";
  //销煤中的子单取消
  //http://47.92.133.76:8101/order-service/order/childSale/owner-cancel/22017051652767910
  public static ownerCancel =  environment.apiHost + Api.orderService +"/order/childSale/owner-cancel";
}
