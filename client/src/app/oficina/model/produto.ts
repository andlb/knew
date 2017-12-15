export class Produto {
  public id: string;
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
  public compativel: string;
  public situacao: string;
  public fabricante: {
    marca: string,
    codigo: string
  };
  public imagem: string[];
  public codigomontadora: [{
    montadora: string,
    codigo:  string
  }];

  constructor(dadosjs: any) {
    if (!dadosjs) {
      return;
    }
    this.id = dadosjs._id;
    this.codigoexterno = dadosjs.codigoexterno;
    this.descricao = dadosjs.descricao;
    this.complemento = dadosjs.complemento;
    this.NCM = dadosjs.NCM;
    this.altura = dadosjs.altura ? dadosjs.altura + ' ' + dadosjs.alturaunidade : '';
    this.largura = dadosjs.largura ? dadosjs.largura + ' ' + dadosjs.larguraunidade : '';
    this.comprimento = dadosjs.comprimento ? dadosjs.comprimento + ' ' + dadosjs.comprimentounidade : '';
    this.pesobruto = dadosjs.pesobruto ? dadosjs.pesobruto + ' ' + dadosjs.pesounidade : '';
    this.codigobarras = dadosjs.codigobarras;
    this.linha = dadosjs.linha;

    if ((dadosjs.compativel) && (dadosjs.compativel.length > 0)) {
      console.log('lenght' + dadosjs.compativel.length);
      this.compativel = dadosjs.compativel.join(', ');
    }
    this.situacao = dadosjs.situacao;
    let marca = '';
    let marcaproduto = '';
    if (dadosjs.fabricante) {
      marca = dadosjs.fabricante.marca;
      marcaproduto = dadosjs.fabricante.codigo;
    }
    this.fabricante = {
      marca: marca,
      codigo: marcaproduto
    };
    this.codigomontadora = dadosjs.codigomontadora;
    this.imagem = dadosjs.imagem;
  }

  beforesalvar() {
    const altura = this.altura.split(' ');
    const largura = this.altura.split(' ');
    const comprimento = this.comprimento.split(' ');
    const pesobruto = this.pesobruto.split(' ');
    if (altura.length > 1) {
      this.altura = altura[0];
      this.alturaunidade = altura[1];
    }
    if (largura.length > 1) {
      this.largura = largura[0];
      this.larguraunidade = largura[1];
    }
    if (comprimento.length > 1) {
      this.comprimento = comprimento[0];
      this.comprimentounidade = comprimento[1];
    }
    if (pesobruto.length > 1) {
      this.pesobruto = pesobruto[0];
      this.pesounidade = pesobruto[1];
    }
    return this;
  }
}
