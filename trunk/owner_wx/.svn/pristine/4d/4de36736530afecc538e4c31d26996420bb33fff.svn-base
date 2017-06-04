import { Component, OnInit } from "@angular/core";
import { marketService } from  '../market.service';
// import {goodsLabels} from "./goodsLabels/goodsLabels.component"
declare var mui: any;
declare var $: any;
declare var AMap: any;


@Component({
    selector: 'markcomponent',
    templateUrl: './marketInfo.component.html',
    styleUrls: ['./marketInfo.component.css'],
    providers: [marketService]
})
export class MarketInfo {
    market_title = "市场信息";
    public region: any;
    public OrderInfoList: Object[];
    public endTime: string;
    public page: number;
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
    public publishTime: string;
    public dtpicker: any;
    public map: any;
    //public userId: number;

    constructor(
        public service: marketService
    ) {
        this.OrderInfoList=[];
    }
//截取金额
    fmoney(s:any, n?:number) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
    ngOnInit() {

        let self = this;
        //定位
        var map, geolocation;
        //加载地图，调用浏览器定位服务
        this.map = map = new AMap.Map('', {
            resizeEnable: true
        });
        map.plugin(['AMap.Geolocation', 'AMap.DistrictSearch'], function() {
          console.log('定位插件、行政区插件');
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
            });

            //行政区划查询
            map.district = new AMap.DistrictSearch({//注意：需要使用插件同步下发功能才能这样直接使用
                subdistrict: 1,   //返回下一级行政区
                level: 'city',
                showbiz: false  //查询行政级别为 市
            });

            if(sessionStorage['lng']){//如果sessionStorage有当前位置,不定位
              self.updateOrderInfo();
              return;
            }
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            mui.toast('正在定位');
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息



        });
        //解析定位结果
        function onComplete(data) {
            $('.mui-toast-message').click();
            mui.toast('定位成功');
            sessionStorage['gpsLng'] = data.position.lng;
            sessionStorage['gpsLat'] = data.position.lat;
            //self.service.getOrderInfoLocationList([data.position.lng, data.position.lat]).then(data => self.OrderInfoList = data.data);
            self.updateOrderInfo();
            console.log([data.position.lng, data.position.lat]);

        }
        //解析定位错误信息
        function onError(data) {
            //mui.alert('定位失败', '', '重新定位', () => location.reload());
            mui.confirm('是否重新定位', '定位失败', ['是', '否'], (i) => {
                if (i.index == 0) {
                    location.reload()
                }
            });
        }


        // this.service.getRegion().then(data=>this.region=data.json()).then(()=>console.log(this.region));

        //this.userId = 5486;
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；

        });
        //初始化时间选择器
        this.dtpicker = new mui.DtPicker({
            "type": "date",
            "customData": {
                "Mon": [
                    { value: "Mon", text: "Day" }
                ]
            }
        });
        //添加删除按钮
        //$('<button data-id="btn-cancel" class="mui-btn">删除</button>')
        //    .insertAfter('.mui-dtpicker-header [data-id=btn-cancel]').
        //    on('click',()=>{
        //        console.log('click')
        //        this.publishTime = '';
        //        $("#updateTime").text('发布时间'+' ▼');
        //        this.updateOrderInfo();
        //        this.dtpicker.hide();
        //    });
        let scroll = mui('.mui-scroll-wrapper').scroll({
	         deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
         });

         $('.mui-scroll-wrapper').on('touchend',function(){
              let viewH =$(this).height(),//内容可见高度
              contentH =$(this).get(0).scrollHeight,//滚动当前距底部高度
              totalHeight =$(this).children().height(),//内容总高度
              scrollTop =$(this).scrollTop();//滚动高度
             if(contentH - viewH - scrollTop <= 70) { //到达底部100px时,加载新内容
             //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
               // 这里加载数据..
               self.nextPage();
               console.log('下拉加载');
               $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin:0 auto;').insertBefore('#scrollBottom');
               setTimeout(()=>$('.mui-pull-loading').remove(),2000);
             }else if(contentH-totalHeight >= 70){
               self.updateOrderInfo();
               console.log('上拉刷新');
               $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin:0 auto;').insertBefore('.mui-scroll>.data:first-of-type');
               setTimeout(()=>{
                 $('.mui-pull-loading').remove();
                 mui.toast('刷新成功!');
               },1000);

             }

        });

    }
    //货源地 & 目的地
    showMsg(): void {
        let self = this;
        let div: any = event.target;
        var picker = new mui.PopPicker({
            layer: 4
        });

        self.map.district.search('中国', function(status, result) {
            let pleaseSelect = [{ 'text': '请选择', 'level': '', 'lng': '', 'lat': '', 'adcode': '' }]
            if (status == 'complete') {
                //self.getData(result.districtList[0]);
                console.log(self.region);
                console.log(result);
                let region = result.districtList[0].districtList.map(i => 0 || { 'text': i.name.replace(/市$/, ''), 'level': i.level, 'adcode': i.adcode, 'lng': i.center.lng, 'lat': i.center.lat });
                picker.setData(pleaseSelect.concat(region));
                picker.show(onConfirm);
            }
        });
        picker.body.addEventListener('touchend', getRegion);

        function getRegion() {
            setTimeout(function() {
                let selectedItems = picker.getSelectedItems();
                let index = selectedItems[3].adcode && 3 || selectedItems[2].adcode && 2 || selectedItems[1].adcode && 1 || 0;
                let level = selectedItems[index].level;
                let adcode = selectedItems[index].adcode;
                let text = selectedItems[index].text;
                let selectedItem = picker.pickers[index].getSelectedItem();
                console.log(text, level, adcode);
                //以下情况不加载：如果当前picker为'请选择'、城市代码和之前相同、修改街道picker、当前picker的children有数据
                if (!level || adcode === picker.adcode || level === 'street' || selectedItem.children) return;
                picker.adcode = adcode;
                self.map.district.search(adcode, (status, result) => {
                    if (status === 'complete') {
                        console.log(text, '搜索', result);
                        let pleaseSelect = [{ 'text': '请选择', 'level': '', 'lng': '', 'lat': '', 'adcode': '' }]
                        let region = result.districtList[0].districtList.map(i => 0 || { 'text': i.name.replace(/市辖区$/, ''), 'level': i.level, 'adcode': i.adcode, 'lng': i.center.lng, 'lat': i.center.lat });
                        //picker.setData( pleaseSelect.concat(region) );
                        selectedItem.children = pleaseSelect.concat(region);
                        picker.setData(picker.pickers[0].items);
                        picker.pickers[index+1].setSelectedIndex(0);//将下一个picker调成'请选择'
                    }
                });
            }, 400);//等待滑动动画完成，延迟400ms执行
        }

        function onConfirm(selectedItems) {
            console.log(selectedItems);
            //点击确定后
            //获取当前选到的最小位置
            let index = selectedItems[3].adcode && 3 || selectedItems[2].adcode && 2 || selectedItems[1].adcode && 1 || 0;
            let cityName = selectedItems[index].text;
            sessionStorage['adLng'] = selectedItems[index].lng;
            sessionStorage['adLat'] = selectedItems[index].lat;
            switch (div.id) {
                case 'original':
                    self.sendCity = selectedItems[0].text;
                    self.sendProvince = selectedItems[1].text;
                    self.sendCounty = selectedItems[2].text;
                    self.sendTown = selectedItems[3].text;
                    cityName = cityName&&cityName!=='请选择' ? cityName + ' ▲' : '货源地 ▼';
                    break;
                case 'destination':
                    self.receiveCity = selectedItems[0].text;
                    self.receiveProvince = selectedItems[1].text;
                    self.receiveCounty = selectedItems[2].text;
                    self.receiveTown = selectedItems[3].text;
                    cityName = cityName&&cityName!=='请选择' ? cityName + ' ▲' : '目的地 ▼';
            }

            //document.getElementById("original").innerHTML=document.getElementById("original").innerHTML.replace(/^[\w\W]+ </,SelectedItem[3]+' <');
            div.innerHTML = cityName;//div.innerHTML.replace(/^[\w\W]+ </, cityName + ' <');

            self.updateOrderInfo();
        }
    }
    //时间
    showMsg3(): void {
        this.dtpicker.show(function(e) {
            console.log(e.value);
            document.getElementById("updateTime").innerHTML = e.value + ' ▲';
            this.publishTime = e.value;
            this.updateOrderInfo();
        }.bind(this));
    }

    updateOrderInfo(page=1): void {
        let pos = [
            sessionStorage['adLng'] || sessionStorage['gpsLng'] ,
            sessionStorage['adLat'] || sessionStorage['gpsLat']
        ];
        this.service.getOrderInfoLocationList(pos, this.publishTime, page, 10, this.receiveCity, this.receiveCounty, this.receiveProvince, this.receiveTown, this.sendCity, this.sendCounty, this.sendProvince, this.sendTown)
            .then(data => {
                $('.mui-scroll-wrapper').css('margin-top',$('.mui-content').offset().top-20);//设置距顶部高度
                if(page!==1 && data.data.length===0) {
                    mui.toast('已经到底了');
                }
                if(page===1) {//如果要读取第一页内容，清空之前内容
                    this.OrderInfoList.length = 0;
                }
                this.OrderInfoList.push(...data.data);
                console.log(this.OrderInfoList);
            });
            //.then(data => console.log(data));
    }
    //Loading() {
    //
    //  localStorage.setItem("data", '{"userId":93,"accessToken":"eef07f4340e7439dbfaf0a3bc13da9e9","mobile":"13244478678","headImg":null,"walletCode":null,"authed":0}');
    //  alert(localStorage.getItem("data"))
    //}
    // refresh(){
    //   this.updateOrderInfo();
    // }
    nextPage(){
      this.page=this.page?this.page+1:2;
      this.updateOrderInfo(this.page);
    }
    //public headImgUrl="http://clx-dev.oss-cn-beijing.aliyuncs.com/";
}
