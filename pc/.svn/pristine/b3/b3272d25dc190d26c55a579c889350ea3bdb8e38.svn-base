import { Component, OnInit } from '@angular/core';
import { MyWalletService } from "app/content/my-wallet/my-wallet.service";
declare var echarts: any;

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
   public data;
    public money = {
      total:0,
      residue:0,
      frozen:0,
    };
  constructor(
     public service :MyWalletService
  ) { }
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
  ngOnInit() {
     this.service.wallet()
     .subscribe(res=>{
        this.data=res.data;
        this.money =res.data;
        this.money.total = res.data.residue+ res.data.frozen;
        console.log(this.money)
     

  let myChart = echarts.init(document.getElementById('main'));
    

  var option = {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          x: 'right',
          y:'center',
          data:['可提现金额','冻结金额']
      },
      series: [
          {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:this.money.residue, name:'可提现金额'},
                  {value:this.money.frozen, name:'冻结金额'},
              ]
          }
      ]
  };
   
  myChart.setOption(option);
  });
  }
}
