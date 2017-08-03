import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SessionStorage } from "app/fragment/session_storage";
declare var layer:any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public name;
  constructor(
    public router: Router,
    public sessionStorage:SessionStorage
  ) { }

  ngOnInit() {
    // Storage.prototype.put = function(key, value) {
    //   this.setItem(key, JSON.stringify(value));
    // }

    // Storage.prototype.get = function(key) {
    //   var value = this.getItem(key);
    //   return value && JSON.parse(value);
    // }
    console.log(sessionStorage.getItem("data"));
    this.name=this.sessionStorage.getObject("data").name;
  }
  b() {
   var self=this;
      //示范一个公告层
  //     layer.open({
  //       type: 1
  //       ,title: false //不显示标题栏
  //       ,closeBtn: false
  //       ,area: '300px;'
  //       ,shade: 0.8
  //       ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
  //       ,btn: ['确认', '取消']
  //       ,moveType: 1 //拖拽模式，0或者1
  //       ,content: '确认退出登录吗？'
  //       ,success: function(layero){
  //         sessionStorage.removeItem('data');
  //         this.router.navigateByUrl("");
  //         window.location.reload();
  //       }
  //     });
  layer.open({
        type: 0
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['确认', '取消']
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #ebebeb; color: #333; font-weight: 300;">确认退出登录吗？</div>'
        ,success: function(layero){
          var btn = layero.find('.layui-layer-btn');
          btn.css('text-align', 'center');
          btn.find('.layui-layer-btn0').css('background-color','#e85529');
          btn.find('.layui-layer-btn0').css('color','#333');
          btn.find('.layui-layer-btn0').css('border','2px solid #e85529');
           btn.find('.layui-layer-btn1').css('border','none');
          btn.find('.layui-layer-btn0').click(function(){
            {
              sessionStorage.removeItem('data');
              self.router.navigateByUrl("");
              window.location.reload();
            }
          })    
        }
      });
     
   }
}
