export class Dropdown {
  constructor(selector, options) {
    //dropdown block
    this.$el = document.getElementById(selector);
    //input
    this.$arrow = this.$el.querySelector('.arrow__down');
    //counter_block
    this.$minus = this.$el.querySelector('.minus');
    this.$plus = this.$el.querySelector('.plus');
    this.$counter = this.$el.querySelector('.counter');
    this.$listCategories = this.$el.querySelector('.list_categories');
    //categories
    this.categories = options.categories;
    this.counter = 0;

    //private methods
    this.#setup();
    this.#render();
  }

  #render() {
    let quantity = 0;
    this.categories.forEach((element) => {
      quantity = quantity + element.quantity;
    });
    this.counter = quantity;
    //counter
    if (this.counter === 0) {
      document.getElementById('button_clear').classList.add('button_none');
    } else {
      document.getElementById('button_clear').classList.remove('button_none');
    }

    //render categories
    let list = this.categories.map((obj) => {
      return `
      <li>
      ${obj.name}
      <div class="counter__block">
        <div class="counter_method">
          <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="minus">
            <path d="M0.643477 0.564H5.35948V1.68H0.643477V0.564Z" fill="#1F2041" fill-opacity="0.5"></path>
          </svg>
        </div>  
          <div class="counter">${obj.quantity}</div>
        <div class="counter_method">  
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus">
            <path d="M7.91324 4.79762H4.56524V8.07362H3.43124V4.79762H0.0832422V3.73562H3.43124V0.441617H4.56524V3.73562H7.91324V4.79762Z" fill="#1F2041" fill-opacity="0.5"></path>
          </svg>
        </div>
      </div>
      </li>`;
    });

    this.$listCategories.innerHTML = [list];
  }
  //setting dropdown
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }
  //handler click
  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === 'input') {
      this.toggle();
    }
  }
  //getter for check state dropdown
  get isOpen() {
    return this.$el.classList.contains('open');
  }
  //swift state dropdown
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  //open dropdown
  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.add('arrow__up');
  }
  //close dropdown
  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('arrow__up');
  }
  //delete listener
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
  }
}
