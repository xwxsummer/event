import { Component, OnInit } from '@angular/core';
import {PersonalCenterService} from '../personal-center.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
declare var layer:any;
declare var $:any;
@Component({
  selector: 'app-receivaddress',
  templateUrl: './receivaddress.component.html',
  styleUrls: ['../address/address.component.css']
})
export class ReceivaddressComponent implements OnInit {
public addressList;
  constructor(
    public service: PersonalCenterService,
    public router: Router,
  ) { }

  ngOnInit() {
    sessionStorage['type']=2;
    this.service.addressFindList('2')
         .subscribe(
           data => {
           if(data.code==0){//成功
             this.addressList=data.data;
             console.log(data);
           }else{
             layer.msg(data.msg);
           }
         }
       )
  }
  edit(index){
    sessionStorage.put('address',this.addressList[index]);
    this.router.navigateByUrl('/content/personalCenter/map');
  }
  remove(index){
    let self=this;
    let node = $(event.target).parent().parent();
      console.log(node);
    layer.open({
        type: 0
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: 0
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['确认', '取消']
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #ebebeb; color: #333; font-weight: 300;">确认删除吗？</div>'
        ,success: function(layero){
          var btn = layero.find('.layui-layer-btn');
          btn.css('text-align', 'center');
          btn.find('.layui-layer-btn0').css('background-color','#e85529');
          btn.find('.layui-layer-btn0').css('color','#333');
          btn.find('.layui-layer-btn0').css('border','2px solid #e85529');
          btn.find('.layui-layer-btn1').css('border','none');
          btn.find('.layui-layer-btn0').click(function(){
            {
              self.service.deleteAddress(self.addressList[index].id)
                 .subscribe(
                   data => {
                   if(data.code==0){
                     node.remove();
                   }else{
                     layer.msg(data.msg);
                   }
              });
            }
          })    
        }
      });
   
  }

  setDefaultAddress(id){
    console.log('设置默认地址：',id);
    this.service.addressSetDefault(id,2).subscribe(
      data => {
      if(data.code==0){//未注册
        this.router.navigateByUrl('/content/myGoods/deliverGoods');
        // layer.msg("设置默认地址成功");
       //  mui.toast("设置默认地址成功",{ duration:'short', type:'div' });
       }else{//设置默认收发货地址没有成功
         layer.msg(data.msg);
       //  mui.toast(data.msg,{ duration:'short', type:'div' });
      }
    });
  }
}
