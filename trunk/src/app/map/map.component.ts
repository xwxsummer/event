
import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var AMap: any;
let map: any;
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']

})
export class Map {
    constructor(public router: Router) {
    }
    ngOnInit() {
        //var map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            var str = ['定位成功'];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if (data.accuracy) {
                str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            document.getElementById('tip').innerHTML = str.join('<br>');
        }
        //解析定位错误信息
        function onError(data) {
            document.getElementById('tip').innerHTML = '定位失败请开启定位';
        }


        //下级行政单位列表生成
        AMap.service('AMap.DistrictSearch', function() {//回调函数
            //实例化DistrictSearch
            var districtSearch = new AMap.DistrictSearch();
            //TODO: 使用districtSearch对象调用行政区查询的功能
            districtSearch.search('中国', function(status, result) {
              console.log(result);
                var subDistricts = result.districtList[0].districtList;
                var select: any = document.getElementById('subDistricts');
                for (var i = 0; i < subDistricts.length; i += 1) {
                    var name = subDistricts[i].name;
                    var option = document.createElement('option');
                    option.value = option.innerHTML = name;
                    option.dataset['citycode'] = subDistricts[i].citycode;
                    select.appendChild(option);
                }
                select.onchange = function() {
                   map.setCity(this.value);
                 };
                select.value = subDistricts[0].name;
                select.onchange();
            })
        });
        //点击显示地址
        AMap.plugin('AMap.Geocoder',function(){
          var geocoder = new AMap.Geocoder({
              city: "010"//城市，默认：“全国”
          });
          var marker = new AMap.Marker({
              map:map,
              bubble:true
          });
        map.on('click',function(e){
          marker.setPosition(e.lnglat);
            document.getElementById('keyword')['value'] = e.lnglat;
            document.getElementById('myvalue')['value'] = e.lnglat;
            geocoder.getAddress(e.lnglat,function(status,result){
            if(status=='complete'){
               document.getElementById('keyword')['value'] = result.regeocode.formattedAddress;
               console.log(11111111111); 
            }
                
            })
      })

  });
  //搜索关键字


        AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
            var autoOptions = {
                city: "citycode", //城市，默认全国
                input: "keyword"//使用联想输入的input的id
            };
           var autocomplete= new AMap.Autocomplete(autoOptions);
            var placeSearch = new AMap.PlaceSearch({
                city:'citycode',
                map:map
            });
            AMap.event.addListener(autocomplete, "select", function(e){
                //TODO 针对选中的poi实现自己的功能
                placeSearch.search(e.poi.name)
            });
        });
        //var map = new AMap.Map("container", {
        //    resizeEnable: true,
        //    center: [116.397428, 39.90923],//地图中心点
        //    zoom: 13 //地图显示的缩放级别
        //});
        ////构造路线导航类
        //var driving = new AMap.Driving({
        //    map: map,
        //    panel: "panel"
        //});
        //// 根据起终点名称规划驾车导航路线
        //driving.search([
        //    {keyword: '北京市地震局(公交站)',city:'北京'},
        //    {keyword: '亦庄文化园(地铁站)',city:'北京'}
        //]);









    }

    search() {
        //搜索
        AMap.service(["AMap.PlaceSearch"], function() {
            let searchBox: any = event.target,
            city:any = document.getElementById('subDistricts')["selectedOptions"][0],
            citycode = city.dataset['citycode'] || "";
            console.log(citycode)
            new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                city: citycode, //城市
                map: map//,
                //panel: "panel"
            }).search(searchBox.value, function(status, result) {

            });
        });

    }







}
