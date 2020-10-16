const TABLE_NAME = 'competition';

let dbPromise = idb.open('ifootball', 1, upgradeDB => {
  if (!upgradeDB.objectStoreNames.contains(TABLE_NAME)) {
    upgradeDB.createObjectStore(TABLE_NAME);
  }
})

const createCompetition = ({id, name, area}) => {
  dbPromise
  .then(db => {
      let tx = db.transaction(TABLE_NAME, 'readwrite');
      let store = tx.objectStore(TABLE_NAME);
      let item = {
          id,
          name,
          area,
          created: new Date().getTime()
      };

      store.put(item, id);
      return tx.complete;
  })
  .then(() => console.log('Berhasil Menyimpan competition', name))
  .catch(err => console.log('Gagal Menyimpan competition: ', err))
}

const deleteCompetition = id => {
  dbPromise
  .then(db => {
      let tx = db.transaction(TABLE_NAME, 'readwrite');
      let store = tx.objectStore(TABLE_NAME);
      store.delete(id);
      return tx.complete;
  })
  .then(() => console.log(TABLE_NAME))
}

const getCompetition = () => {
  return dbPromise
  .then(db => {
    let tx = db.transaction(TABLE_NAME, 'readonly');
    let store = tx.objectStore(TABLE_NAME);

    return store.getAll();
  })
  .then(data => data)
}



export default {
  createCompetition,
  deleteCompetition,
  getCompetition
}