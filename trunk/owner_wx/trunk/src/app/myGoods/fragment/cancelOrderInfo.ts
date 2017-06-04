/**
 * Created by CLX on 2017/5/15.
 */
import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cancelOrderInfo',//弹框层
    template : `
    <div id="contact_show" class="ceng_show clearfix col_333 fonSml posi_relative">
      <ul>
        <li (click)="CancelInfoOrderAll(1)">取消剩余货单</li>
        <!--<li (click)="CancelInfoOrderAll(2)">取消待装车货单</li>-->
        <li (click)="CancelInfoOrderAll(3)">取消全部货单</li>
        <li (click)="CancelInfoOrderAll(0)">先不取消</li>
      </ul>
      <span class="posi_abslotu cancel_span col_333 mui-icon mui-icon-closeempty" (click)="CancelInfoOrderAll(0)"></span>
    </div>
    <div id="contact_bg" class="bg"></div>
  `,
    styles: [`
        .bg{
          display: block;position: fixed;top: 0;
          left: 0;width: 100%;height: 100%;
          background: rgba(0,0,0,.4);
          z-index:998;    }
        .ceng_show{
          display: block;
          position: fixed;
          top: 20%;
          left: 10%;
          min-height: 273px;
          width: 80%;
          background-color: rgba(255,255,255,.95);
          z-index:1002;
          font-size: 14px;
          color: #000;
          font-weight: 900;
          padding: 40px 40px;
        }
        #contact_show ul li{
          height: 2.4rem;
          line-height: 2.4rem;
          text-align: center;
          border-radius: 10px;
          margin: 25px 0;
          border: 1px solid #333;
          color: #333;
        }
        #contact_show ul li:last-child{
          margin-bottom: 10px;
        }
        #contact_show .cancel_span{
          top: 10px;
          right: 10px;
          font-size: 26px;

        }
        .contactUs_cancel,.contactUs_sure{
          width: 50%; height: 44px;line-height:44px;font-size: 17px;
        }
       `]
})

export class cancelOrderInfo implements OnInit{
    @Input() public message:string;
    @Output() public outer=new EventEmitter<string>();
    constructor(){}
    ngOnInit(): void{}
    //取消全部订单
    CancelInfoOrderAll(info){
        this.outer.emit(info);
    }

}
