/**
 * Created by 123 on 2017/5/13.
 */
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {Api} from '../api';
import {Ajax} from '../ajax';
import {Http} from "@angular/http";
declare let AMap;
declare let Date;

@Component({
    selector: 'trajectoryMap',
    templateUrl: './trajectoryMap.component.html',
    styleUrls: ['./trajectoryMap.component.css']

})
export class trajectoryMap implements OnInit {
    public ajax: Ajax;
    public time: string;
    constructor(
        public http: Http,
        public activatedRoute: ActivatedRoute
    ) {
        this.ajax = new Ajax(this.http);
    }
    ngOnInit() {
        let childNo = this.activatedRoute.snapshot.params['id']

        this.ajax.myget(Api.sparsePointRecords +'/'+childNo).subscribe(data => {
            console.log(data.data);
            let map = new AMap.Map('container', {
                resizeEnable: true,
                center: data.data[0].coordinate,
                zoom: 10
            });
            let lineArr = data.data.map(i => i.coordinate);
            let polyline = new AMap.Polyline({
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 0.8,       //线透明度
                strokeWeight: 5,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(map);

            let marker = new AMap.Marker({
                position: data.data[0].coordinate
            });
            marker.setMap(map);

            let time = new Date(new Date(data.data.slice(-1)[0].time) - new Date(data.data[0].time));
            this.time = `总时间:${time.getUTCHours()}时${time.getUTCMinutes()}分${time.getUTCSeconds()}秒`;
            console.log(this.time);

            let content = '<div style="width: 100%;border-radius:5px;height: 2rem;line-height:2rem;background-color: white;color:#000;">'+this.time+'</div>';
            AMap.plugin('AMap.InfoWindow', function() {
                let infowindow = new AMap.InfoWindow({
                    isCustom: true,  //使用自定义窗体
                    content: content,
                    offset: new AMap.Pixel(0, -30)
                });
                infowindow.open(map, data.data[0].coordinate);
            });


        });
    }
}
