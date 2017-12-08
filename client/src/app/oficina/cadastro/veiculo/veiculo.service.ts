import { Observable } from 'rxjs/Observable';
import { Veiculo } from './../../model/veiculo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';


@Injectable()
export class VeiculoService {
  constructor(private http: HttpClient) {}

  readonly ROOT_URL = 'http://localhost:8080/';

  getMarcas() {
    const url = this.ROOT_URL + 'veiculo/marcas';
    return this.http.get<any[]>(url);
  }
  // return the car models from a marca.
  getModelos(marca, modeloid?) {
    let url = this.ROOT_URL + 'veiculo/modelo/' + marca;
    if (modeloid) {
      url = url + '/' + modeloid;
    }
    return this.http.get<any[]>(url);
  }

  getVeiculos(val): Observable<any[]>{
    const url = this.ROOT_URL + 'veiculo/anomodelo/' + val;
    return this.http.get<any[]>(url);
  }

  //
  buscaPlaca(placa): any {
    const url = this.ROOT_URL + 'veiculo/buscaplaca/' + placa;
    return this.http.get<any[]>(url);
  }

  salvar(veiculo: Veiculo) {
    const url = this.ROOT_URL + 'veiculo/salvar';
    return this.http.post(url, veiculo);
  }
}
