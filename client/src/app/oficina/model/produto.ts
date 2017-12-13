export class Produto {
  public _id: string;
  public codigoexterno: string;
  public descricao: string;
  public complemento: string;
  public NCM: string;
  public altura: string;
  public alturaunidade: string;
  public largura: string;
  public larguraunidade: string;
  public comprimento: string;
  public comprimentounidade: string;
  public pesobruto: string;
  public pesounidade: string;
  public codigobarras: string;
  public linha: string;
  public compativel: string[];
  public situacao: string;
  public fabricante: {
    marca: string,
    codigo: string
  };
  public imagem: string[];

  public codigomontadora: [{
    montadora: {type: string},
    codigo: {type: string},
  }];
  constructor(dadosjs: any) {
    if (!dadosjs) {
      return;
    }
    this._id = dadosjs._id;
    this.codigoexterno = dadosjs.codigoexterno;
    this.descricao = dadosjs.descricao;
    this.complemento = dadosjs.complemento;
    this.NCM = dadosjs.NCM;
    this.altura = dadosjs.altura;
    this.alturaunidade = dadosjs.alturaunidade;
    this.largura = dadosjs.largura;
    this.larguraunidade = dadosjs.larguraunidade;
    this.comprimento = dadosjs.comprimento;
    this.comprimentounidade = dadosjs.comprimentounidade;
    this.pesobruto = dadosjs.pesobruto;
    this.pesounidade = dadosjs.pesounidade;
    this.codigobarras = dadosjs.codigobarras;
    this.linha = dadosjs.linha;
    this.compativel = dadosjs.compativel;
    this.situacao = dadosjs.situacao;
    this.fabricante = dadosjs.fabricante;
    this.codigomontadora = dadosjs.codigomontadora;
    this.imagem = dadosjs.imagem;
  }

}
