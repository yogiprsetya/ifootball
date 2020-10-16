var webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BIIgijSUxYnnyWAz0zerNSiG7xjzc7RN3qcla3jSB2xF8jX0NF80m8HOQ5ybZ5CMMSFPVtPVBM8gtbltrSx-QpI",
  "privateKey": "A5ukCubyWP5zQvZ3o4uBVeeR91J74f-ac6GN_ke_k2A"
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/f5INVLJhAnE:APA91bGujWc2S4_m8q2KKpgMnuJ4KOumFkdQbbnBiJk1KzXyp4au7vjyNiaEi5Oi7Ru1SY5nXF-IqLofKrhqRi1R49rfVxzPAJggNLcLdnrD79CIm1E8CarUTKvweJGGypSxsJ-_PQJO",
  "keys": {
    "p256dh": "BBXduTEDl8VPFexFPUPFSbuMvH/4AZ/H4Os5zNC3Yf91OTuLNuG69xFTq2hPZhChCLYULd9RuPEwh1y/xByxkXI=",
    "auth": "5kehrVEaSAB4f0NxkgfdvA=="
  }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '392806247612',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);