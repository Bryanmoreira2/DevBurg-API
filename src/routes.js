// Importações necessárias
import { Router } from "express";
import multer from "multer";
import ProductsController from "./app/controlles/PoductContrller";
import CategoryController from "./app/controlles/CategoryContrller";
import SessionController from "./app/controlles/SessionController";
import UserController from "./app/controlles/UserController";
import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";
import OrderController from "./app/controlles/OrderController";
import CreatePaymentIntentController from "./app/controlles/stripe/CreatePaymentIntentController";

const routes = new Router(); // Instância do Router

const upload = multer(multerConfig); // Instância do multer
// Rota para criar usuário
routes.post("/users", UserController.store);
// Rota para login de usuário
routes.post("/session", SessionController.store);
// Rota para criar produto com upload de arquivo
routes.use(authMiddleware);

routes.post("/products", upload.single("file"), ProductsController.store);
routes.get("/products", ProductsController.index);
routes.put("/products/:id", upload.single("file"), ProductsController.update);

routes.post("/categories",  upload.single("file"),CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.updade);

routes.post ("/create-payment-intent", CreatePaymentIntentController.store)
export default routes; // Exporta as rotas
