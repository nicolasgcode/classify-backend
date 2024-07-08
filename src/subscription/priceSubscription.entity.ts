export class PriceSubscription {
  constructor(
    public id: string,
    public dateStart: Date,
    public price: number,
  ) {}
}