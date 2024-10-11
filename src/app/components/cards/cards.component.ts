import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Card, State } from '../../shared/interfaces/card.interface';
import { ShowCardsService } from '../../services/showCards/show-cards.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      state(
        "matched",
        style({
          visibility: "false",
          transform: "scale(0.05)",
          opacity: 0
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")]),
      transition("flipped => matched", [animate("400ms")]),
      transition("default => matched", [animate("400ms")])

    ])
  ]
})
export class CardsComponent implements OnInit {

  @Input() cards!: Card[];
  @Input() level!: string;
  @Output() matchFound = new EventEmitter<number>();

  currentCard!: Card | null;
  flippedCards: Card[] = []; // Para almacenar cartas volteadas
  canFlip: boolean = true; // Para evitar que se volteen cartas mientras se verifica un match
  gameOver: boolean = false;

  constructor(
    private router: Router,
    private _showCardsService: ShowCardsService,
  ) { }

  ngOnInit() {

    this.shuffleCards();

  }

  cardClicked(card: Card) {
    if (!this.canFlip || card.state !== 'default') return;

    card.state = State.FLIPPED;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.canFlip = false; // Evitar más clicks mientras se verifica

      // Verificar si hay un match
      setTimeout(() => {
        this.checkForMatch();
      }, 1000); // Tiempo para mostrar la tarjeta antes de revertir
    }
  }

  checkForMatch() {
    const [card1, card2]: Card[] = this.flippedCards;

    if (card1.location === card2.location) { // Compara el atributo que determina si son iguales
      card1.state = State.MATCHED;
      card2.state = State.MATCHED;
      this.matchFound.emit(2);

      const isGameOver = this.cards.every((c) => c.state === 'matched')

      if (isGameOver) {

        this.cards.map((c) => {
          c.state = State.DEFAULT
          return c
        });

        Swal.fire({
          title: "You WON, Congrats!!",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Play Again',
          cancelButtonText: 'View cards',
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Ready!", "", "success");
            console.log('Before Reset: ', this.cards);
            this._showCardsService.resetCards();
            this.cards = this._showCardsService.getCards();

            this.matchFound.emit(-20);
            this.shuffleCards();

          } else {
            this._showCardsService.setCards(this.cards);

            this.flippedCards = [];
            this.router.navigate(['cards']);
          }
        });

      }

    } else {
      setTimeout(() => {
        card1.state = State.DEFAULT;
        card2.state = State.DEFAULT;
      }, 400);
    }

    // Reiniciar el array de cartas volteadas y permitir volver a voltear
    this.flippedCards = [];
    this.canFlip = true;
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

  showCards(){
    this._showCardsService.setCards(this.cards);
    this.router.navigate(['cards']);
  }

}
