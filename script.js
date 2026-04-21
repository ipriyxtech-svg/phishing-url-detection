function checkURL() {
const urlValue = document.getElementById("urlInput").value.trim();
const resultText = document.getElementById("resultText");
const reasonsList = document.getElementById("reasons");
const loader = document.getElementById("loader");

// Reset
resultText.innerText = "";
reasonsList.innerHTML = "";
resultText.className = "";

if (!urlValue) {
resultText.innerText = "⚠️ Please enter a URL";
return;
}

// Show loader
loader.style.display = "block";

setTimeout(() => {
loader.style.display = "none";
analyzeURL(urlValue);
}, 1000);
}

function analyzeURL(urlValue) {
const resultText = document.getElementById("resultText");
const reasonsList = document.getElementById("reasons");

let url;

try {
url = new URL(urlValue);
} catch {
resultText.innerText = "❌ Invalid URL";
resultText.classList.add("danger");
return;
}

let riskScore = 0;
let reasons = [];

// HTTPS
if (url.protocol !== "https:") {
riskScore++;
reasons.push("Not using HTTPS");
}

// Keywords
const keywords = ["login", "verify", "bank", "secure", "update"];
keywords.forEach(word => {
if (urlValue.toLowerCase().includes(word)) {
riskScore++;
reasons.push("Suspicious keyword: " + word);
}
});

// IP check (fixed)
const ipPattern = /(\d{1,3}.){3}\d{1,3}/;
if (ipPattern.test(url.hostname)) {
riskScore++;
reasons.push("Using IP instead of domain");
}

// Length
if (urlValue.length > 75) {
riskScore++;
reasons.push("URL too long");
}

// Subdomains
if (url.hostname.split(".").length > 3) {
riskScore++;
reasons.push("Too many subdomains");
}

// Result
if (riskScore === 0) {
resultText.innerText = "✅ Safe URL";
resultText.classList.add("safe");
}
else if (riskScore <= 2) {
resultText.innerText = "⚠️ Suspicious URL";
resultText.classList.add("warning");
}
else {
resultText.innerText = "❌ Phishing Detected";
resultText.classList.add("danger");
}

// Reasons
reasons.forEach(r => {
let li = document.createElement("li");
li.innerText = r;
reasonsList.appendChild(li);
});
}
