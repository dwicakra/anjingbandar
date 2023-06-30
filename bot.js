const bot = require("./prediksi/togel.js");

// Warna Teks
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[91m",
  cyan: "\x1b[96m",
  yellow: "\x1b[93m",
  green: "\x1b[92m",
};

// Watermark
console.log(`${colors.yellow}
+ ----------------- +
|  Created by ADSB  |
+ ----------------- +${colors.reset}
`);

// Membuat efek berkedip pada titik-titik selama 3 detik
const blinkInterval = setInterval(() => {
  process.stdout.write("\x1b[2K\x1b[1G.");
  setTimeout(() => {
    process.stdout.write("\x1b[2K\x1b[1G ");
  }, 500);
}, 1000);

// Menjalankan bot setelah 3 detik
setTimeout(() => {
  clearInterval(blinkInterval);
  bot.run();
  console.log(`${colors.cyan}
Silahkan Masukan Angka.${colors.reset}`);
}, 3000);
