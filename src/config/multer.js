import multer from "multer"; // Importa o multer para upload de arquivos
import { extname, resolve } from "node:path"; // Importa funções para manipulação de caminhos
import { v4 as uuidv4 } from "uuid"; // Importa a função v4 de uuid com o nome uuidv4

export default {
	storage: multer.diskStorage({
		// Define o diretório de destino dos uploads
		destination: resolve(__dirname, "..", "..", "uploads"),

		// Define o nome do arquivo: ID único + extensão original
		filename: (req, file, callback) =>
			callback(null, uuidv4() + extname(file.originalname)),
	}),
};
