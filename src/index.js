import { Dropdown } from './assets/scripts/dropdown';
// SCSS
import './scss/main.scss';

/*TODO:
-Перенести блок счетчиков в js
-Доделать счетчики
*/

const dropdown = new Dropdown('guest', {
  categories: [
    { name: 'ВЗРОСЛЫЕ', quantity: 0 },
    { name: 'ДЕТИ', quantity: 0 },
    { name: 'МЛАДЕНЦЫ', quantity: 0 },
  ],
});

window.s = dropdown;
