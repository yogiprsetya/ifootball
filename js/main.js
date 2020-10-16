import navigation from './nav.js';
import pageHandler from './page.js';
import sw from './register.js';

let page = window.location.hash.substr(1);
if (page == '') page = 'home';

//Invoke PWA modules
sw.registration();
sw.notification();

document.addEventListener('DOMContentLoaded', () => {
  navigation();
  pageHandler(page);
})