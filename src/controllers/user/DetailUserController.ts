import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailsUserController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id;

        const detailsUserService = new DetailUserService();

        const user = await detailsUserService.execute(user_id);

        return res.json(user);
    }
}

export {DetailsUserController}