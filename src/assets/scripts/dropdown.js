export class Dropdown {
  constructor(selector, options) {
    this.$el = document.getElementById(selector);
    this.$arrow = this.$el.querySelector('.arrow__down');

    this.#setup();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }
  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === 'input') {
      this.toggle();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.add('arrow__up');
  }
  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('arrow__up');
  }
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
  }
}
