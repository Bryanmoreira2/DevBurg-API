// Importações necessárias
import { Router } from 'express';
import multer from 'multer';
import ProductsController from './app/controlles/PoductContrller';
import SessionController from './app/controlles/SessionController';
import UserController from './app/controlles/UserController';
import multerConfig from './config/multer';

const routes = new Router(); // Instância do Router

const upload = multer(multerConfig); // Instância do multer
// Rota para criar usuário
routes.post('/users', UserController.store);
// Rota para login de usuário
routes.post('/session', SessionController.store);
// Rota para criar produto com upload de arquivo
routes.post('/products', upload.single('file'), ProductsController.store);

routes.get('/products', ProductsController.index);

export default routes; // Exporta as rotas
