export interface Selectable {
  selected: boolean;
}

export interface AdditionalFilter extends Selectable {
  name: string;
}
