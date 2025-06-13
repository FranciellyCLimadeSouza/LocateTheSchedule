import { Component } from '@angular/core';
// Fazer as importações necessárias
import { FormsModule } from '@angular/forms'; // este recurso é necessário para a operação com formulários do angular
import { AutenticacaoService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { User } from '../../models/user'; // Este é o model que "trata" todos os dados referentes a usuários
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.components.html',
  styleUrl: './login.components.css'
})
export class LoginComponents {

// Passo 0: definir o título do componente

tituloComp: string = 'Login de Usuário'

// 1º passo: definir uma prop/objeto literal para receber como valor credenciais de acesso para o login do usuário

credentials: any = {
  email: '',
  password: ''
  }

  constructor (private authService: AutenticacaoService, private router: Router) {}
  goToRecuperar(): void {
    this.router.navigate(['/recuperarsenha']);
  }
  // 3º passo: define 
  onSubmit(): void {
    // fazer o acesso à DI do service

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login bem sucedido!', response.message)
        this.router.navigate(['/conta-inicial']) // se tudo ocorrer bem, seremos, depois da autenticação redirecionados para a tela de anotações

      },

      error: (error) => {
        console.error('Erro ao fazer o login', error.error.error)
      }
    });
  }
}
