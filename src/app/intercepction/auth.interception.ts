//o proposito do interceptor é: obter as credenciais de acesso e envia-las via http, para os endpoints definidos no backend

import { HttpInterceptorFn } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { AutenticacaoService } from "../service/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AutenticacaoService)
    const authHeader = authService.getAuthHeader() //obtemos as credenciais de acesso

    //"clonar" a requisição feita no service
    const cloneRequest = req.clone({setHeaders: {Authorization: authHeader}})

    //definir a expressão de retorno
    return next(cloneRequest)
}