import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Card, State } from '../../shared/interfaces/card.interface';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { ShowCardsService } from '../../services/showCards/show-cards.service';

@Component({
  selector: 'app-show-cards',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './show-cards.component.html',
  styleUrl: './show-cards.component.css'
})
export class ShowCardsComponent implements OnInit {

  cards!: Card[];

  constructor(
    private _showCardsService: ShowCardsService,
  ) { }

  ngOnInit() {
    this.cards = this._showCardsService.getCards();
    console.log('Show cards: ', this.cards)
    // this.shuffleCards();
  }

  shuffleCards() {
    const order = this.cards.map((c) => c.order);

    this.cards = this.cards.map((c) => {
      let i = Math.round(Math.random() * (order.length - 1));
      c.order = order[i];
      order.splice(i, 1);
      return c;
    });

    this.cards.sort((a, b) => a.order - b.order);

    const back: Card[] = [];
    const front: Card[] = [];

    this.cards.forEach((c) => {
      c.type === 'front' ? front.push(c) : back.push(c);
    });

    const selectedFront = front.filter((c, i) => i < 10);

    const selectedBack = back.filter((c, i) => {
      return selectedFront.some((sc) => sc.location === c.location);
    });

    this.cards = [...selectedFront, ...selectedBack];

    this.cards.sort((a, b) => a.order - b.order)

    this.cards = this.cards.map((c, i) => {
      c.order = i + 1;
      return c;
    });

  }

}
