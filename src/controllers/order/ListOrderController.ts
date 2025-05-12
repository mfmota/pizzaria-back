import { Response,Request } from "express";

import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
    async handle(req:Request, res:Response){
        
        return res.json(await new ListOrderService().execute()); 
    }
}

export {ListOrderController}