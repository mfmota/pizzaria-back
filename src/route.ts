import { Router} from 'express'
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import {DetailsUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

router.post('/users',new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailsUserController().handle)

router.post('/category',isAuthenticated, new CreateCategoryController().handle)
router.get('/category',new ListCategoryController().handle)

//router.post('/product',isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product',isAuthenticated, new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order',isAuthenticated, new DeleteOrderController().handle)
router.post('/order/item', isAuthenticated, new AddItemController().handle)
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle)
router.put('/order',isAuthenticated, new SendOrderController().handle)

router.get('/order', new ListOrderController().handle)
router.get('/order/details', new DetailOrderController().handle)  
router.put('/order/finish',isAuthenticated, new FinishOrderController().handle)


export{router};