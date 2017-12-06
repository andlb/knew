
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class VeiculoService {
  constructor(private http: HttpClient){}

  readonly ROOT_URL = 'http://localhost:8080/';
  getMarcas() {
    const url = this.ROOT_URL + 'veiculo/marcas';
    return this.http.get<any[]>(url);
  }

  getModelos() {
    const url = this.ROOT_URL + 'veiculo/modelos/:marca';
    return this.http.get<any[]>(url);
  }

}
