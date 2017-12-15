import { element } from 'protractor';
import { Subscription } from 'rxjs/Subscription';
import { Produto } from './../../model/produto';
import { MatSnackBar } from '@angular/material';
import { ProdutoService } from './produto.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  novo = false;
  editar = false;
  consultar = true;
  processamento = false;
  imagem = '/assets/indisponivel.png';


  montadora = {
    codigo: '',
    posicao: '-1',
    descricao: ''
  };

  // TODO: pegar o usuário da tabela de usuário.
  usuario = 15;
  pesqsubscribe: Subscription;
  produto: Produto = new Produto({});
  @ViewChild('codigo') codigo: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('fmontadora') fmontadora: ElementRef;



  constructor(
    public snackBar: MatSnackBar,
    private produtoService: ProdutoService,
    private store: Store<fromProduto.FeatureState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new ProdutoActions.NewProduto());
    this.codigo.nativeElement.focus();
    this.pesqsubscribe = this.store.select('produto').subscribe((retorno: any) => {
      this.processamento = false;
      if (retorno.mensagem) {
        this.showErro(retorno.mensagem.message, retorno.mensagem.erro);
        if (!retorno.mensagem.erro) {
          this.onLimpar();
        }
        return;
      }
      if (retorno.produto) {
        this.fetchProduto(retorno.produto);
      }
    });
  }
  // return produto data.
  fetchProduto(produto) {

    if (produto.id) {
      this.produto = produto;
      this.codigo.nativeElement.focus();
      this.imagem = this.produto.imagem[0];
      this.novo = true;
      this.editar = true;
      this.consultar = false;
    }
  }

  onLimpar() {
    this.limpamontadora();
    this.novo = false;
    this.editar = false;
    this.consultar = true;
    this.produto = new Produto({});
    this.imagem = '';
    this.codigo.nativeElement.focus();

  }

  onConsultar() {

    if (this.produto.id) {
      this.store.dispatch(new ProdutoActions.SearchProduto(this.produto.id, String(this.usuario)));
      this.processamento = true;
    }
  }

  onNovo() {
    this.novo = true;
    this.editar = false;
    this.consultar = false;
    this.desc.nativeElement.focus();
    this.produto.id = '';
  }

  ngOnDestroy(): void {
    if (this.pesqsubscribe) { this.pesqsubscribe.unsubscribe(); }
  }

  showErro(mensagem: any, erro: any) {
    let classe = 'inform-snackbar';
    if (erro) {
      classe  = 'alert-snackbar';
    }
    this.snackBar.open(mensagem, '', {
      duration: 3000,
      extraClasses: [classe]
    });
  }

  mudaImagem(endereco) {
    this.imagem = endereco;
  }

  editarmontadora(posicao) {
    this.montadora.codigo = this.produto.codigomontadora[posicao].codigo;
    this.montadora.posicao = posicao;
    this.montadora.descricao = this.produto.codigomontadora[posicao].montadora;
    this.fmontadora.nativeElement.focus();
  }

  limpamontadora() {
    this.montadora.codigo = '';
    this.montadora.posicao = '-1';
    this.montadora.descricao = '';
  }


  deletarmontadora(posicao) {
    this.produto.codigomontadora.splice(posicao, 1);
    this.limpamontadora();
    this.fmontadora.nativeElement.focus();
  }


  alterarmontadora(montadora) {
    if (!(montadora.descricao) || !(montadora.codigo)) {
      this.showErro('Informe o nome da montadora e o código na montadora',true);
      return;
    }
    if (montadora.descricao) {
      const pos = montadora.posicao;
      if (pos > -1) {
        this.produto.codigomontadora[pos].montadora = montadora.descricao;
        this.produto.codigomontadora[pos].codigo = montadora.codigo;
      } else {
        const tMontadora = {
          montadora: montadora.descricao,
          codigo: montadora.codigo
        };
        this.produto.codigomontadora.push(tMontadora);
      }
      this.limpamontadora();
      this.fmontadora.nativeElement.focus();
    }
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
    const produto = this.produto.beforesalvar();
    console.log('produto antes de chamar o store');
    console.log(produto);
    this.store.dispatch(new ProdutoActions.StoreProduto(produto));
  }
}
