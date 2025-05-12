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
            let fileToUpload: UploadedFile;
            const uploadedFileOrFiles = req.files.file; // Melhor usar req.files.file se 'file' for um nome de campo válido

            if (Array.isArray(uploadedFileOrFiles)) {
                // Se for um array, pegamos o primeiro arquivo.
                // Adicione lógica aqui se você quiser proibir múltiplos arquivos ou tratar de forma diferente.
                if (uploadedFileOrFiles.length === 0) {
                    throw new Error("Erro ao carregar a foto: array de arquivos vazio.");
                }
                fileToUpload = uploadedFileOrFiles[0];
            } else {
                // Se não for um array, é um único UploadedFile
                fileToUpload = uploadedFileOrFiles;
            }
            // --- FIM DA CORREÇÃO ---

            // Verifica se fileToUpload tem a propriedade 'data', essencial para o stream
            if (!fileToUpload || !fileToUpload.data) {
                throw new Error("Erro ao carregar a foto: arquivo inválido ou sem dados.");
            }
                

            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream({ resource_type: 'image' }, // Adicione resource_type se souber
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    if (result) { // Verifique se result não é undefined
                        resolve(result);
                    } else {
                        reject(new Error("Cloudinary upload failed: No result returned."));
                    }
                }
            );
            uploadStream.end(fileToUpload.data); // Usa a variável corrigida
        });

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