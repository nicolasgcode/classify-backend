export class Subscription {
  constructor(
    public id: string,
    public dateStart: Date,
    public duration: Number,
    public price: Number,
  ) {}
}
