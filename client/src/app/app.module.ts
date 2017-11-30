import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { OficinaComponent } from './oficina/oficina.component';
import { VeiculoComponent } from './oficina/cadastro/veiculo/veiculo.component';
import { PecaComponent } from './oficina/cadastro/peca/peca.component';
import { ServicoComponent } from './oficina/cadastro/servico/servico.component';


@NgModule({
  declarations: [
    AppComponent,
    OficinaComponent,
    VeiculoComponent,
    PecaComponent,
    ServicoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
