import moment from "moment";
import PDFMaker from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts";
PDFMaker.vfs = pdfFonts.pdfMake.vfs;

interface IVendas{
    id: string; 
    id_user?: string; 
    id_fechamento?: string; 
    data: string; 
    desconto: string; 
    modalidade: string; 
    valor_total: string;
    obs: string; 
    created_at?: string; 
    updated_at?: string; 
}

interface IFechamentos{
    id: string; 
    valor_total: string;
    data: string; 
    status?: boolean; 
    created_at?: string; 
    updated_at?: string; 
}

interface IProdutos{
    id: number; 
    produto: string; 
    categoria: string; 
    descricao: string; 
    cor: string; 
    tamanho: string; 
    obs: string; 
    valor: string; 
    status: boolean; 
    quantidade: number; 
}

interface IClientes{
    id: number; 
    nome: string; 
    email: string; 
    cpf: string;
    nascimento: Date; 
    genero: string; 
    civil: string; 
    rg: string;  
    created_at?: string; 
    updated_at?: string; 
}

interface IFornecedores{
    id: number; 
    nome: string; 
    email: string; 
    cnpj: string;
    razao: Date; 
    falarcom: string; 
    created_at?: string; 
    updated_at?: string;
}

class GerarRelatorioPDF{

    gerarRelatorioVendas(dados: [IVendas]){
        //https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
        //https://www.youtube.com/watch?v=WG1EYRhny3M&t=1295s

        //http://localhost:3000/relatorioVendas

        const body = [];

        dados.forEach(element => {
            const linha = new Array();
            linha.push(element.id)
            linha.push(element.modalidade)
            linha.push(`R$: ${element.valor_total}`)
            linha.push(element.desconto != null ? `R$: ${element.desconto}` : "-")
            linha.push(moment(element.data).format("DD/MM/YYYY"))
            linha.push(element.obs)

            body.push(linha)
        });
        
        var DocDefinicao = null;

        DocDefinicao = {
            content: [
                {
                    columns: [
                        { text: "Relatório de Vendas", style: "header" },
                        { text: moment(new Date()).format("DD/MM/YYYY") + "\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        heights: function (row: number) {
                            return 28;
                        },
                        //widths: [100, "auto", "auto", "auto"],
                        body: [
                            [
                                { text: "ID", style: "columnsTitle" },
                                { text: "Modalidade", style: "columnsTitle" },
                                { text: "Valor", style: "columnsTitle" },
                                { text: "Desconto", style: "columnsTitle" },
                                { text: "Data", style: "columnsTitle" },
                                { text: "Observação", style: "columnsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 14,
                    bold: true,
                    fillColor: "#7159c1",
                    color: "#FFF",
                    alignment: "center",
                    margin: 15
                }
            }
        }
        
        PDFMaker.createPdf(DocDefinicao).open({}, window.open('', '_blank'));
                                      //.download();
        //

    }

    gerarRelatorioFechamentos(dados: [IFechamentos]){
        //https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
        //https://www.youtube.com/watch?v=WG1EYRhny3M&t=1295s

        //http://localhost:3000/relatorioVendas

        const body = [];

        dados.forEach(ele => {
            const linha = new Array();
            linha.push(ele.id)
            linha.push(ele.valor_total != '0' ? `R$: ${ele.valor_total}` : "-")
            linha.push(moment(ele.data).format("DD/MM/YYYY"))
            linha.push(ele.status == false ? 'Fechado' : 'Aberto')

            body.push(linha)
        });
        
        var DocDefinicao = null;

        DocDefinicao = {
            content: [
                {
                    columns: [
                        { text: "Relatório de Fechamentos", style: "header" },
                        { text: moment(new Date()).format("DD/MM/YYYY") + "\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        heights: function (row: number) {
                            return 28;
                        },
                        //widths: [100, "auto", "auto", "auto"],
                        body: [
                            [
                                { text: "Código", style: "columnsTitle" },
                                { text: "Valor", style: "columnsTitle" },
                                { text: "Data", style: "columnsTitle" },
                                { text: "Caixa", style: "columnsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 14,
                    bold: true,
                    fillColor: "#7159c1",
                    color: "#FFF",
                    alignment: "center",
                    marginTop: 5,
                    marginLeft: 42,
                    marginRight: 42
                }
            }
        }
        
        PDFMaker.createPdf(DocDefinicao).open({}, window.open('', '_blank'));
                                      //.download();
        //

    }

    gerarRelatorioProdutos(dados: [IProdutos]){
        //https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
        //https://www.youtube.com/watch?v=WG1EYRhny3M&t=1295s

        //http://localhost:3000/relatorioVendas

        const body = [];

        dados.forEach(ele => {
            const linha = new Array();

            linha.push(ele.id)
            linha.push(ele.produto)
            linha.push(ele.categoria)
            linha.push(ele.descricao)
            linha.push(ele.cor)
            linha.push(ele.tamanho)
            //linha.push(ele.obs)
            linha.push(`R$:${ele.valor}`)
            linha.push(ele.status == true ? 'Ativo' : 'Inativo')
            linha.push(ele.quantidade)

            body.push(linha)
        });
        
        var DocDefinicao = null;

        DocDefinicao = {
            content: [
                {
                    columns: [
                        { text: "Relatório de Produtos", style: "header" },
                        { text: moment(new Date()).format("DD/MM/YYYY") + "\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        heights: function (row: number) {
                            return 28;
                        },
                        //widths: [100, "auto", "auto", "auto"],
                        body: [
                            [
                                { text: "Código", style: "columnsTitle" },
                                { text: "Produto", style: "columnsTitle" },
                                { text: "Categoria", style: "columnsTitle" },
                                { text: "Descrição", style: "columnsTitle" },
                                { text: "Cor", style: "columnsTitle" },
                                { text: "Tamanho", style: "columnsTitle" },
                                //{ text: "Obs", style: "columnsTitle" },
                                { text: "Valor", style: "columnsTitle" },
                                { text: "Status", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 13,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 11,
                    bold: true,
                    fillColor: "#7159c1",
                    color: "#FFF",
                    alignment: "center",
                    marginTop: 6,
                    marginLeft: 2,
                    marginRight: 1
                }
            }
        }
        
        PDFMaker.createPdf(DocDefinicao).open({}, window.open('', '_blank'));
                                      //.download();
        //

    }

    gerarRelatorioClientes(dados: [IClientes]){
        //https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
        //https://www.youtube.com/watch?v=WG1EYRhny3M&t=1295s

        //http://localhost:3000/relatorioVendas

        const body = [];

        dados.forEach(ele => {
            const linha = new Array();

            linha.push(ele.id)
            linha.push(ele.nome)
            linha.push(ele.email)
            linha.push(ele.cpf)
            linha.push(moment(ele.nascimento).format("DD/MM/YYYY"))
            linha.push(ele.genero == 'f' ? 'Feminino' : 'Masculino')
            linha.push(ele.civil)
            //linha.push(ele.rg)

            body.push(linha)
        });
        
        var DocDefinicao = null;

        DocDefinicao = {
            content: [
                {
                    columns: [
                        { text: "Relatório de Clientes", style: "header" },
                        { text: moment(new Date()).format("DD/MM/YYYY") + "\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        heights: function (row: number) {
                            return 28;
                        },
                        //widths: [100, "auto", "auto", "auto"],
                        body: [
                            [
                                { text: "Código", style: "columnsTitle" },
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Email", style: "columnsTitle" },
                                { text: "CPF", style: "columnsTitle" },
                                { text: "Nascimento", style: "columnsTitle" },
                                { text: "Genero", style: "columnsTitle" },
                                { text: "Civil", style: "columnsTitle" },
                                //{ text: "RG", style: "columnsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 13,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 11,
                    bold: true,
                    fillColor: "#7159c1",
                    color: "#FFF",
                    alignment: "center",
                    marginTop: 6,
                    marginLeft: 1,
                    marginRight: 1
                }
            }
        }
        
        PDFMaker.createPdf(DocDefinicao).open({}, window.open('', '_blank'));
                                      //.download();
        //

    }

    gerarRelatorioFornecedores(dados: [IFornecedores]){
        //https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
        //https://www.youtube.com/watch?v=WG1EYRhny3M&t=1295s

        //http://localhost:3000/relatorioVendas

        const body = [];

        dados.forEach(ele => {
            const linha = new Array();

            linha.push(ele.id)
            linha.push(ele.nome)
            linha.push(ele.email)
            linha.push(ele.cnpj)
            linha.push(ele.razao)
            linha.push(ele.falarcom)

            body.push(linha)
        });
        
        var DocDefinicao = null;

        DocDefinicao = {
            content: [
                {
                    columns: [
                        { text: "Relatório de Fornecedores", style: "header" },
                        { text: moment(new Date()).format("DD/MM/YYYY") + "\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        heights: function (row: number) {
                            return 28;
                        },
                        //widths: [100, "auto", "auto", "auto"],
                        body: [
                            [
                                { text: "Código", style: "columnsTitle" },
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Email", style: "columnsTitle" },
                                { text: "CNPJ", style: "columnsTitle" },
                                { text: "Razão Social", style: "columnsTitle" },
                                { text: "Falar com", style: "columnsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 13,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 11,
                    bold: true,
                    fillColor: "#7159c1",
                    color: "#FFF",
                    alignment: "center",
                    marginTop: 6,
                    marginLeft: 1,
                    marginRight: 1
                }
            }
        }
        
        PDFMaker.createPdf(DocDefinicao).open({}, window.open('', '_blank'));
                                      //.download();
        //

    }

}

export { GerarRelatorioPDF }

