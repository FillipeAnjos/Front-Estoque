import moment from "moment";
import PDFMaker from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts";
PDFMaker.vfs = pdfFonts.pdfMake.vfs;

interface Ivendas{
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

class GerarRelatorioPDF{

    gerarRelatorioVendas(dados: [Ivendas]){
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
                        heights: function (row) {
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

}

export { GerarRelatorioPDF }

