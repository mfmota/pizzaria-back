
import { Request,Response } from "express";

import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){
        const {order_id} = req.body;

        return res.json(await new FinishOrderService().execute({order_id}))
    }
    
}

export {FinishOrderController}
