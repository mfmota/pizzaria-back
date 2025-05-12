"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category_id } = req.body;
            const createProductService = new CreateProductService_1.CreateProductService();
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Erro ao carregar a foto");
            }
            else {
                let fileToUpload;
                const uploadedFileOrFiles = req.files.file; // Melhor usar req.files.file se 'file' for um nome de campo válido
                if (Array.isArray(uploadedFileOrFiles)) {
                    // Se for um array, pegamos o primeiro arquivo.
                    // Adicione lógica aqui se você quiser proibir múltiplos arquivos ou tratar de forma diferente.
                    if (uploadedFileOrFiles.length === 0) {
                        throw new Error("Erro ao carregar a foto: array de arquivos vazio.");
                    }
                    fileToUpload = uploadedFileOrFiles[0];
                }
                else {
                    // Se não for um array, é um único UploadedFile
                    fileToUpload = uploadedFileOrFiles;
                }
                // --- FIM DA CORREÇÃO ---
                // Verifica se fileToUpload tem a propriedade 'data', essencial para o stream
                if (!fileToUpload || !fileToUpload.data) {
                    throw new Error("Erro ao carregar a foto: arquivo inválido ou sem dados.");
                }
                const resultFile = yield new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'image' }, // Adicione resource_type se souber
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        if (result) { // Verifique se result não é undefined
                            resolve(result);
                        }
                        else {
                            reject(new Error("Cloudinary upload failed: No result returned."));
                        }
                    });
                    uploadStream.end(fileToUpload.data); // Usa a variável corrigida
                });
                const product = yield createProductService.execute({
                    name,
                    price,
                    description,
                    banner: resultFile.url,
                    category_id
                });
                return res.json(product);
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
