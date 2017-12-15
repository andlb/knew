import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  conteudo = '';
  displayedColumns = ['descricao', 'codigofab', 'fabricante', 'imagem'];
  elementData: Element[] = [
  ];
  dataSource = new MatTableDataSource(this.elementData);
  constructor(private produtoService: ProdutoService) { }

  applyFilter(key) {
    if (key.keyCode === 13) {
      this.onConsultar();
    }
  }
  ngOnInit() {

  }

  onSelect(row) {
    console.log(row);
  }

  onConsultar() {
    const desc = this.conteudo;
    this.produtoService.getProdutosList(desc).subscribe(document => {
      if (document) {
        console.log(document);
        this.dataSource.data = document;
      }
    });
  }



}

