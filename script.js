let decimalOdds = document.getElementById("decimalOdds");
let moneylineOdds = document.getElementById("moneylineOdds");
let fractionalOdds = document.getElementById("fractionalOdds");
let probability = document.getElementById("probability");
let button = document.getElementById("clear");

decimalOdds.addEventListener("keyup", calculateEU);
moneylineOdds.addEventListener("keyup", calculateUS);
fractionalOdds.addEventListener("keyup", calculateUK);
probability.addEventListener("keyup", calculate);
button.addEventListener("click", clearAll);

function clearAll() {
  decimalOdds.value = "";
  moneylineOdds.value = "";
  fractionalOdds.value = "";
  probability.value = "";
}

let gcd = function (a, b) {
  if (b < 0.0000001) return a;
  return gcd(b, Math.floor(a % b));
};

function convertToFraction(fraction) {
  let len = fraction.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;
  let divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  return Math.floor(numerator) + "/" + Math.floor(denominator);
}

function calculateEU() {
  if (Number(decimalOdds.value) > 2.0) {
    moneylineOdds.value = `+${((Number(decimalOdds.value) - 1) * 100).toFixed(
      0
    )}`;
  } else {
    moneylineOdds.value = `-${(100 / (Number(decimalOdds.value) - 1)).toFixed(
      0
    )}`;
  }

  fractionalOdds.value = convertToFraction(
    (decimalOdds.value - 1.0).toFixed(3)
  );

  probability.value = `${((1 / decimalOdds.value) * 100).toFixed(2)}%`;
}

function calculateUS() {
  if (Number(moneylineOdds.value) > 0) {
    decimalOdds.value = ((Number(moneylineOdds.value) + 100) / 100).toFixed(2);
  } else {
    decimalOdds.value = (
      Number(Math.abs(moneylineOdds.value) + 100) /
      Math.abs(moneylineOdds.value)
    ).toFixed(2);
  }

  fractionalOdds.value = convertToFraction(
    (decimalOdds.value - 1.0).toFixed(3)
  );

  probability.value = `${((1 / decimalOdds.value) * 100).toFixed(2)}%`;
}

function calculateUK() {
  decimalOdds.value = (eval(fractionalOdds.value) + Number(1)).toFixed(2);

  if (eval(fractionalOdds.value) >= 1) {
    moneylineOdds.value = `+${(eval(fractionalOdds.value) * 100).toFixed(0)}`;
  } else {
    moneylineOdds.value = `-${(100 / eval(fractionalOdds.value)).toFixed(0)}`;
  }

  probability.value = `${((1 / decimalOdds.value) * 100).toFixed(2)}%`;
}

function calculate() {
  decimalOdds.value = ((1 / Number(probability.value)) * 100).toFixed(2);

  if (probability.value > 50) {
    moneylineOdds.value = `-${(
      (probability.value / (100 - probability.value)) *
      100
    ).toFixed(0)}`;
  } else {
    moneylineOdds.value = `+${(
      ((100 - probability.value) / probability.value) *
      100
    ).toFixed(0)}`;
  }

  fractionalOdds.value = convertToFraction(
    (decimalOdds.value - 1.0).toFixed(3)
  );
}
