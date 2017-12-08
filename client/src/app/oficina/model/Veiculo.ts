export class Veiculo {
  public placa: string;
  public carro: string;
  public marca: string;
  public modelo: string;
  public anofab: string;
  public anomod: string;
  public combustivel: string;
  public kmmedio: string;
  public renavam: string;
  public chassi: string;
  public cor: string;
  public acessorios: string[];
  constructor(dadosjs: any) {
    if (!dadosjs) {
      return;
    }
    this.placa = dadosjs.placa;
    this.carro = dadosjs.carro;
    this.marca = dadosjs.marca;
    this.modelo = dadosjs.modelo;
    this.anofab = dadosjs.anofab;
    this.anomod = dadosjs.anomod;
    this.combustivel = dadosjs.combustivel;
    this.kmmedio = dadosjs.kmmedio;
    this.renavam = dadosjs.renavam;
    this.chassi = dadosjs.chassi;
    this.cor = dadosjs.cor;
    this.acessorios = dadosjs.acessorios;
  }
}
