// recurso que da a possibilidade de usar o decorator @Injectable
import { Injectable } from '@angular/core';

// fazer os imports necessarios
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http'; // classe qua vai auxiliar na construção das requisições http feitas para o backend
import { Observable, tap, catchError, throwError} from 'rxjs'; // bibliotecas usada para operar com a assincronicidade necessaria para o funcionamento das requisições e repostas http
// Observable: representa o fluxo de dados assincrono do projeto - na camada lógica
// tap: operador que permite executar ações secundárias sem modifica o fluxo principal

import { Usuario  } from '../models/user/user-module'; // importação do model USer

// o uso deste decorator permite que esta classe, se necesasrio for, possa ser "injetada" por outra classe
// ou seja, o uso do INjectable diz que esta classe é passivel de receber uma injeção de dependencia
// @Component - decorator que definie cada componente do projeto é "filho" do decorator @Injectable
@Injectable({
  providedIn: 'root' // esta expressão lógica indica o seguinte: que o service será disponibilizado no nivel "raiz/root" da aplicação(singleton), ou seja, uma única instancia será compartilhada em toda a aplicação
  //singleton: nada mais é do que uma instancia unica de uma classe qualquer  
})


export class AutenticacaoService {

  // 1º passo: definir a url-base para a integração do front-end com o backend
  // aqui é importante indicar em qual "endereço" o backend está "rodando"

  // exemplo: queremosinseri um registro no banco de dados. Como pode ser feito?
  // no backend, o endpoint é o seguinte: '/users/register'
  // http://localhost:8080/api/users/register
  private apiUrl = 'http://localhost:8080/api' 

  // 2º passo: definir no construtor a injeção de dependencia da classe HttpClient. Por que? R.: Porque é a partir do uso desta injeção de dependencia é que serão realizadas a requisções http para as APIs do backend: 'http://localhost:8080/api'
  // o service depende deste recurso para fazer as requisições http
  constructor(private http: HttpClient) { } // a var http é a injeção de dependencia gerada da classe HttpClient; esta var será conhecida por nós como um objeto referencial


  /*
  ===============================================================================================================
                          AQUI, VAMOS DEFINIR AS REQUISIÇÕES AOS ENDPOINTS DAS APIs
  ===============================================================================================================
  */

  // 3º passo: definir a requisição - e seus elementos logicos necesarios - para o endpoint de cadastro
  // definir o método register(){}: porque é, a partir dele, que a requisição ao backend será feita
  // ao usar esta expressão: register(): Observable<{message: string}>{} acabamos de definir que o metodo register(){} passa a ser uma tarefa assincrona 
  registro(usuario: Usuario, roleName: string): Observable<{message: string}>{
    // agora, será preciso definir a expressão de retorno do método
    return this.http.post<{message: string}>(`${this.apiUrl}/usuarios/registro?roleName=${roleName}`, usuario)
  }//@postmapping

  /*
    user: parametro/objeto vai conter os dados que queremos enviar para a base
    roleName: nome do "papel" do usuario dentro do sistema ('admin' ou 'user')
    requisição ao backend: estamos fazendo uma requisição POST - para enviar dados para o backend - através da "rota/endpoint" ${apiUrl}/user/register; alem disso, tambem estamos passando, por esta "rota" o "papel" do usuario como um parametro da consulta(roleName)
    retorno: um elemento Observable que emite um objeto com uma mensagem de suscesso ou erro.
  */

  // 4º passo: definir o método de login
  // temos de transforma-lo numa requisição assincrona parametrizando o método par receber os dados com os quais ele vai lidar
  login(credentials: {email: string, senha:string}): Observable<{message: string}>{
  // definir, qui, uma constante para receber como valor as credenciais de acesso com o intuito de garantir que os dados de email e senha, realment cheguem ao backend
    const authHeader = `Basic ${btoa(`${credentials.email}:${credentials.senha}`)}` // encriptando as credenciais
    console.log('Enviando para o backend: ' , credentials)   

  // definir a expressão de retorno do método/ requisição ao backend
  // http://localhost:8080/api/users/login
    return this.http.post<{message:string}>(`${this.apiUrl}/usuarios/login`, credentials, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
    .pipe(
      tap(() =>{
        console.log('Login bem sucedido!')
        localStorage.setItem('authHeader', authHeader) //atualiza o state/estado da aplicação
      })//@postmapping
    )
  }

/*
withCredentials: true :esta é a instrução que permite o uso de Cookies -  o uso dos cookies é importante pois estamos lidando com a instauração de sessões - sessions - para o redirecionamento e navegação entre componentes do projeto; integrados, totalmente com o backend onde possuimos rotas protegidas por ROLES   
tap: operador que permite executar ações secundárias sem modifica o fluxo principal; armazenando no loaclStorage que o usuario esta autenticado - ou seja, estamos mantendo a sessão do usuario, ativa!
localStorage: método que auxilia na psersitencia da sessão do usuario logado
*/

// 5º passo: definir um novo método; este método possui um unico objetivo simples: verificar se o usuario esta logado no sistema
  isLoggedIn(): boolean{
      return !!localStorage.getItem('authHeader') // verificando se ele, usuario, esta logado e se há autenticação slva
  }

// 6º passo: se o usuario estiver autenticado, vamos obter a autenticação
  getAuthHeader(): string{
      return localStorage.getItem('authHeader') || ''
  }

// 7º passo: definir um método para obter o usuario atual - que, no momento, está logado no sistema
  getCurrentUsuarioEmail(): Observable<{email: string}>{
// definir a expressão de retorno do método
      return this.http.get<{email: string}>(`${this.apiUrl}/usuarios/current-usuario`, {
        headers: new HttpHeaders({ Authorization: this.getAuthHeader()})
    })//getmapping

// método/tarefa assincrona que recupera o usuario logado no sistema
// requisição: get para a rota `${this.apiUrl}/users/current-user`, habilitando o uso de cookies {withCredentials: true}
}

  // 8º passo: definir o método de logout
  //tambem tarefa assincrona
  logout(): Observable<void>{
        return this.http.post<void>(`${this.apiUrl}/usuarios/logout`, {}, {headers: new HttpHeaders({
          Authorization: this.getAuthHeader()
        })})
        .pipe(
          tap(() =>{
            localStorage.removeItem('authHeader')// remove o state/estado da autenticação, ou seja, encerrando a sessão de usuario.
            console.log('Usuario deslogado!')
          })//postmapping
        )
  // pipe(): este método é usado para auxiliar na execuçã de tarefas assincronas. O proposito do pipe é estabelecer um "canal" de comunicação direta entre recursos assincronos do componente.
  }

 // 6º passo: definir o método/tarefa assincrona que atualiza/altera uma anotação desde que esteja devidamente armazenada na base
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario>{
      return this.http.put<Usuario>(`${this.apiUrl}/registros/upLocalDateUsuario/${id}`, usuario, {withCredentials: true})
      .pipe(
        catchError(this.handleError)
      )//@putmapping
  }
    
  // função de tratamento de erros
  private handleError(error: HttpErrorResponse){
  // definir uma var para receber como valor uma string padrão
      let errorMessage = 'Erro desconhecido'

  // verificar em que "pedaço" da aplicação o erro ocorre- se no front ou no backend
      if(error.error instanceof ErrorEvent){
  // instanceof é o operador do js que dá a possibilidade de verificar se existe algum objeto gerado a partir de alguma classe
  // fazendo deste operador, estamos verificando se existe algum objeto gerado a partir de ErrorEvent; caso o operador retorne TRUE significa que um objeto gerado de ErrorEvent. Se isso foi, realmente, verificado o erro ocorreu no FRONTEND
        errorMessage = `Erro: ${error.error.message}`
      }else{
  // caso contrario - se naão existir uma instancia de ErrorEvent - significa que o erro é no backend
        errorMessage = `Codigo do erro: ${error.status}, Mensagem: ${error.message}`

  // definir um novo if() para obter detalhes do erro
        if(error.error && error.error.message){
          errorMessage = errorMessage + ` | Detalhes: ${error.error.message}`
        }
      }

  // fazer da função auxiliar log() para observar o comportamento da var errorMessage via terminal do browser
      console.log(errorMessage)

  // definir a expressão de retorno da função/metodo
      return throwError(() => new Error(errorMessage))

  }
      
}
