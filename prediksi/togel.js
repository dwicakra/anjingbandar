const readline = require("readline");
const fs = require("fs");
const Table = require("cli-table3");

// Warna Teks
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[91m",
  cyan: "\x1b[96m",
  yellow: "\x1b[93m",
  green: "\x1b[92m",
};

function runPrediction() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  fs.readFile("prediksi/data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const jsonData = JSON.parse(data);

    rl.question(
      `${colors.yellow}Masukkan Angka Ekor\t: ${colors.reset}`,
      (angka) => {
        if (!isNaN(angka) && angka >= 0 && angka < 10) {
          rl.question(
            `${colors.yellow}Berapa Digit (optional - default 4)\t: ${colors.reset}`,
            (digitCount) => {
              digitCount = parseInt(digitCount) || 4;

              rl.question(
                `${colors.yellow}Prediksi Berapa (optional - default 5)\t: ${colors.reset}`,
                (generateCount) => {
                  generateCount = parseInt(generateCount) || 5;

                  if (angka.toString() in jsonData) {
                    const selectedNumber = jsonData[angka.toString()];
                    const table = new Table({
                      head: [
                        `${colors.yellow}No.${colors.reset}`,
                        `${colors.yellow}Prediksi${colors.reset}`,
                      ],
                      chars: {
                        mid: "",
                        "left-mid": "",
                        "mid-mid": "",
                        "right-mid": "",
                      },
                      style: { head: ["yellow"], border: ["yellow"] },
                    });

                    for (let i = 1; i <= generateCount; i++) {
                      const randomDigits = getRandomDigits(
                        selectedNumber,
                        digitCount
                      );
                      table.push([`${i}.`, randomDigits]);
                    }

                    console.log(
                      `${colors.cyan}\nHasil Prediksi\n${colors.reset}`
                    );
                    console.log(table.toString());
                    console.log(
                      `${colors.cyan}\nTerima kasih telah menggunakan bot saya${colors.reset}`
                    );
                  } else {
                    console.log(`${colors.red}Data tidak ada.${colors.reset}`);
                  }

                  rl.close();
                }
              );
            }
          );
        } else {
          console.log(`${colors.red}Hanya Masukan Angka${colors.reset}`);
          rl.close();
        }
      }
    );
  });
}

function getRandomDigits(number, count) {
  const digits = number.toString().split("");
  const randomDigits = [];
  const digitSet = new Set(digits);

  while (randomDigits.length < count && digitSet.size > 0) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const randomDigit = digits[randomIndex];

    if (digitSet.has(randomDigit)) {
      randomDigits.push(randomDigit);
      digitSet.delete(randomDigit);
    }
  }

  while (randomDigits.length < count) {
    const randomDigit = Math.floor(Math.random() * 10).toString();
    randomDigits.push(randomDigit);
  }

  return randomDigits.join("");
}

module.exports = { run: runPrediction };
