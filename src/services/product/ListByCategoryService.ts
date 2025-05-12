import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}:ProductRequest){
        const find = await prismaClient.product.findMany({
            where:{
                category_id:category_id
            }
        })

        return find;
    }
}

export {ListByCategoryService}