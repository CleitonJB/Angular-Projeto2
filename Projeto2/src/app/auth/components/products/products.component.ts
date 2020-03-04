import { Component, OnInit } from '@angular/core';

//meus imports
import { ProdutoService } from '../../../shared/services/produto_sc/produto.service';
import { Produto } from '../../../models/produto.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //Variável para createProduto()
  adicionar = false;
  //Variável para updateProduto()
  atualizar = false;

  produto = {} as Produto;
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  //Carregar todos produtos ao iniciar o componente
  ngOnInit() {
    this.getProdutos();
  }

  //Carregar todos os produtos
  getProdutos(){
    console.log('Carregando produtos...');
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  createProduto(form: NgForm){
    this.produtoService.createProduto(this.produto).subscribe(produto => {
      console.log('Resposta do Server: ', produto);
      console.log('Produto criado com sucesso!');
      //Atualizar lista de produtos
      this.getProdutos();
    });
    //Esconder div de Adicionar produto
    this.adicionar = !this.adicionar;
  }

  updateProduto(form: NgForm){
    this.produtoService.updateProduto(this.produto).subscribe(produto => {
      console.log('Resposta do Server: ', produto);
      console.log('Produto alterado!');
      //Atualizar lista de produtos
      this.getProdutos();
    });
    //Esconder div de Atualizar produto
    this.atualizar = !this.atualizar;
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
    this.atualizar = !this.atualizar;
  }

  //Limpar o formulário
  cleanForm(form: NgForm){
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produto;
  }

  //Esconder div de Atualizar produto
  cancelar(){
    this.atualizar = false;
    this.adicionar = false;
  }
}
