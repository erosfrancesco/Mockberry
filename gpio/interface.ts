import { Subscribable, Intervallable } from '../interfaces.ts';

export enum PinTypes {
    INPUT = "input",
    OUTPUT = "output",
    SERVO = "servo"
}

interface SubscriptionPin extends Subscribable, Intervallable {
    status: PinTypes;
}

export interface PinInput extends SubscriptionPin {
    status: PinTypes.INPUT
}

export interface PinOutput extends SubscriptionPin {
    status: PinTypes.OUTPUT;
    data: any;
}

export interface PinServo extends SubscriptionPin {
    status: PinTypes.SERVO;
    currentData: any;
}

export interface Board {
    [key: number]: PinInput | PinOutput | PinServo
}
