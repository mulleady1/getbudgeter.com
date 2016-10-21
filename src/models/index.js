
let i = 1;
let newId = () => `tempid-${i++}`;

export class Bill {
  constructor(due) {
    this.id = newId();
    this.name = '';
    this.amount = 0;
    this.paid = false;
    this.due = due;
    this._editing = true;
  }
}
