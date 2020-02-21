import { Component, OnInit } from '@angular/core';

//meus imports
import { ProdutoService } from '../../../shared/services/produto_sc/produto.service';
import { Produto } from '../../../models/produto.model';
import { NgForm, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  produto = {} as Produto;
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  //Carregar todos produtos ao iniciar o componente
  ngOnInit() {
    this.getProdutos();
  }

  //Define se o produto será editado ou atualizado
  saveProduto(form: NgForm){
    if(this.produto.TABPROD_seq_tabprod !== undefined){
      this.produtoService.updateProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }else{
      this.produtoService.saveProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Carregar todos os produtos
  getProdutos(){
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  //Deleta um produto
  deleteProduto(produto: Produto){
    this.produtoService.deleteProduto(produto).subscribe(() => {
      this.getProdutos();
    })
  }

  //Copia o produto clicado para o formulário para ser editado
  editProduto(produto: Produto){
    this.produto = { ...produto };
  }

  //Limpar o formulário
  cleanForm(form: NgForm){
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produto;
  }

}
