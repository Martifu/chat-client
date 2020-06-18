import { Component, OnInit } from "@angular/core";
import Ws from "@adonisjs/websocket-client";
import { SocketioService } from './socketio.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {


  title = 'socketio-angular';
  message: string;
  messages: any[] = [];

  constructor(private socketService: SocketioService) {}


  ngOnInit() {
    this.socketService.setupSocketConnection();



  }

  sendMessage() {
    this.socketService.sendMessage('java',{user:'martin',body:this.message});
    this.message = '';
  }

  joinRoom(){
    this.socketService.joinRoom('java');
  }



}
