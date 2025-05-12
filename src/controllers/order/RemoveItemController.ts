import { Request,Response } from "express"
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req:Request, res: Response){
        const id = req.query.id as string;

        const removeItem = new RemoveItemService();

        const item = await removeItem.execute({id})

        return res.json(item)
    }
}

export {RemoveItemController}