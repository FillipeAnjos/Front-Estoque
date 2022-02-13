import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api";

interface IProdutos{
    id: number[];
    produto: string[];
    categoria: string[];
    descricao: string[];
    cor: string[];
    tamanho: string[];
    valor: number[];
    obs: string[];
    status: boolean[];
    created_at: Date[];
    updated_at: Date[];
}

interface IProdutosEditar{
    codigo: number;
    produto: string;
    categoria: string;
    descricao: string;
    cor: string;
    tamanho: string;
    valor: number;
    obs: string;
    status: boolean;
}

interface IProdutosProviderProps{
    children: ReactNode
}

interface IMetodosUseContextProdutos{
    produtos: IProdutos[];
    editarProduto: (dados: IProdutosEditar) => Promise<void>
    vendas: any[];
}

export const contextProdutos = createContext<IMetodosUseContextProdutos>(
    {} as IMetodosUseContextProdutos
);

export function UseContextProdutos({children}: IProdutosProviderProps){

    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        listarProdutos();
        buscarGraficoVendas();
    }, []);

    function buscarGraficoVendas(){
        api({
            method: 'POST',
            url: '/buscarGraficoVendas'
        }).then((res) => {
            setVendas(res.data.vendas);
        })
    }

    function listarProdutos(){
        api({
            method: 'GET',
            url: '/listarProdutos'
        }).then( (res) => {
            setProdutos(res.data.produtos);
        })
    }

    async function editarProduto(dados: IProdutosEditar){
        const retorno = await api({
                        method: 'POST',
                        url: '/editarProduto',
                        data: {
                            param: dados
                        }
                    }).then( (res) => {

                        return res.data.produto;

                    })

        const { prod } = retorno;
        
        setProdutos([
            ...produtos, 
            prod
        ]);
        /* 
        setProdutos(prod);
        */
        //listarProdutos();

    }

    return (
        <contextProdutos.Provider value={{produtos, editarProduto, vendas}} >
            { children }
        </contextProdutos.Provider>
    );

}
