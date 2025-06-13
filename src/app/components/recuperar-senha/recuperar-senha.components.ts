import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // este recurso é necessário para a operação com formulários do angular
import { AutenticacaoService } from '../../service/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/user/user-module'; // Este é o model que "trata" todos os dados referentes a usuários
import { response } from 'express';

import { LoginComponents } from '../login/login.components';
@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar-senha.components.html',
  styleUrl: './recuperar-senha.components.css'
})
export class RecuperarSenhaComponent {
 errorMessage: string = ''
 //usuario: Usuario = new Usuario('','', '')
 usuario: any = {
  email: '',
  senha: '',
  nomeCompleto: '',
  nascimento: ''
 }
 
  constructor (private authService: AutenticacaoService, private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    this.router.navigate(['/login']);
  }
}
