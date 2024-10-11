export interface Card {
  id: string,
  name: string,
  location: number,
  image: string,
  type: TypeEnum,
  state: State,
  order: number,
  reference?: string,
}

export enum TypeEnum {
  FRONT= "front",
  BACK = "back"
}

export enum State {
  DEFAULT = "default",
  FLIPPED = "flipped",
  MATCHED = "matched"
}
