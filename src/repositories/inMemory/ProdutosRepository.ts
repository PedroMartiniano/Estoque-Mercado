import { CreateProdutoProps, ProdutosProps } from "../../@types/Produtos";
import { ProdutosRepository } from "../interfaces/produtos-interface";

// export class InMemoryProdutosRepository implements ProdutosRepository {
//     private prodDbInMemory: ProdutosProps[] = []
//     private prodListInMemory: ProdutosProps[] = [
//         { id: '1', id_cat: '321', nome: 'ProdTeste', marca: 'MarcaTeste', imagem: 'url/image', qtde: 10, preco: 19.99, status_prod: 1 },
//         { id: '2', id_cat: '322', nome: 'ProdTeste2', marca: 'MarcaTeste2', imagem: 'url/image2', qtde: 5, preco: 50, status_prod: 1 }
//     ]

//     async createProduto(data: CreateProdutoProps): Promise<ProdutosProps | null> {
//         const produto = {
//             id: `${this.prodDbInMemory.length}`,
//             imagem: 'none',
//             ...data,
//             status_prod: 1
//         }

//         this.prodDbInMemory.push(produto)

//         return produto
//     }
// }