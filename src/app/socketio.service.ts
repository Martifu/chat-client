import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  url:string = "http://localhost:3333/"
  socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

    public sendMessage(room,message) {
      this.socket.emit('message',  ({room,message}) );
   }

   public getMessages() {
      return Observable.create((observer) => {
          this.socket.on('message', (message) => {
              observer.next(message);
          });
      });
  }

  public joinRoom(room){
    this.socket.emit('join_room', room);
  }

  public leaveRoom(room){
    this.socket.emit('leave_room', room);
  }





}
