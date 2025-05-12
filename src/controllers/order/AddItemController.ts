import { Response, Request } from "express";

import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res : Response){
        const {order_id,product_id,amount} = req.body

        const addItem = new AddItemService()

        const item = await addItem.execute({order_id,product_id,amount})

        return res.json(item)
    }
}

export { AddItemController}