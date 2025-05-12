import { Request,Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response){
        const {table,name} = req.body;

        return res.json(await new CreateOrderService().execute({table,name}));
    }
}

export {CreateOrderController}