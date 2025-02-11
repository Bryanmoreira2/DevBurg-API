// Importa o Yup para validação de dados
import * as Yup from "yup";
import Order from "../schemas/Order";
import Product from '../models/Product';
import Category from "../models/Category";
import User from "../models/User";
import { response } from "express";

class OrderController {
    // Método para criar um novo pedido
    async store(request, response) {
        // Define o esquema de validação para o array de produtos
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(), // ID do produto
                    quantity: Yup.number().required(), // Quantidade do produto
                })
            )
        });

        try {
            // Valida os dados da requisição
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            // Retorna erro de validação
            return response.status(400).json({ errors: err.errors });
        }

        const { products } = request.body;

        // Extrai IDs dos produtos
        const productIds = products.map((product) => product.id);

        // Busca produtos no banco de dados com suas categorias
        const findProducts = await Product.findAll({
            where: {
                id: productIds,
            },
            include: [{
                model: Category, // Inclui o modelo de categoria
                as: 'category',  // Usa alias 'category'
                attributes: ['name'], // Apenas o nome da categoria
            }],
        });

        // Formata os produtos encontrados com suas informações e quantidade
        const formattedProducts = findProducts.map(product => {
            const ProductIndex = products.findIndex((item) => item.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[ProductIndex].quantity,
            };
            return newProduct;
        });

        // Cria o objeto do pedido com dados do usuário e produtos formatados
        const orderFormt = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            product: formattedProducts,
            status: 'Pedido Realizado',
        };

        const createOrder = await  Order.create(orderFormt);


        // Retorna o pedido em formato JSON
        return response.json(createOrder);
    }
    async index(request, response){
        const orders = await Order.find();
        return response.json(orders);
    }

    

    async updade(request, response){
        const schema = Yup.object({
            status: Yup.string().required(),
            });

        try {
            // Valida os dados da requisição
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            // Retorna erro de validação
            return response.status(400).json({ errors: err.errors });
        }
        const {admin: isAdmin}= await User.findByPk(request.userId);

		if(!isAdmin){
			return response.status(401).json()
		}

        const{ id  } = request.params;
        const { status } = request.body;

        try{
            await Order.updateOne({_id: id }, {status});
        } catch (err){
            return response.status(400).json({error: err.message})
        }

        

        return response.json({message: 'Status upadted sucessfully'})


    }
}

    

// Exporta uma nova instância de OrderController
export default new OrderController();



