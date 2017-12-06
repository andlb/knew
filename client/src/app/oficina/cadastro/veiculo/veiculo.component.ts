import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import * as VeiculoActions from './store/veiculo.actions';
import * as fromVeiculo from './store/veiculo.reducers';
import { Veiculo } from '../../model/veiculo';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  @ViewChild('placa') placa: ElementRef;
  readonly ROOT_URL = 'http://localhost:8080/';
  veiculoState: Observable<fromVeiculo.FeatureState>;
  novo = true;
  editar = false;
  consultar = false;
  carroControl: FormControl;
  filteredVeiculos = [];
  lastKeypress = 0;
  veiculo: Veiculo = new Veiculo({});
  marcas = [];
  constructor(
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private store: Store<fromVeiculo.FeatureState>
  ) {

  }

  ngOnInit() {
    console.log(this.veiculo);
    this.store.select('veiculos').subscribe(data => {
      this.veiculo = new Veiculo(data.veiculos);
    });
    this.editar = false;
    this.veiculo = new Veiculo({});
    this.carroControl = new FormControl();
  }

  dataChanged(event) {
    if (Date.now() - this.lastKeypress > 200) {
      const url = this.ROOT_URL + 'veiculo/' + event;
      this.http.get<any[]>(url).subscribe(retorno => {
        this.filteredVeiculos = retorno;
      });
      this.lastKeypress = Date.now();
    }
  }

  onLimpar() {
    this.novo = true;
    this.editar = false;
    this.consultar = false;
  }

  onConsultar() {
    console.log('placa ' + this.veiculo.placa);
    if (!this.veiculo.placa) {
      this.snackBar.open('Placa do veículo não informada', '', {
        duration: 2000
      });
      this.placa.nativeElement.focus();
    }
    this.novo = false;
    this.consultar = false;
    this.editar = true;
    this.store.dispatch(new VeiculoActions.SearchVeiculo(this.veiculo.placa));
  }

  onEditar() {
    this.editar = true;
    console.log('onEditar');
  }

  onSalvar() {
    // this.veiculo = new Veiculo(this.dadosForm.value);
  }

  getCarros(val): Observable<any[]> {
    const url = this.ROOT_URL + 'veiculo/anomodelo/' + val;
    this.http.get<any[]>(url).subscribe(veiculos => {
      this.filteredVeiculos = veiculos;
    });
    return this.http.get<any[]>(url);
  }

  displayFn(tVeiculo: any): string {
    return tVeiculo ? tVeiculo.descricaocompleta : tVeiculo;
  }

  selected(event) {
    console.log(event);
    console.log(this.veiculo);
  }

}
