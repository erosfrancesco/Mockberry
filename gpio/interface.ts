import { Intervallable, Subscribable } from "../utils.ts";

export enum PinTypes {
  INPUT,
  OUTPUT,
  SERVO,
}

class IntervallablePin<T> extends Intervallable<T> {
  status!: PinTypes;
}

export class PinInput<T> extends Subscribable<T> {
  status = PinTypes.INPUT;
}

export class PinOutput<T> extends IntervallablePin<T> {
  status = PinTypes.OUTPUT;
  data!: T;
}

export class PinServo<T> extends IntervallablePin<T> {
  status = PinTypes.SERVO;
  currentData!: T;
}

export interface Board {
  [key: number]: PinInput<number> | PinOutput<number> | PinServo<any>;
}
