import { Component, OnInit } from '@angular/core';
import {PersonalCenterService} from '../personal-center.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
declare let AMap: any;
declare let BasicControl: any;
declare let AMapUI: any;
declare let $: any;
declare let layer: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map: MapComponent;
  public address: any;

  constructor(
    public service: PersonalCenterService,
    public router: Router,
  ) { }

  ngOnInit() {
      let self = this;
      this.address = sessionStorage.get('address');

    if (this.address) {//如果是修改地址
      console.log('原地址信息：',this.address);
      $('#phone').val(this.address['phone']);
      $('#name').val(this.address['name']);
      $('#company').val(this.address['company']);
      $('#address').val(this.address['address'].split(' ')[0] || '');
      $('#detailAddress').val(this.address['address'].split(' ')[1] || '');
    }
    else this.address={};
    delete sessionStorage['address'];

    //初始化地图
    let map = this.map = new AMap.Map("container", {
      mapStyle: 'amap://styles/5e82a5b7757d00214ead15830af9195a',//样式URL
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonPosition: 'RB',
      resizeEnable: true,
      zoom: 15
    });
    AMap.service('AMap.DistrictSearch', function() {//回调函数
      //实例化DistrictSearch
      let districtSearch = new AMap.DistrictSearch();
      //TODO: 使用districtSearch对象调用行政区查询的功能
      districtSearch.search('中国', function(status, result) {
        console.log('地区:', result);

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
          map.setZoom(12);
          map.setCity(this.value);

        };
        select.value = subDistricts[0].name;
        //select.onchange();
      })
    });

    //拖拽地图选址
    AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
      let positionPicker = new PositionPicker({
        mode: 'dragMap',
        map: map
      });
      positionPicker.on('success', function(positionResult) {
        // console.log('附近信息:', positionResult);
        let data = {};
        let addressComponent = positionResult.regeocode.addressComponent;
        data['province'] = addressComponent.province;
        data['city'] = addressComponent.city || data['province'];
        data['county'] = addressComponent.district;
        data['town'] = addressComponent.township;
        data['address'] = positionResult.address;
        data['address'] = data['address'].replace(data['province'], '')
          .replace(data['city'], '')
          .replace(data['county'], '')
          .replace(data['town'], '');
        // .replace(/市$/, '')
        data['latitude'] = positionResult.position.lat;
        data['longitude'] = positionResult.position.lng;
        // sessionStorage['mapReceiveInfo'] = JSON.stringify(data);
        // self.address = data;
        Object.assign(self.address,data);
        $('#address').val(positionResult.address);
        console.log('附近信息:', positionResult.address);
      });
      positionPicker.start();
    });
    AMap.plugin(['AMap.Geolocation', 'AMap.ToolBar'], function() {
      map.addControl(new AMap.ToolBar({ visible: true }));//
      // map.addControl(new BasicControl.Zoom({visible: true}));
      let geolocation = map.posMapGeolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

      });
      map.addControl(geolocation);
      if(self.address){//存在地址信息，跳转到对应经纬度
        map.setCenter(new AMap.LngLat(self.address.longitude, self.address.latitude));
          map.setZoom(15);
      }else {
        map.posMapGeolocation.getCurrentPosition();
        layer.msg('正在定位...');
      }

    });
  }

  submitForm(phone, name, company,detailAddress) {
    if (!(detailAddress && phone && name && company)) {
      layer.msg('填写信息不完整');
      console.log('填写信息不完整:',phone, name, company,detailAddress);
      return;
    }
    // this.address = this.address || {};//如果address不存在，建立一个空对象
    // this.address['address'] = $('#address').val();
    this.address['address'] = this.address['address'].split(' ')[0] + ' ' + detailAddress;
    this.address['type'] = sessionStorage["type"];//收发货
    this.address['phone'] = phone;
    this.address['name'] = name;
    this.address['company'] = company;
    let api = this.address.id === undefined ? 'addAddress':'putAddress'//如果不存在id，添加地址
    this.service[api](this.address).subscribe(data => {
      console.log(api,'地址接口：',data);
      if (data.code == 0) {//成功
        layer.msg(api === 'addAddress' ? "添加地址成功":'修改地址成功');
        this.router.navigateByUrl(sessionStorage['type'] === '1' ?
          "content/personalCenter/address" :
          "content/personalCenter/receivaddress"
        );
      }
      else layer.msg(data.msg);
    })
  }
remove(){
    window.history.go(-1);
}
}
