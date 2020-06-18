import { Component, OnInit } from '@angular/core';
import { SalaModel } from 'src/app/models/sala.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from 'src/app/socketio.service';
import { NgForm } from '@angular/forms';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  sala: SalaModel = new SalaModel();
  mensajes: any[] = [];
  mensaje: string;
  room: string;
  usuario: string;
  elemento: HTMLElement;
  mensajeBD: MessageModel = new MessageModel();

  idSala: any;
  idUser: any;

  constructor(private apiservice: ChatService, private socketService: SocketioService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('mensajes')

    this.room = this.route.snapshot.paramMap.get('nombre');
    this.usuario = localStorage.getItem('usuario')

    //unirse a sala, socketio
    this.socketService.joinRoom(this.room);
    this.socketService.getMessages()
    .subscribe(  resp => {
        this.mensajes.push(resp)
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
     });


     this.apiservice.getSala(this.room).subscribe((resp:any)=>{
      this.idSala = resp['data'];
      this.apiservice.getMensajes(this.idSala).subscribe((resp:any)=>{
        const data: any[] = resp['data'];
        for (let index = 0; index < data.length; index++) {
          this.apiservice.getUsername(data[index]['user_id']).subscribe((resp:any)=>{
            this.mensajes.push({body:data[index]['message'], user: resp['data']}) ;
          })

        }

      })

     })
    this.apiservice.getUser(this.usuario).subscribe((resp:any) =>{
      this.idUser = resp['data'];
    })
    //trear mensajes, BD
    //mostrarlos en pantalla

  }

  salirSala(): void {
    this.socketService.leaveRoom(this.room);
  }

  sendMessage(f: NgForm) {
    console.log(f.value);
    if ( f.value['mensaje'].trim().length === 0 ) {
      return;
    }
    this.socketService.sendMessage(this.room,{user:this.usuario,body:f.value['mensaje']});


    //Guardar mensaje en BD
    const mensaje = new MessageModel()
    mensaje.message = f.value['mensaje'];
    mensaje.sala_id = this.idSala;
    mensaje.user_id = this.idUser;
    this.apiservice.saveMensaje(mensaje).subscribe((resp:any)=>{
      f.value['mensaje'] = '';
      this.mensaje = '';
    })
  }
}
