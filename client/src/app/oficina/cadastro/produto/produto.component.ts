import { Subscription } from 'rxjs/Subscription';
import { Produto } from './../../model/produto';
import { MatSnackBar } from '@angular/material';
import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProdutoActions from './store/produto.actions';
import * as fromProduto from './store/produto.reducers';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit, OnDestroy {
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
  processamento = false;
  pesqsubscribe: Subscription;
  produto: Produto = new Produto({});
  constructor(
    public snackBar: MatSnackBar,
    private produtoService: ProdutoService,
    private store: Store<fromProduto.FeatureState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new ProdutoActions.NewProduto());
    this.pesqsubscribe = this.store.select('produto').subscribe((retorno: any) => {
      this.processamento = false;
      if (retorno.mensagem) {
        this.showErro(retorno.mensagem);
        return;
      }
      if (retorno.produto) {
        this.fetchProduto(retorno.produto);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.pesqsubscribe) { this.pesqsubscribe.unsubscribe(); }
  }

  showErro(mensagem: any) {
    this.snackBar.open(mensagem.mensagem.message, '', {
      duration: 3000,
      extraClasses: ['alert-snackbar']
    });
  }

  fetchProduto(produto) {
    this.produto = new Produto(produto);
  }

  getProduto() {
    if (this.produto._id) {
      this.store.dispatch(new ProdutoActions.SearchProduto(this.produto._id));
      this.processamento = true;
    }
  }


}
