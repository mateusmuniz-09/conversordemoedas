const form = document.getElementById("converter-form");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const conconvertedAmaount = document.getElementById("convertedAmaount");
const toCurrency = document.getElementById("toCurrency");
const loading = document.getElementById("loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");
const converterBtn = document.getElementById("converterBtn");
const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  showLoading();
  hideResult();
  hideError();

  try {
    const response = await fetch(API_URL + fromCurrency.value);
    const data = await response.json();
    const rate = data.rates[toCurrency.value];
    const convertedRate = (amount.value * rate).toFixed(2);

    conconvertedAmaount.value = convertedRate;
    hideLoading();
    result.innerHTML = `<div  style ="font-size: 1.4rem;">${amount.value} ${fromCurrency.value} = ${convertedRate} ${toCurrency.value}</div>
    <div style ="font-size: 0.9rem; opacity:0.8; margin-top: 10px ">Taxa 1 ${fromCurrency.value} = ${rate} ${toCurrency.value} </div>
    `;
    showResult();
  } catch (err) {
    hideLoading();
    showError();
  }
}

form.addEventListener("submit", function (e) {
  event.preventDefault();
  convertMoney();
});

function showResult() {
  result.style.display = "block";
}
function hideResult() {
  result.style.display = "none";
}

function showError() {
  error.style.display = "block";
  error.textContent = "⚠️ Erro ao converter moeda, tente novamente";
}

function hideError() {
  error.style.display = "none";
}
function showLoading() {
  loading.style.display = "block";
  converterBtn.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
  converterBtn.style.display = "block";
}
