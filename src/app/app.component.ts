import { Component, OnInit } from "@angular/core";
import Ws from "@adonisjs/websocket-client";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Sockets-Client";
  ws: any;
  chat: any;
  messages: string[] = [];
  text: string;

  ngOnInit(): void {
    this.ws = Ws("ws://localhost:3333", {
      path: "ws"
    });

    this.ws.connect();
    this.chat = this.ws.subscribe("chat");

    this.chat.on("message", (data: any) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    this.chat.emit("message", this.text);
    this.messages.push(this.text);
    this.text = "";
  }
}
