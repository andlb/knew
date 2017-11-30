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
import { Veiculo } from './../model/veiculo';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  @ViewChild('placa') placa: ElementRef;
  novo = true;
  editar = false;
  consultar = false;
  dadosForm: FormGroup;
  veiculo;
  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.editar = false;
    this.veiculo = new Veiculo({});
    this.dadosForm = new FormGroup({
      'placa': new FormControl(this.veiculo.placa,
          [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/[A-Z]{3}-?\d{3}/)]),
      'carro': new FormControl(this.veiculo.carro),
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
}
