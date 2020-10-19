const registration = () => {
  if ('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => console.log('Pendaftaran ServiceWorker berhasil'))
        .catch(() => console.log('Pendaftaran ServiceWorker gagal'))
    })
  } else {
    console.log('ServiceWorker belum didukung browser ini.')
  }
}

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const notification = () => {
  if ('Notification' in window) {
    Notification.requestPermission()
      .then(result => {
        if (result === 'denied') {
          console.log('Denied')
          return
        } else if (result === 'default') {
          console.log('Default!')
          return
        }

        navigator.serviceWorker.ready.then(() => {
          if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(reg => {
              reg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array("BIIgijSUxYnnyWAz0zerNSiG7xjzc7RN3qcla3jSB2xF8jX0NF80m8HOQ5ybZ5CMMSFPVtPVBM8gtbltrSx-QpI")
                })
                .then(sub => {
                  console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                  console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                  console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                })
                .catch(err => console.log('Gagal Subscribe : ', err))
            })
          }
        })
      })
  }
}

export default {
  registration,
  notification
}