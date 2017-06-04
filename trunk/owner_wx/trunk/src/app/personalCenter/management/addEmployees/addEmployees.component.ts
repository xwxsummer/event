/**
 * 于婷
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//地址查询
import { ownerStaffDTO } from  '../fragment/addEmployee';
import { Title } from '@angular/platform-browser';
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

  constructor(
    public router: Router,
    public titleService: Title,
    public localStorage: LocalStorage,
    public service : personalCenterService
  ) {
    this.ownerStaffDTO=new ownerStaffDTO();
  }
  ngOnInit(): void{
    this.ownerStaffDTO.phone="";
    this.titleService.setTitle('添加员工');
  }
//checkMobile 验证手机号码
  checkMobile(){
    console.log(1111111)
    if(this.ownerStaffDTO.phone.length==11){
      this.service.checkMobile(this.ownerStaffDTO.phone)
          .subscribe(
              data => {
            if(data.code==0){//成功
              this.isSubmit=false;//判断是否可以提交
              this.ownerStaffDTO.name=data.data.name;
              this.ownerStaffDTO.staffId=data.data.userId;
              if(data.data.authed==3){
                mui.toast("员工审核中，请添加其他员工",{ duration:'short', type:'div' });
              }
            }else{
              this.isSubmit=true;
              mui.toast(data.msg,{ duration:'short', type:'div' });
              console.log(1111111)
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
            mui.toast(data.msg,{ duration:'short', type:'div' });
          }

        }
    );
  }

}
