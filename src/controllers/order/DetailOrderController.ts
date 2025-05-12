import { Request,Response } from "express";

import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController{
    async handle(req: Request, res:Response){
        const order_id = req.query.order_id as string

        return res.json(await new DetailOrderService().execute({order_id}));
    }
}

export {DetailOrderController}