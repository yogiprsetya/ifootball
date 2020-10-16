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
  "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABfgsgpxolPiaQNmzfoqeIAB4L_XffIbb9khJM6jXGjIxgeQ5Eq4r7ZVeuNGCrbYXdhuyjqkFL0100hykLCN_xauLB5RF-E_vFITd_RrsuJ7XYh4eG4pK-nMg5YN2Erl0hKSqxyyDum_sa8t5XB15eLxPwbrx_TTey1nT9vRnExkQzD3XQ",
  "keys": {
    "p256dh": "BBKef6ps2tg5hvmApwbHu7IVbohnsek+ygeeNpNL+nQrZln5/I9jsdEiT3l5cRSvrsEPSKnYZSx8qk1kx5JLOZs=",
    "auth": "z7FDbV62OgNWn4Oy+3ktNA=="
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