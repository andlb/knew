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
import {MatSnackBar} from '@angular/material';
import { Veiculo } from '../../model/veiculo';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  @ViewChild('placa') placa: ElementRef;
  readonly ROOT_URL = 'http://localhost:8080/';
  novo = true;
  editar = false;
  consultar = false;
  dadosForm: FormGroup;
  veiculo;
  carroControl: FormControl;
  veiculos = [];


  filteredVeiculos: Observable<any>;

  constructor(public snackBar: MatSnackBar,
  private http: HttpClient) {}

  ngOnInit() {
    this.editar = false;
    this.veiculo = new Veiculo({});
    this.carroControl = new FormControl(this.veiculo.carro);
    this.dadosForm = new FormGroup({
      'placa': new FormControl(this.veiculo.placa,
          [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/[A-Z]{3}-?\d{3}/)]),
      'carro': this.carroControl,
      'marca': new FormControl(this.veiculo.marca),
      'modelo': new FormControl(this.veiculo.modelo),
      'versao': new FormControl(this.veiculo.versao),
      'anofab': new FormControl(this.veiculo.anofab),
      'anomod': new FormControl(this.veiculo.anomod),
      'combustivel': new FormControl(this.veiculo.combustivel),
      'kmmedio': new FormControl(this.veiculo.mkmedio),
      'renavam': new FormControl(this.veiculo.renavam),
      'chassi': new FormControl(this.veiculo.chassi),
      'cor': new FormControl(this.veiculo.cor),
      'acessorios': new FormControl(this.veiculo.acessorios),
    });
    this.filteredVeiculos = this.carroControl.valueChanges
     .pipe(
       startWith(''),
       map(val => this.getCarros(val))
     );

  }


  onLimpar() {
    this.novo = true;
    this.editar = false;
    this.consultar = false;
    this.dadosForm.reset();
  }

  onConsultar() {
    if (!this.dadosForm.value['placa']) {
      this.snackBar.open('Placa do veículo não informada', '' , {
        duration: 2000
      } );
      this.placa.nativeElement.focus();
    }
    this.novo = false;
    this.consultar = false;
    this.editar = true;
  }

  onEditar() {
    this.editar = true;
    console.log('onEditar');
  }

  onSalvar() {
    this.veiculo = new Veiculo(this.dadosForm.value);
  }

  getCarros(val): Observable<any>  {
    const url = this.ROOT_URL + 'veiculo/' + val;
    return this.http.get(url);
  }

  // Go to database and return the matchs.
  filterVeiculo(val): string[] {
    console.log('filter veiculo');
    console.log(val);
    return [];
  }

}
