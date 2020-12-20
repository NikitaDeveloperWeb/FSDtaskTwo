import { Dropdown } from './assets/scripts/dropdown';
import { CalendaryPicker } from './assets/scripts/calendary';
// SCSS
import './scss/main.scss';

/*TODO:
-Доделать счетчики
-Сделать календарь
*/

const dropdown = new Dropdown('guest', {
  categories: [
    { name: 'ВЗРОСЛЫЕ', quantity: 0 },
    { name: 'ДЕТИ', quantity: 0 },
    { name: 'МЛАДЕНЦЫ', quantity: 0 },
  ],
});

const calendary = new CalendaryPicker('#calendaryStandart', {});

window.c = calendary;
window.s = dropdown;
