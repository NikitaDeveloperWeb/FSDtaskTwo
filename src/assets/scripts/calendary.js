import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

export class CalendaryPicker {
  constructor(selectorCal, options) {
    //selector
    this.selector = selectorCal;
    //options
    this.options = options;
    //DOM elements
    this.$el = document.querySelector(selectorCal);
    this.$dropdown = this.$el.querySelector('.calendary__dropdown');
    //input
    this.$arrow = this.$el.querySelector('.arrow__down');
    //methods
    this.render();
    this.#setup();
  }
  /* 
    TODO:
    -make calendary
    
  */
  render() {
    datepickerFactory($);
    datepickerRUFactory($);

    $(function () {
      $('.calendary__dropdown').datepicker();
      $.datepicker.regional['ru'];
    });
  }
  //setting dropdown
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    //TODO
    // не меняются значения других счетчиков
    if (type === 'input' || type === 'ok') {
      this.toggle();
    }
  }
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
