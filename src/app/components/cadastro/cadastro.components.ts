import { Component } from '@angular/core';
// Fazer as importações necessárias
import { FormsModule } from '@angular/forms'; // este recurso é necessário para a operação com formulários do angular
//import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/user/user-module'; // Este é o model que "trata" todos os dados referentes a usuários
import { response } from 'express';
import { LoginComponents } from '../../components/login/login.components';
import { AutenticacaoService } from '../../service/auth.service';
@Component({
  selector: 'app-cadastro',
  standalone: true, // Significa que este componente é "autossuficiente": significa que todos os recursos por ele, componente, que serão usados por ele, ficam aqui disponíveis - sem a necessidade de serem registrados com o decorator @NgModule

  imports: [FormsModule, CommonModule,],
  templateUrl: './cadastro.components.html',
  styleUrl: './cadastro.components.css',
 
})
export class CadastroComponent {

  // Definir o título do componente
  
  tituloComp: string = 'Cadastro de Usuários'

  // 1º passo: definir uma prop para receber como valor a instância do model User

  //user: Usuario = new Usuario('', '', '')

  // 2º passo: inicializar um novo usuário seguindo alguns passos importantes
  selectedRole: string = 'ROLE_USER' // esta será considerada a role padrão do usuário

  errorMessage: string = ''
  usuario: any = {
    email: '',
    password: '',
    PID: '',
    CPF: '',
    fullname: '',
    date: ''
  };

  // 3º passo: praticar a injeção de dependência - a partir do service
  constructor (private AutenticacaoService: AutenticacaoService, private router: Router) {}

  // 4º passo: definir um método onSubmit(): este método será chamado quando o usuário, no final do cadastro, clicar no botão para enviar os dados para o service que, por sua vez, vai enviar os dados para o endpoint no backend para que, assim, os dados possam ser armazenados no DB.
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    // definir uma constante para receber como valor a role referente a este usuário.

    const roleName = this.selectedRole
    this.AutenticacaoService.registro(this.usuario, roleName).subscribe({
      next: (response) => {
        console.log('Usuario cadastrado com sucesso!', response.message)
        this.router.navigate(['/login'])
      },
      error: (error) =>{
        if(error.error && error.error.length > 0){
          // exibir a mensagem de erro retornada pelo backend
          this.errorMessage = error.error[0].defaultMessage
        }else{
          this.errorMessage = 'Erro ao registrar o usuario. Tente novamente mais tarde!'
        }
      }
    })
  }
}
