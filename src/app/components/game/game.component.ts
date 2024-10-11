import { Component, Input, OnInit } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { Card } from '../../shared/interfaces/card.interface';
import { cards } from '../../shared/data/cards';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  @Input() level!: string;
  cards: Card[] = [];
  score: number = 0;

  constructor() { }
  ngOnInit(): void {
    this.cards = cards
  }

  updateScore(points: number) {
    this.score += points;
  }

}
