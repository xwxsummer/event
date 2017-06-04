/**
 * 于婷
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//地址查询
import { ownerStaffDTO } from  '../../management/fragment/addEmployee';
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;


@Component({
    selector: 'app-addContact',
    templateUrl: './addContact.component.html',
    styleUrls: ['./addContact.component.css']
})
export class AddContact implements OnInit{
    public ownerStaffDTO:ownerStaffDTO;
    public ValidateMessage;//验证验证码
    constructor(
        public router: Router,
        public routeInfo:ActivatedRoute,//页面间传值
        public service : personalCenterService
    ){
        this.ownerStaffDTO=new ownerStaffDTO();
        this.ValidateMessage = new ValidateMessage();
    }
    ngOnInit(): void{
        this.ownerStaffDTO.phone="";

    }

    //checkMobile 验证手机号码
    checkMobile(){
        if(this.ValidateMessage.validateMobile(this.ownerStaffDTO.phone)==1){
            this.service.checkMobile(this.ownerStaffDTO.phone)
                .subscribe(
                    data => {
                    if(data.code==0){//成功
                        console.log(111111);
                        if(data.data.authed==2){
                            console.log(data.data.authed+"4444");
                            this.ownerStaffDTO.name=data.data.name;
                            this.ownerStaffDTO.staffId=data.data.userId;
                            console.log(this.ownerStaffDTO)
                            //添加员工接口
                            this.service.submitOwnerStaff(this.ownerStaffDTO)
                                .subscribe(
                                    data => {
                                    if(data.code==0){//成功
                                        mui.toast('添加成功',{ duration:'short', type:'div' });
                                        this.router.navigateByUrl("personalCenter/WatchContact");
                                    }else{
                                        mui.toast(data.msg,{ duration:'short', type:'div' });
                                    }
                                    console.log(data);
                                }
                            );
                        }else{
                            console.log(data.data.authed);
                            this.router.navigateByUrl("/personalCenter/AddAddress?type=7");
                        }
                    }else{
                        this.router.navigateByUrl("/personalCenter/AddAddress?type=7");

                        mui.toast(data.msg,{ duration:'short', type:'div' });

                    }

                }
            );
        }
    }
    //表单提交
    submitForm() {
        //checkMobile 验证手机号码
        this.checkMobile();

    }
}
