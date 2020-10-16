import api from './api.js';
import controllers from './controllers.js'

const pageHandler = (path = 'home') => {
  const xhr = new XMLHttpRequest();
  const clearPath = path.split('?')[0];

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const element = document.getElementById('body-content');

      if (xhr.status === 200) {
        element.innerHTML = xhr.responseText

        if (clearPath === 'home') {
          api.createCompetitions();
        }

        if (clearPath === 'competition') {
          api.createStandings(path.split('?')[1].replace('id=', ''));

          window.deleteSavedCompetition = controllers.deleteSavedCompetition;
          window.saveCompetition = controllers.saveCompetition;
        }

        if (clearPath === 'favorit') {
          controllers.getAllCompetition();
        }


      } else if (xhr.status == 404) {
        element.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>"
      } else {
        element.innerHTML = "<h1>Maaf. halaman tidak dapat di akses!</h1>"
      }
    }
  }

  xhr.open('GET', `/pages/${clearPath}.html`, true)
  xhr.send()
}

export default pageHandler;
