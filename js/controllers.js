import db from './models.js';
import pageHandler from './page.js';

const getAllCompetition = () => {
  db.getCompetition()
    .then(data => {
      let injectHTML = ''

      data.forEach(competition => {
        injectHTML += `
          <a href="#competition?id=${competition.id}" class="col s12 m4">
            <div class="card z-depth-2 hoverable">
              <div class="card-content black-text">
                <span class="card-title m-0">
                  <h6>${competition.name}</h6>
                  <p>${competition.area}</p>
                </span>
              </div>
            </div>
          </a>
        `
      })

    if (data.length == 0) injectHTML += '<h6 class="center-align">Tidak ada data Team yang Difavoritkan!</6>';
    document.getElementById('savedCompetition').innerHTML = injectHTML;
    document.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', () => pageHandler(el.getAttribute('href').substr(1)))
    })
  })
}

const pushNotification = msg => {
  const title = 'Notifikasi';
  const options = {
    body: msg,
    badge: '/img/logo-icon.png'
  };

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(regis => {
      regis.showNotification(title, options);
    });
  } else {
    console.error('Fitur notifikasi tidak diijinkan.');
  }
}

const saveCompetition = (id, name, area) => {
  let makeSure = confirm(`Apakah yakin ingin menambahkan liga ${name} ke Favorit ?`)

  if (makeSure) {
    db.createCompetition({id, name, area})
    M.toast({html: `${name} tersimpan!`, classes: 'blue rounded'});
    pushNotification(`Berhasil Favorit ${name}`)
  }
}

const deleteSavedCompetition = (id, name) => {
  let makeSure = confirm(`Apakah Yakin ingin menghapus ${name} dari Favorit ?`);

  if (makeSure) {
    db.deleteCompetition(id);

    M.toast({html: `Berhasil Menghapus ${name}`, classes: 'rounded'});
    pushNotification(`Berhasil Menghapus ${name}`);
    window.location.href = "/#favorit";
  }
}

export default {
  getAllCompetition,
  saveCompetition,
  deleteSavedCompetition
}