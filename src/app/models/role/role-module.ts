import { Usuario } from "../user/user-module";

export class Role {
    id?: number
    roleName: string
    usuarios: Usuario[]


    constructor(roleName: string, usuarios: Usuario[]){
        this.roleName = roleName
        this.usuarios = usuarios
    }
}