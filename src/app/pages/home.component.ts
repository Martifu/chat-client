import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { SalaModel } from '../models/sala.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  async crearSala() {
    var { value: sala } = await Swal.fire({
      title: 'Ingresa el nombre de la sala',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
              return 'You need to write something!'
            }
          }
        })

        if (sala) {
          const salaBD = new SalaModel()
          salaBD.name = String(sala);
          console.log(salaBD);

          this.chatService.saveSala(salaBD).subscribe((resp:any) => {
          Swal.fire(`Sala ${sala} creada con exito.`, 'Ingresa a tu sala y comienza a chatear.', 'success',)
          });
          //Guardar sala en BD
        }
  }



}
