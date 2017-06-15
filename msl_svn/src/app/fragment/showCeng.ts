import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-showCeng',//弹框层
  template : `<div id="contact_show" class="ceng_show clearfix col_333 fonSml">
      <div class="text_center b-b ceng_top">{{message}}</div>
      <div class="clearfix ea5529">
        <div class="text_center contactUs_cancel pull-left b-r" id="contactUs_cancel" (click)="isCancel()">取消</div>
        <div class="text_center contactUs_sure pull-right" (click)="isShow()">确定</div>
      </div>
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
         display: block; position: fixed;
         top: 40%;left: 15%;border-radius: 13px;
         width: 70%;background-color: rgba(255,255,255,.95);
         z-index:1002; font-size: 14px;
         color: #000; font-weight: 900;
       }
       .ceng_top{
         padding: 20px 0;
       }
       .contactUs_cancel,.contactUs_sure{
         width: 50%; height: 44px;line-height:44px;font-size: 17px;
       }
       `]
})

export class showCeng implements OnInit{
  @Input() public message:string;
  @Output() public outer=new EventEmitter<string>();
  constructor(){}
  ngOnInit(): void{}
  //确定
  isShow(){
    this.outer.emit("1");
  }
  //取消
  isCancel(){
    this.outer.emit("2");
  }

}
