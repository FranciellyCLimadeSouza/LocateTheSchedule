// este é nosso model domain referente aos dados de usuario que circularão 
// pelo projeto

//import { Note } from "./note";
import { Role } from "../role/role-module";

export class Usuario {
    id: number | undefined
    nomeCompleto: string
    dataNascimento: Date
    cpf: string
    pid: number
    email: string
    senha: string
    autenticacao: string
    enabled: boolean
    roles: Role[]
    
    
    constructor(
        nomeCompleto: string,
        email: string,
        dataNascimento: Date,
        pid: number,
        cpf: string,
        senha: string,
        autenticacao: string,
        enabled: boolean,
        roles: Role[] = []
        
    ) {
        this.email = email
        this.nomeCompleto = nomeCompleto
        this.dataNascimento = dataNascimento
        this.pid= pid
        this.cpf = cpf
        this.senha = senha
        this.autenticacao = autenticacao
        this.enabled = enabled
        this.roles = roles
    }
}