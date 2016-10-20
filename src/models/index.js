
let i = 1;
let newId = () => `tempid-${i++}`;

export class Bill {
  constructor(year, month) {
    this.id = newId();
    this.name = '';
    this.amount = 0;
    this.paid = false;
    this.year = year;
    this.month = month;
    this._editing = true;
  }
}
