import { Component, OnInit } from '@angular/core';
import { SalaModel } from 'src/app/models/sala.model';
import { SocketioService } from 'src/app/socketio.service';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  usuario:string;
  salas: SalaModel[] = [];
  cargando = false;
  constructor(private socketService: SocketioService, private chatService: ChatService) { }

  async ngOnInit() {
    this.usuario = localStorage.getItem('usuario')
    if ( this.usuario == null ) {
      var { value: user } = await Swal.fire({
      title: 'Ingresa un nombre de usuario',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
              return 'You need to write something!'
            }
          }
        })

        if (user) {

          const userBD = new UserModel()
          userBD.username = String(user);
          console.log(userBD);

          this.chatService.saveUser(userBD).subscribe((resp:any) => {
          localStorage.setItem('usuario', String(user));
          Swal.fire(`Usuario ${user} creado con exito.`, 'Ingresa a una sala y comienza a chatear.', 'success',)
          });
          //Guardar usuario en BD
        }
    } else {
      console.log(this.usuario);

    }

    this.cargando = true;
    this.chatService.getSalas()
    .subscribe(  resp => {
        this.salas = resp['data'];
        this.cargando = false;
     });

  }



}
