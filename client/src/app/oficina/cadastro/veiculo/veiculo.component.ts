'use strict';
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
import * as VeiculoActions from './store/veiculo.actions';
import * as fromVeiculo from './store/veiculo.reducers';
import { Veiculo } from '../../model/veiculo';
import { VeiculoService } from './veiculo.service';
import { Subscription } from 'rxjs/Subscription';
import {
  catchError,
  map,
  tap,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit, OnDestroy {
  modeloControl = new FormControl();
  veiculoControl = new FormControl();

  @ViewChild('placa') placa: ElementRef;
  @ViewChild('veiculocarro') veiculocarro: ElementRef;

  readonly ROOT_URL = 'http://localhost:8080/';

  marcasubscribe: Subscription;
  carrossubscribe: Subscription;

  veiculoState: Observable<fromVeiculo.FeatureState>;
  novo = true;
  editar = false;
  consultar = false;
  // carroControl: FormControl;
  filteredVeiculos: Observable<any[]>;
  filteredModelo: Observable<any[]>;
  lastKeypress = 0;
  veiculo: Veiculo = new Veiculo({});
  marcas = [];
  modelos = [];

  constructor(
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private veiculoService: VeiculoService,
    private store: Store<fromVeiculo.FeatureState>
  ) {}

  ngOnInit() {
    this.veiculo = new Veiculo({});
    this.store.select('veiculo').subscribe(data => {
      // depois de salvar os dados.
      if (data.mensagem) {
        this.mensagemErro(data);
      } else {
        if (this.veiculo.placa) {
          this.veiculo = new Veiculo(data.veiculo);
          this.afterConsultar();
        }
      }
    });
    this.marcasubscribe = this.veiculoService.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });
    this.filteredModelo = this.modeloControl.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged(),
      map(
        descModelo =>
          descModelo ? this.filterModelo(descModelo) : this.modelos.slice()
      )
    );

    this.filteredVeiculos = this.veiculoControl.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filterVeiculo(val || '');
      })
    );

    this.editar = false;
    this.placa.nativeElement.focus();
  }

  mensagemErro(data) {
    if (data.mensagem.erro) {
      this.snackBar.open(data.mensagem.message, '', {
        duration: 3000,
        extraClasses: ['inform-snackbar']
      });
    } else {
      this.snackBar.open(data.mensagem.message, '', {
        duration: 3000,
        extraClasses: ['alert-snackbar']
      });
      this.onLimpar();
    }
  }

  afterConsultar() {
    this.getModelo(this.veiculo.marca, this.veiculo.modelo);
    this.veiculocarro.nativeElement.focus();
    this.novo = false;
    this.consultar = false;
    this.editar = true;
  }

  ngOnDestroy(): void {
    if (this.marcasubscribe) {
      this.marcasubscribe.unsubscribe();
    }
    if (this.carrossubscribe) {
      this.carrossubscribe.unsubscribe();
    }
  }

  getObservableModelo(marca, modelo): Observable<any[]> {
    return this.veiculoService
      .getModelos(marca, modelo)
      .map(response => response);
  }

  getModelo(marca, modelo) {
    this.filteredModelo = this.getObservableModelo(
      this.veiculo.marca,
      this.veiculo.modelo
    );
    this.filteredModelo.subscribe(resp => {
      this.modeloControl.setValue(resp[0]);
    });
  }

  filterVeiculo(val): Observable<any[]> {
    return this.veiculoService.getVeiculos(val).pipe(map(response => response));
  }

  onLimpar() {
    this.novo = true;
    this.editar = false;
    this.consultar = false;
    this.veiculo = new Veiculo({});
    this.placa.nativeElement.focus();
    this.store.dispatch(new VeiculoActions.NewVeiculo());
  }

  onConsultar() {
    if (this.novo) {
      if (!this.veiculo.placa) {
        this.snackBar.open('Placa do veículo não informada', '', {
          duration: 3000,
          extraClasses: ['inform-snackbar']
        });
        this.placa.nativeElement.focus();
        return;
      }
      this.store.dispatch(new VeiculoActions.SearchVeiculo(this.veiculo.placa));
    }
  }

  onEditar() {
    this.editar = true;
  }

  onSalvar(f) {
    if (!f.valid) {
      this.snackBar.open(
        'Os campos em vermelhor precisam ser preenchido(s)',
        '',
        {
          duration: 3000,
          extraClasses: ['alert-snackbar']
        }
      );
      return;
    }
    this.store.dispatch(new VeiculoActions.StoreVeiculo(this.veiculo));
    return;
  }

  filterModelo(val: string): any[] {
    if (!this.modelos) {
      return [];
    }
    return this.modelos.filter(option => {
      return this.verificaArrayTexto(val, option.modelo);
    });
  }

  verificaArrayTexto(valor, compvalor) {
    const tVal = valor.split(' ');
    let length = tVal.length;
    while (length--) {
      if (compvalor.toLowerCase().indexOf(tVal[length].toLowerCase()) === -1) {
        return false;
      }
    }
    return true;
  }

  displayVeiculo(tVeiculo: any): string {
    return tVeiculo ? tVeiculo.descricaocompleta : tVeiculo;
  }

  displayModeloVeiculo(tModelo: any): string {
    return tModelo ? tModelo.modelo : tModelo;
  }

  selectVeiculo(event, veiculo) {
    try {
      this.veiculoService
        .getModelos(veiculo.idmarca, veiculo.idmodelo)
        .subscribe(modelos => {
          this.modelos = modelos;
          this.veiculo.marca = veiculo.idmarca;
          this.veiculo.modelo = veiculo.idmodelo;
          this.veiculo.anomod = veiculo.idfipe.split('-')[0];
          this.getModelo(veiculo.idmarca, veiculo.idmodelo);
        });
    } catch (ex) {
      console.log(ex);
      // TODO: colocar uma rotina para acrescentar o erro.
    }
  }

  marcaValueChange(event) {
    return this.veiculoService
      .getModelos(this.veiculo.marca)
      .subscribe(response => {
        this.modelos = response;
      });
  }
}
