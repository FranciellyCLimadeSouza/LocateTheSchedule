import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.components'; 
import { LoginComponents } from './components/login/login.components';
import { CadastroComponent } from './components/cadastro/cadastro.components';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.components';
import { LocateTheScheduleComponents } from './components/locatethescheduling/locatethescheduling.components';
import { RetornoComponents } from './components/retorno/retorno.components';
export const routes: Routes = [
       {path: 'home', component: HomeComponent}, 
       {path: 'login', component: LoginComponents}, 
       {path: 'cadastro', component: CadastroComponent},
       {path: 'recuperarsenha', component: RecuperarSenhaComponent},
       {path: 'locate', component: LocateTheScheduleComponents},
       {path:'retorno',component:RetornoComponents},
        // pathMatch: full: indica que, assim que o componente for renderizado na tela, o "endereço/rota" completa apareça na barra de endereço do browser
   {path: '', redirectTo: '/home', pathMatch: 'full'}
];
