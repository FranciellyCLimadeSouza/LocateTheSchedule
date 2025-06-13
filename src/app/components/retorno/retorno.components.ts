import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // este recurso é necessário para a operação com formulários do angular
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-retorno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './retorno.components.html',
  styleUrl: './retorno.components.css'
})
export class RetornoComponents implements OnInit  {
dadosFiltrados: any[] = [];

  ngOnInit() {
    const dados = localStorage.getItem('dadosFiltrados');
    if (dados) {
      this.dadosFiltrados = JSON.parse(dados);
    }
  }
  
  tituloComp: string =  'Retorno de Verificação'
email: string = '';
constructor(private router: Router) {}


goToCadastro(): void {
  // Redirecionar para a página de cadastro com o email
  this.router.navigate(['/next'], { queryParams: { email: this.email } });
}
}


