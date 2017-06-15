/**
 * by郭
 *
 * ******/
import { RouterModule } from '@angular/router';
import { DeliverGoods } from './deliverGoods.component';
import { PublicGoods } from './deliverGoods.component.child';
import { Success } from './success/success.component';
import { Remarks } from './Remarks/Remarks.component';
import { Map } from '../map/map.component';
export const DeliverGoodsRoutes=[
    {
        path:'',
        component:DeliverGoods
    }
    ,{
        path:'PublicGoods/:orderNo',
        component:PublicGoods
    }
    ,{
        path:'Success',
        component:Success
    }
    ,{
        path:'Remarks',
        component:Remarks
    }
    ,{
        path:'Map',
        component:Map
    }
];
