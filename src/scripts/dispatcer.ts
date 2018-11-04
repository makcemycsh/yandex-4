export interface ICallback {
  [id: string]: (payload: IPayload) => void;
}

export interface IPayload {
  action: string;
  data: any;
}

export default class Dispatcher {

  private id: number;
  private callbacks: ICallback;

  constructor() {
    this.id = 0;
    this.callbacks = [];
  }
  public dispatch(type: string, payload: IPayload): void {
    this.callbacks.forEach((callback) => {
      callback(type, payload);
    });
  }
  public register(callback: (type: string, payload: IPayload) => void): void {
    this.callbacks.push(callback);
  }
}
