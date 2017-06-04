import { RouterModule } from '@angular/router';
import { Market } from './market.component';
import { MarketInfo } from './marketInfo/marketInfo.component';
import { MyGoods } from '../myGoods/myGoods.component';
import { GoodsReceipt } from '../goodsReceipt/goodsReceipt.component';
import { PersonalCenter } from '../personalCenter/personalCenter.component';

export const MarketRoutes=[
    {
        path:'',
        component:Market,
        children:[{
            path:'',
            component:MarketInfo
        },{
          path:'MarketInfo',
          component:MarketInfo
        },
          {
            path:'MyGoods',
            component:MyGoods
          },
          {
            path:'GoodsReceipt',
            component:GoodsReceipt
          },
          {
            path:'PersonalCenter',
            component:PersonalCenter
          }

        ]
    }
];
