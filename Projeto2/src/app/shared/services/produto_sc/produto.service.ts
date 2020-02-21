import { Injectable } from '@angular/core';

//meus imports
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs'
import { Produto } from '../../../models/produto.model';    //modelo de produto

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  //Link padrão para o servidor 
  url = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/";

  constructor(private http: HttpClient) { }

  //Header(cabeçalho para os métodos que solicite-o)
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      'Authorization': 'jwt-token'
    })
  };
  
  //Obter todos os produtos
  getProdutos(): Observable<any>{
    return this.http.get<Produto[]>(this.url + 'Produtos_SelecionarTodos_Get')
    .pipe(
      retry(3), catchError(this.handleError<Produto[]>('getProdutos', []))
    );
  }

  //Obter produto pelo id
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.url + 'Produtos_SelecionarTodos_Get/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Adicionar um novo produto
  saveProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url + 'Produtos_Incluir_Post', JSON.stringify(produto), this.httpOption)
    .pipe(
      //retry(1),
      catchError(this.handleError)
    )
  }

  //Atualizar produto
  updateProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(this.url + 'Produtos_Alterar_Post/' + produto.TABPROD_seq_tabprod, JSON.stringify(produto), this.httpOption)
    .pipe(
      //retry(1),
      catchError(this.handleError)
    )
  }

  //Exluir produto
  deleteProduto(produto: Produto): Observable<Produto>{
    return this.http.delete<Produto>(this.url + 'Produtos_Selecionar_Get/' + produto.TABPROD_seq_tabprod, this.httpOption)
    .pipe(
      //retry(1),
      catchError(this.handleError)
    )
  }
  
  //gerenciador de erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
  /*Gerenciador de erros
  handleError(error: HttpErrorResponse){
    //variavel com a mensagem de erro
    let errorMensagem = '';
    if(error.error instanceof ErrorEvent){
      //Erro no lado do cliente
      errorMensagem = 'Erro no cliente: \n' + error.error.message;
    }else{
      //Erro no lado do server
      errorMensagem = 'Erro no servidor: \n' +`Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }

    //Mostrar erro no console
    console.log(errorMensagem);
    return throwError(errorMensagem);
  } */
}
