import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-locate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './locatethescheduling.components.html',
  styleUrls: ['./locatethescheduling.components.css'] 
})
export class LocateTheScheduleComponents implements OnInit {
  dadosExcel: any[] = [];
  emailBusca: string = ''; // Email que será buscado

  constructor(private http: HttpClient, private authService: AutenticacaoService, private router: Router) {}

  ngOnInit() {
    this.carregarExcel();
  }

  carregarExcel() {
    this.http.get('/assets/excel.xlsx', { responseType: 'arraybuffer' }).subscribe((data) => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const sheetName = workbook.SheetNames[0];

      // Verifica se a planilha realmente existe
      if (!workbook.Sheets[sheetName]) {
        console.error('Erro: Planilha não encontrada no Excel.');
        return;
      }

      this.dadosExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      console.log('Dados convertidos para JSON:', this.dadosExcel);
    }, error => {
      console.error('Erro ao carregar o Excel:', error);
    });
  }

  filtrarPorEID() {
    if (!this.emailBusca.trim()) {
      alert('Digite um EID para buscar.');
      return;
    }

    if (this.dadosExcel.length === 0) {
      alert('Dados não carregados! Verifique se o arquivo Excel está na pasta assets.');
      return;
    }

    const resultado = this.dadosExcel.filter(item => item.EID?.trim().toLowerCase() === this.emailBusca.trim().toLowerCase());

    console.log('Resultados filtrados:', resultado);

    if (resultado.length > 0) {
      localStorage.setItem('dadosFiltrados', JSON.stringify(resultado));
      this.router.navigate(['/resultado']); // Correto para redirecionar
    } else {
      alert('Nenhum resultado encontrado.');
    }
  }
}
