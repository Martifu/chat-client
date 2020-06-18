import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SocketioService } from './socketio.service';
import { HomeComponent } from './pages/home.component';
import { SalasComponent } from './pages/salas/salas.component';
import { ChatService } from './services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { SalaComponent } from './pages/sala/sala.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, SalasComponent, SalaComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [SocketioService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
