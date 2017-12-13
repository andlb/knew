import { ProdutoEffects } from './oficina/cadastro/produto/store/produto.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import { OficinaComponent } from './oficina/oficina.component';
import { VeiculoComponent } from './oficina/cadastro/veiculo/veiculo.component';
import { ServicoComponent } from './oficina/cadastro/servico/servico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { veiculoReducer } from './oficina/cadastro/veiculo/store/veiculo.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { VeiculoEffects } from './oficina/cadastro/veiculo/store/veiculo.effects';
import { VeiculoService } from './oficina/cadastro/veiculo/veiculo.service';
import { ProdutoService } from './oficina/cadastro/produto/produto.service';
import { ProdutoComponent } from './oficina/cadastro/produto/produto.component';
import { ProdutoListComponent } from './oficina/cadastro/produto/produto-list.component';
import { produtoReducer } from './oficina/cadastro/produto/store/produto.reducers';

@NgModule({
  declarations: [
    AppComponent,
    OficinaComponent,
    VeiculoComponent,
    ServicoComponent,
    ProdutoComponent,
    ProdutoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({veiculo: veiculoReducer, produto: produtoReducer}),
    EffectsModule.forRoot([VeiculoEffects, ProdutoEffects]),
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [VeiculoService,ProdutoService],

  bootstrap: [AppComponent]
})
export class AppModule { }
