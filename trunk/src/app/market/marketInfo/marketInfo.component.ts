import { Component, OnInit } from "@angular/core";
import { marketService } from  '../market.service';
// import {goodsLabels} from "./goodsLabels/goodsLabels.component"
declare var mui: any;
declare var $: any;
//declare var AMap: any;

@Component({
    selector: 'markcomponent',
    templateUrl: './marketInfo.component.html',
    styleUrls: ['./marketInfo.component.css'],
    providers: [marketService]
})
export class MarketInfo {




    market_title = "市场信息";
    public region: any;
    public OrderInfoList: Array<object>;

    public endTime: string;
    public page: string;
    public pageSize: string;
    public receiveCity: string;
    public receiveCounty: string;
    public receiveProvince: string;
    public receiveTown: string;
    public residueBegin: string;
    public residueEnd: string;
    public sendCity: string;
    public sendCounty: string;
    public sendProvince: string;
    public sendTown: string;
    public status: string;
    public userId: number;
 
    constructor(
        public service: marketService
    ) { }

    ngOnInit() {
      //let mapObj = new AMap.Map('iCenter');
      //  mapObj.plugin('AMap.Geolocation', function () {
      //     let geolocation = new AMap.Geolocation({
      //          enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      //          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      //          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      //          showButton: true,        //显示定位按钮，默认：true
      //          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      //          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      //          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      //          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      //          zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //      });
      //      mapObj.addControl(geolocation);
      //      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      //      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      //  });

        this.updateOrderInfo();

        this.region = [{
            value: '',
            text: '请选择',
        }, {
                value: 'beijing',
                text: '北京',
            }, {
                value: 'hebei',
                text: '河北省',
            }, {
                value: 'anhui',
                text: '安徽省',
            }
            , {
                value: 'fujian',
                text: '福建省',
            }
            , {
                value: 'gansu',
                text: '甘肃省',
            }
            , {
                value: 'guangdong',
                text: '广东省',
            }
            , {
                value: 'guangxi',
                text: '广西壮族自治区',
            }
            , {
                value: 'guizhou',
                text: '贵州省',
            }
            , {
                value: 'henan',
                text: '河南省',
            }
            , {
                value: 'hainan',
                text: '海南省',
            }
            , {
                value: 'heilongjiang',
                text: '黑龙江省',
            }
            , {
                value: 'hubei',
                text: '湖北省',
            }
            , {
                value: 'hunan',
                text: '湖南省',
            }
            , {
                value: 'jilin',
                text: '吉林省',
            }
            , {
                value: 'jiangsu',
                text: '江苏省',
            }
            , {
                value: 'jiangxi',
                text: '江西省',
            }
            , {
                value: 'liaoning',
                text: '辽宁省',
            }
            , {
                value: 'neimenggu',
                text: '内蒙古自治区',
            }
            , {
                value: 'ningxia',
                text: '宁夏回族自治区',
            }
            , {
                value: 'qinghai',
                text: '青海省',
            }
            , {
                value: 'shandong',
                text: '山东省',
            }
            , {
                value: 'shanxi_taiyuan',
                text: '山西省',
            }
            , {
                value: 'shanxi_xian',
                text: '陕西省',
            }
            , {
                value: 'shanghai',
                text: '上海市',
            }
            , {
                value: 'sichuan',
                text: '四川省',
            }
            , {
                value: 'tianjin',
                text: '天津市',
            }
            , {
                value: 'xizang',
                text: '西藏自治区',
            }
            , {
                value: 'xinjiang',
                text: '新疆维吾尔自治区',
            }
            , {
                value: 'yunnan',
                text: '云南省',
            }
            , {
                value: 'zhejiang',
                text: '浙江省',
            }
            , {
                value: 'chongqing',
                text: '重庆市',
            }
        ];
        // this.service.getRegion().then(data=>this.region=data.json()).then(()=>console.log(this.region));

        this.userId = 5486;
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；

        });
        //上拉加载下拉刷新
        // mui.init({
        //     pullRefresh: {
        //         container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
        //         up: {
        //             height: 1,//可选.默认50.触发上拉加载拖动距离
        //             auto: true,//可选,默认false.自动上拉加载一次
        //             contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        //             contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        //             callback: function() {  } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        //         }
        //     }
        // });
        // function Pullup() {
        //
        //     mui('#refreshContainer').pullRefresh().endPullupToRefresh();
        // }



    }
    //货源地 & 目的地
    showMsg(): void {
        let div: any = event.target;
        var picker = new mui.PopPicker({
            layer: 4
        });
        picker.setData(this.region);
        picker.index = 0;
        //picker.pickers[0].setSelectedIndex(3);
        picker.show(function(SelectedItem) {
            //点击确定后
            let cityName = '';
            if(typeof SelectedItem[3] ==='object'){
                //没有选到有效地址
                cityName = (div.id === 'original') ? '货源地' : '目的地';
                this.sendCity = this.sendCounty = this.receiveCity = this.receiveCounty = '';
            }

            else switch (div.id) {
                case 'original':
                    this.sendCity = SelectedItem[0].text;
                    this.sendCounty = SelectedItem[3];
                    cityName = SelectedItem[3];
                    break;
                case 'destination':
                    this.receiveCity = SelectedItem[0].text;
                    this.receiveCounty = SelectedItem[3];
                    cityName = SelectedItem[3];
            }

            //document.getElementById("original").innerHTML=document.getElementById("original").innerHTML.replace(/^[\w\W]+ </,SelectedItem[3]+' <');
            div.innerHTML = div.innerHTML.replace(/^[\w\W]+ </, cityName + ' <');

            this.updateOrderInfo()
        }.bind(this));
        //监听picker滚动，加载市数据
        picker.body.addEventListener('touchend', this.getRegion(picker))
    }
    getRegion(picker) {
        return () =>
            setTimeout(function(event) {
                //如果第一个picker（城市）未更改或value值不存在直接结束运行
                let index = picker.pickers[0].getSelectedIndex();
                if (index === picker.index || !this.pickers[0].getSelectedValue()) return;
                //显示正在加载
                picker.pickers[0].items[index].children = [{ text: '加载中' }];
                picker.setData(picker.pickers[0].items);
                mui.get(`http://clx-dev.oss-cn-beijing.aliyuncs.com/province/${this.pickers[0].getSelectedValue()}.json`, {},
                    function(data) {
                        //获得服务器响应
                        //console.log(data)
                        let index = picker.pickers[0].getSelectedIndex();
                        picker.index = index;
                        picker.pickers[0].items[index].children = JSON.parse(data.replace(/value/g, 'children').replace(/name/g, 'text'))
                        console.log(picker.pickers[0].items[index]);
                        picker.setData(picker.pickers[0].items)
                    }, 'text');
            }.bind(picker), 400)//等待滑动动画完成，延迟400ms执行
    }
    //时间
    showMsg3(): void {
        var dtpicker = new mui.DtPicker({
            "type": "date",
            "customData": {
                "Mon": [
                    { value: "Mon", text: "Day" }
                ]
            }
        });
        dtpicker.show(function(e) {
            console.log(e.value);
            document.getElementById("updateTime").innerHTML = e.value;
        });
    }


    updateOrderInfo(): void {
        let params: any = {};
        if (this.userId) params.userId = this.userId;
        if (this.sendCity) params.sendCity = this.sendCity;
        if (this.sendCounty) params.sendCounty = this.sendCounty;
        if (this.receiveCity) params.receiveCity = this.receiveCity;
        if (this.receiveCounty) params.receiveCounty = this.receiveCounty;
        console.log(params);
        this.service.getOrderInfoListByParam(params).then(data => this.OrderInfoList = data.json().data).then(data => console.log(data));
    }

}
