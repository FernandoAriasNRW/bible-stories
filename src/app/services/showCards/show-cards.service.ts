import { Injectable } from "@angular/core";
import { Card } from "../../shared/interfaces/card.interface";
import { cards } from "../../shared/data/cards";

@Injectable({
  providedIn: 'root'
})
export class ShowCardsService {

  private _cards: Card[] = cards;

  constructor(){}

  getCards(){
    return this._cards
  }

  setCards(cards: Card[]){
    this._cards = cards
  }

}
