import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
declare let mui: any;
declare let AMap: any;
declare let AMapUI: any;
declare let $: any;
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']

})
export class Map implements OnInit {
    public map: Map;
    constructor(
        public router: Router,
        public routeInfo: ActivatedRoute//页面间传值
    ) {
    }
    ngOnInit() {
        let self = this;
        //初始化地图
        let map = new AMap.Map("container", {
            resizeEnable: true,
            zoom: 12,
            center: [116.397428, 39.90923]
        });
        this.map = map;
        map.plugin('AMap.CitySearch', function() {
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {
                if (status === 'complete' && result.info === 'OK' &&
                    result && result.city && result.bounds) {
                    //地图显示当前城市
                    map.setBounds(result.bounds);
                    console.log('您当前所在城市：' + result.city);
                }
            })
        });
        //创建一个隐藏的map用来定位
        let posMap = new AMap.Map('', {});
        //高精度定位当前位置
        posMap.plugin('AMap.Geolocation', function() {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: false,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB',
                //showCover:false
            });
            setTimeout(() => {
                posMap.addControl(geolocation);
                //map.addControl(geolocation);
                geolocation.getCurrentPosition();
                mui.toast('正在定位');
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            }, 1000);

        });
        //解析定位结果
        function onComplete(data) {
            if ($('#container').length === 0) return;//如果地图不存在,不执行
            mui.toast('定位成功');
            map.setZoom(15);
            map.setCenter(data.position);
            map.lnglat = [data.position.getLng(), data.position.getLat()];
            let str = ['定位成功'];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if (data.accuracy) {
                str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            console.log(str.join('\n'));
            //document.getElementById('tip').innerHTML = str.join('<br>');
        }
        //解析定位错误信息
        function onError(data) {
            //document.getElementById('tip').innerHTML = '定位失败请开启定位';
        }

        //搜索附近地点
        AMap.service(["AMap.PlaceSearch"], function() {
            map.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 4,
                city: "citycode", //城市010
                //map: map,
                count: 4,
                panel: "panel",//结果显示面板
                extensions: "base",
                showCover: false
            });
        });

        //拖拽地图选址
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            let positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            positionPicker.on('success', function(positionResult) {
                console.log(positionResult);
                $('#panel').css('display', 'none');//暂时隐藏结果面板,加载完成后显示
                map.lnglat = [positionResult.position.lng, positionResult.position.lat]; //当前中心点坐标
                map.placeSearch.searchNearBy('', map.lnglat, 200, function(status, result) {//搜索当前中心点附近的地址
                    map.result = result;
                    console.log(result);
                    $('.poi-more').remove();//删除出错的详情信息点
                    $('.amap_lib_placeSearch_page').remove();//删除未使用的下一页按钮
                    map.getAddress(map.lnglat);//通过经纬度查询当前地址信息
                });
            });
            positionPicker.on('fail', function(positionResult) {
            });
            positionPicker.start();
            //map.panBy(0, 1);
            //map.addControl(new AMap.ToolBar({
            //    liteStyle: true
            //}))
        });

        AMap.plugin('AMap.Geocoder', function() {//初始化查询接口
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            map.getAddress = function(lnglatXY) {//逆地理编码:通过经纬度查询地址
                geocoder.getAddress(lnglatXY, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        console.log(result.regeocode.formattedAddress);
                        map.nearest = result;//将结果存到map.regeocode
                        if ($('.amap_lib_placeSearch').children().length === 0) {//如果未搜索到结果
                            $('.amap_lib_placeSearch')//创建空列表ul
                                .html('<div class="amap_lib_placeSearch_list"><ul class="amap_lib_placeSearch_ul"></div>');
                        }

                        $(`<li class="poibox">
                  <div class="amap_lib_placeSearch_poi poibox-icon">0</div>
                  <h3 class="poi-title"><span class="poi-name">${result.regeocode.addressComponent.street}</span></h3>
                  <div class="poi-info"><p class="poi-addr">${result.nearestJunction || result.regeocode.formattedAddress}</p></div>
                  </li>`)//创建当前位置li
                            .prependTo('.amap_lib_placeSearch_ul');//添加到ul

                        $('#panel').css('display', 'block');//显示结果面板
                        saveReg();//将搜索结果保存到localStorage
                    }
                });
            }
        });

        //点击查询结果面板
        $('#panel').on('click', function() {
            let index = $(this).find('.selected>div:first-child').text() - 1;//获取点击的索引值
            let result = map.result && map.result.poiList || map.nearest;//获取返回结果
            if (!result) return;
            if (index >= 0) {//0:通过逆地理编码接口得到的数据,1:通过周边查询接口得到的数据
                savePoi(result.pois[index]);//保存通过周边搜索得到的信息
            }
            else {
                saveReg();
            }
            //提交当前地址,返回上个页面
            //$('#submit').click();
            self.submit();

        });
        //将周边查询接口返回的地址保存到sessionStorage
        function savePoi(poi) {
            console.log(poi);
            let data = {};
            data['province'] = poi['pname'];
            data['city'] = poi['cityname'];
            data['county'] = poi['adname'];
            data['town'] = map.nearest.regeocode.addressComponent.township;
            data['address'] = poi['address'] + ' ' + poi['name'];
            data['address'] = data['address'].replace(data['province'], '')
                .replace(data['city'], '')
                .replace(data['county'], '')
                .replace(data['town'], '');
            data['province'] = data['province'].replace(/市$/, '');
            data['latitude'] = poi['location']['lat'];
            data['longitude'] = poi['location']['lng'];
            sessionStorage['mapReceiveInfo'] = JSON.stringify(data);
        }
        //将逆地理编码接口返回的地址保存到sessionStorage
        function saveReg() {
            let regeocode = map.nearest.regeocode;
            let data = {};
            //if(regeocode.addressComponent){//如果存在当前地址详情
            //  data['province'] = regeocode.addressComponent.province;
            //  data['city'] = regeocode.addressComponent.city || regeocode.pois[0].cityname;
            //  data['county'] = regeocode.addressComponent.township;
            //  data['address'] = regeocode.formattedAddress;
            //}else{//读取周围第一个地址详情
            //  data['province'] = regeocode.pois[0].pname;
            //  data['city'] = regeocode.pois[0].cityname;
            //  data['county'] = regeocode.pois[0].adname;
            //  data['address'] = regeocode.pois[0].address
            //}

            data['province'] = regeocode.addressComponent.province;
            data['city'] = regeocode.addressComponent.city ||
                regeocode.addressComponent.province;
            data['county'] = regeocode.addressComponent.district ||
                regeocode.pois[0].address;
            data['town'] = regeocode.addressComponent.township;
            data['address'] = map.nearest.nearestJunction ||
                regeocode.formattedAddress;
            data['address'] = data['address'].replace(data['province'], '')
                .replace(data['city'], '')
                .replace(data['county'], '')
                .replace(data['town'], '');
            data['province'] = data['province'].replace(/市$/, '');

            data['latitude'] = map.lnglat[1];
            data['longitude'] = map.lnglat[0];
            sessionStorage['mapReceiveInfo'] = JSON.stringify(data);
        }

        //下级行政单位列表生成
        AMap.service('AMap.DistrictSearch', function() {//回调函数
            //实例化DistrictSearch
            let districtSearch = new AMap.DistrictSearch();
            //TODO: 使用districtSearch对象调用行政区查询的功能
            districtSearch.search('中国', function(status, result) {
                let subDistricts = result.districtList[0].districtList;
                let select: any = document.getElementById('subDistricts');
                for (let i = 0; i < subDistricts.length; i += 1) {
                    let name = subDistricts[i].name;
                    let option = document.createElement('option');
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
        //搜索关键字
        AMap.plugin(['AMap.Autocomplete'], function() {
            let autoOptions = {
                city: "citycode", //城市，默认全国
                input: "keyword"//使用联想输入的input的id
            };
            let autoComplete = new AMap.Autocomplete(autoOptions);
            AMap.event.addListener(autoComplete, "select", function(e) {
                //TODO 针对选中的poi实现自己的功能
                console.log(e);
                map.setCenter(e.poi.location);
                // map.placeSearch.search(e.poi.name, function(status, result) {
                //   map.result = result;
                //   $('.poi-more').remove();
                //   //savePoi(result.poiList.pois[0]);
                // });
            });
        });
        ////点击显示地址
        //AMap.plugin('AMap.Geocoder',function(){
        //    let geocoder = new AMap.Geocoder({
        //        city: ""//城市，默认：“全国”
        //    });
        //    let marker = new AMap.Marker({
        //        map:map,
        //        bubble:true
        //    });
        //    map.on('click',function(e){
        //        marker.setPosition(e.lnglat);
        //        geocoder.getAddress(e.lnglat,function(status,result){
        //            if(status=='complete'){
        //                //document.getElementById('keyword')['value'] = result.regeocode.formattedAddress;
        //                console.log(result);
        //                //跳转到当前点
        //                //map.setZoom(15);
        //                //map.setCenter(poi['location']);
        //            }
        //        })
        //    })
        //
        //});
    }
    //选取坐标确定
    submit() {
        let result = sessionStorage['mapReceiveInfo'];
        //this.search();
        if (!result) {
            $('li.poibox')[0].click();
            return;
        }
        let data = JSON.parse(result);
        console.log(data);
        //将对象转换为url参数字符串
        let param = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        let type = this.routeInfo.snapshot.queryParams["address"];
        let url = {//address 1 编辑地址  2添加地址 type=6
            "1": 'EditReceive',
            "2": 'AddAddress'
        }[type];
        this.router.navigateByUrl("personalCenter/" + url + "?type=6&" + param);
        //this.router.navigateByUrl("personalCenter/EditReceive");
    }
    search() {
        if (this.map) {
            let map: any = this.map;
            this.map['placeSearch'].search($('#keyword').val(), function(status, result) {
                $('#panel').css('display', 'none');//暂时隐藏结果面板,加载完成后显示
                if (result.poiList.pois[0]) {
                    map.setZoom(13);
                    map.setCenter(result.poiList.pois[0].location);
                }
            });
        }
    }

    back() {
        this.router.navigateByUrl("personalCenter/EditReceive")
    }


}
