import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Observable }from 'rxjs/Observable';
import { Subject }from 'rxjs/Subject';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;
declare var $:any;
declare var echarts:any;

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']

})

//chartData = {

export class Wallet implements OnInit{
    public money = {
      total:0,
      residue:0,
      frozen:0,
    };
    constructor(
        public router: Router,
        public service : personalCenterService,
        public titleService: Title
    ){

    }
    //截取金额
    fmoney(s:any, n?:number) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}



    ngOnInit(): void{
        this.titleService.setTitle('我的钱包');
        this.service.wallet(localStorage['walletCode']).subscribe(res=>{
        this.money =res.data;
        this.money.total = res.data.residue+ res.data.frozen;


      });

//echarts图
        let myChart = echarts.init(document.getElementById('main'));

        setTimeout(()=>{
            let option = {
                //tooltip: {
                //    trigger: 'item',
                //    formatter: "{a} <br/>{b}: {c} ({d}%)"
                //},
                series: [
                    {
                        name:'金额',
                        type:'pie',
                        radius: ['40%', '70%'],
                        //avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                //position: 'center'
                            },
                            emphasis: {
                                show: false,
                                //textStyle: {
                                //    fontSize: '30',
                                //    fontWeight: 'bold'
                                //}
                            }
                        },
                        //labelLine: {
                        //    normal: {
                        //        show: false
                        //    }
                        //},
                        data:[

                            {value:this.money.frozen, name:'冻结金额'},
                            {value:this.money.residue, name:'可提现金额'}
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },800);



    }

    //我的钱包
    recharge(){
        this.router.navigateByUrl("personalCenter/Recharge");
    }
//查看明细
    detail(){
        this.router.navigateByUrl("personalCenter/Detail");
    }
//我的银行卡
    mybank(){
        this.router.navigateByUrl("personalCenter/Mybank");
    }
    //修改交易密码
    mondify(){
        this.router.navigateByUrl("personalCenter/Mondify");
    }
//修改交易密码

}
