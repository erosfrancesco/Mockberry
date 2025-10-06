type ObservableCallback<T> = (value: T, ...args: any) => void;

// Observer Functionality
export class Observable<T> {
  constructor(initialValue: T, callback: ObservableCallback<T> = () => {}) {
    this.callback = callback;
    this.value = initialValue;
  }

  callback: ObservableCallback<T>;
  private _value!: T;

  set value(v) {
    this._value = v;
    if (this.callback) {
      this.callback(v);
    }
  }

  get value() {
    return this._value;
  }
}

type SubscribableObservedCallback<T> = (value: T, id: string) => void;

// PUB / SUB Functionality
export class Subscribable<T> extends Observable<T> {
  private subscribed;
  private _callback;

  constructor(
    initialValue: T,
    callback: SubscribableObservedCallback<T> = () => {}
  ) {
    super(initialValue);

    this.subscribed = new Set<string>();
    this._callback = callback;
  }

  subscribe(id: string) {
    if (!this.subscribed.has(id)) {
      this.subscribed.add(id);

      this.callback = (value) =>
        this.subscribed.forEach((id) => this._callback(value, id));
    }
  }

  unsubscribe(id: string) {
    if (!this.subscribed.has(id)) {
      this.subscribed.delete(id);
      this.callback = (value) =>
        this.subscribed.forEach((id) => this._callback(value, id));
    }
  }
}

// Every ms update value and notify subs.
export class Intervallable<T> extends Subscribable<T> {
  constructor(
    initialValue: T,
    everyMs: number = 2000,
    update: (previous: T) => T = () => {
      return initialValue;
    },
    callback: SubscribableObservedCallback<T> = () => {}
  ) {
    super(initialValue, callback);
    this._update = update;
    this.everyMs = everyMs;
  }

  private _listening?: NodeJS.Timeout;
  private _everyMs!: number;
  private _update: (previous: T) => T;

  get everyMs() {
    return this._everyMs;
  }

  set everyMs(v) {
    if (!v) {
      clearInterval(this._listening);
    }

    this._everyMs = v;
    this._listening = setInterval(() => {
      const newValue = this._update(this.value);
      this.value = newValue;
    }, v);
  }
}
