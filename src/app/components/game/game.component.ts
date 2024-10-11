import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { Card } from '../../shared/interfaces/card.interface';
import { cards } from '../../shared/data/cards';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() level!: string;
  cards: Card[] = [];
  score: number = 0;
  countdown: number = 120;
  timerInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.cards = cards
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval); // Limpia el temporizador al destruir el componente
  }

  updateScore(points: number) {
    this.score += points;
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.startTimer();
  }

  startTimer() {
    this.countdown = 120;
    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
        Swal.fire({
          title: 'Game Over',
          text: 'The time is over',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        })
      }
    }, 1000);
  }

}
