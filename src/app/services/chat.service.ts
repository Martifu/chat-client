import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalaModel } from '../models/sala.model';
import { UserModel } from '../models/user.model';
import { MessageModel } from '../models/message.model';

@Injectable()
export class ChatService {

  url:string = "http://localhost:3333"

  constructor(private petition: HttpClient) {

  }

   getSalas(){
    return  this.petition.get(`${this.url}/salas`);
  }

  getMensajes(id){
    const data = {
      id: id
    }
    console.log(data);

    return  this.petition.post(`${this.url}/messages`, data);
  }

  saveSala(sala: SalaModel){
      const data = {
        ...sala
    }
    return this.petition.post(`${this.url}/sala`, data);
  }

  saveUser(user: UserModel){
      const data = {
        ...user
    }
    return this.petition.post(`${this.url}/user`, data);
  }

  saveMensaje(mensaje: MessageModel){
      const data = {
        ...mensaje
    }
    return this.petition.post(`${this.url}/new-message`, data);
  }

  getUser(nombre){
      const data = {
        username : nombre
    }
    return this.petition.post(`${this.url}/get-user`, data);
  }
  getUsername(id){
    const data = {
      id : id
  }
  return this.petition.post(`${this.url}/get-username`, data);
}

  getSala(nombre) {
      const data = {
        name : nombre
    }
    return this.petition.post(`${this.url}/get-sala`, data);
  }
}
