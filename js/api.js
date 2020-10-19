import pageHandler from './page.js';
import db from './models.js';

const BASE_URL = 'https://api.football-data.org/';
const auth = 'a0a88342c80b480b987d09f0dd2f7834';

const renderCardLiga = data => {
  let injectHTML = '';

  data.competitions.forEach(competition => {
    injectHTML += `
      <a href="#competition?id=${competition.id}" class="col s12 m4">
        <div class="card z-depth-2 hoverable">
          <div class="card-content black-text">
            <span class="card-title m-0">
              <h6>${competition.name}</h6>
              <p>${competition.area.name}</p>
            </span>
          </div>
        </div>
      </a>
    `
  });

  document.getElementById('liga').innerHTML = injectHTML;

  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('click', () => pageHandler(el.getAttribute('href').substr(1)))
  })
}

const standingRow = data => {
  return `<tr>
    <td class="center-align">${data.position}</td>
    <td><img src="${data.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${data.team.name}" width="35" /></td>
    <td class="team-name">${data.team.name}</td>
    <td>${data.playedGames}</td>
    <td>${data.won}</td>
    <td>${data.draw}</td>
    <td>${data.lost}</td>
    <td>${data.goalsFor}</td>
    <td>${data.goalsAgainst}</td>
    <td>${data.goalDifference}</td>
    <td>${data.points}</td>
  </tr>`
}

const renderStandingTable = (data, checkSaved) => {
  const totalMatch = data.standings.filter(obj => obj.type == 'TOTAL');
  const isSaved = checkSaved.find(obj => obj.id === data.competition.id);

  const saveBtn = `
    <button
      class="btn waves-effect waves-light blue darken-2"
      onclick="saveCompetition(${data.competition.id}, '${data.competition.name}', '${data.competition.area.name}')"
    >
      Save
    </button>
  `;

  const unsaveBtn = `
    <button
      class="btn waves-effect waves-light red darken-1"
      onclick="deleteSavedCompetition(${data.competition.id}, '${data.competition.name}')"
    >
      Unsave
    </button>
  `;

  document.getElementById('btn-save').innerHTML = isSaved ? unsaveBtn : saveBtn;
  document.getElementById('title').innerHTML = `${data.competition.name}`;

  if (!data.standings[0].group) {
    let injectHTML = '';

    injectHTML = ''
    totalMatch[0].table.forEach(team => injectHTML += standingRow(team));

    document.getElementById('standing').insertAdjacentHTML('beforeend', `<tbody>${injectHTML}</tbody>`)
  } else {
    totalMatch.forEach(group => {
      let injectHTML = '';

      group.table.forEach(team => injectHTML += standingRow(team));

      document.getElementById('standing').innerHTML += `
        <tbody>
          <tr><td colspan="11" class="group-name center-align">${group.group.replace('_', ' ')}</td></tr>

          ${injectHTML}
        </tbody>
      `;
    });
  }
}

const fetchApi = url => {
  return fetch(url, {
      headers: {
          'X-Auth-Token': API_KEY
      }
  })
    .then(status)
    .then(res => res.json());
};

const createCompetitions = () => {
  const url = `${BASE_URL}v2/competitions?plan=TIER_ONE`;

  if ('caches' in window) {
    caches.match(url)
      .then(res => {
        if (res) {
          res.json()
          .then(data => renderCardLiga(data))
          .catch(err => console.log(err))
        }
      })
  }

  fetchApi(url)
    .then(data => renderCardLiga(data))
    .catch(err => console.log(err))
}

const createStandings = async idCompetition => {
  const url = `${BASE_URL}v2/competitions/${idCompetition}/standings`;
  const checkSaved = await db.getCompetition().then(data => data);

  if ('caches' in window) {
    caches.match(url)
      .then(res => {
        if (res) {
          res.json()
          .then(data => renderStandingTable(data, checkSaved))
          .catch(err => console.log(err))
        }
      })
  }

  fetchApi(url)
    .then(data => renderStandingTable(data, checkSaved))
    .catch(err => console.log(err))
}

export default { createCompetitions, createStandings };
