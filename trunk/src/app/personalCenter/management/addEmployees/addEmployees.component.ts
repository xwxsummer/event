/**
 * 于婷
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//地址查询
import { ownerStaffDTO } from  '../fragment/addEmployee';
import { personalCenterService } from  '../../personalCenter.service';
import { LocalStorage } from '../../../local_storage';
declare var mui: any;

@Component({
  selector: 'app-myGoods',
  templateUrl: './addEmployees.component.html',
  styleUrls: ['./addEmployees.component.css'],
  providers:[personalCenterService]

})
export class AddEmployees implements OnInit{
  public isSubmit=false;//判断是否可以提交
  public ownerStaffDTO:ownerStaffDTO;
  ngOnInit(): void{

  }
  constructor(
    public router: Router,
    public localStorage: LocalStorage,
    public service : personalCenterService
  ) {
    this.ownerStaffDTO=new ownerStaffDTO();
  }
//checkMobile 验证手机号码
  checkMobile(){
    if(this.ownerStaffDTO.phone.length==11){
      this.service.checkMobile(this.ownerStaffDTO.phone)
          .subscribe(
              data => {
            if(data.code==0){//成功
              this.isSubmit=false;//判断是否可以提交
              this.ownerStaffDTO.name=data.data.name;
              this.ownerStaffDTO.staffId=data.data.userId;
            }else{
              this.isSubmit=true;
              mui.toast(data.msg,{ duration:'short', type:'div' });
            }

          }
      );
    }

  }
  //表单提交
  submitForm() {
    //添加员工接口
    this.service.submitOwnerStaff(this.ownerStaffDTO)
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.router.navigateByUrl("personalCenter/Management");
          }else{
            //货主未认证
            if(data.code==4134){
              mui.toast(data.msg,{ duration:'short', type:'div' });
            }
            //个人未认证
            if(data.code==4135){
              mui.toast('该用户尚未认证，通过认证后才可添加，建议用户关注马上来公众号进行认证后再次添加。',{ duration:'short', type:'div' });
            }

          }

        }
    );
  }

}
