import { Request,Response } from "express"; 
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";

import {v2, UploadApiResponse} from 'cloudinary'

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController{
    async handle(req:Request, res:Response){
        const {name,price,description,category_id} = req.body;

        const createProductService = new CreateProductService()

        if(!req.files || Object.keys(req.files).length === 0 ){
            throw new Error("Erro ao carregar a foto")
        }else{

            const file: UploadedFile = req.files['file']

            const resultFile: UploadApiResponse = await new Promise((resolve,reject) => {
                v2.uploader.upload_stream({}, function(error,result){
                    if(error){
                        reject(error);
                        return;
                    }

                    resolve(result)
                }).end(file.data)
            })

            const product = await createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.url,
                category_id
            
            });

            return res.json(product);
        }
        
        

        

    }

}

export {CreateProductController}