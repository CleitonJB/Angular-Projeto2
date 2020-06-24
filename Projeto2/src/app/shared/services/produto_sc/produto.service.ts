import { Injectable } from '@angular/core';
//meus imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../../models/produto.model';    //modelo de produto

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  //Link padrão para o servidor 
  url = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/";

  //Header(cabeçalho para os métodos que solicite-o)
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      //'Authorization': 'Bearer ' + localStorage.getItem("token"),
      //'Access-Control-Allow-Origin': '*', 
      //'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE', 
      //'Access-Control-Allow-Headers': '*',
    }) 
  };

  //Injeção do HttpClient
  constructor(private http: HttpClient) { }
  
  //Obter todos os produtos
  getProdutos(): Observable<any>{
    return this.http.get<Produto[]>(this.url + 'Produtos_SelecionarTodos_Get', this.httpOption);
  }

  //Obter produto pelo id
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.url + 'Produtos_SelecionarTodos_Get/' + id);
  }

  //Adicionar um novo produto
  createProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url + 'Produtos_Incluir_Post', JSON.stringify(produto), this.httpOption);
  }

  //Atualizar produto
  updateProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url + 'Produtos_Alterar_Post', JSON.stringify(produto), this.httpOption);
  }

  //Exluir produto
  deleteProduto(produto: Produto): Observable<Produto>{
    return this.http.delete<Produto>(this.url + 'Produtos_Selecionar_Get/' + produto.TABPROD_seq_tabprod, this.httpOption);
  }
  
  //Gerenciador de erros
   
}
