import { Component } from '@angular/core';
import { GameComponent } from '../../components/game/game.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameComponent,
    RouterOutlet,
    NavbarComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  level: string = 'normal'

}
