const images = [
    "/Medical/images/liver/01.jpg",
    "/Medical/images/liver/02.jpg",
    "/Medical/images/liver/03.jpg",
    "/Medical/images/liver/04.jpg",
    "/Medical/images/liver/05.jpg",
    "/Medical/images/liver/06.jpg",
];
let currentSlide = 0;
function showSlide() {
    document.getElementById("slideImage").src =
        images[currentSlide];
    document.getElementById("slideNumber").textContent =
        (currentSlide + 1) + " / " + images.length;
}
function nextSlide() {
    currentSlide++;
    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    showSlide();
}
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    showSlide();
}
// スワイプ操作
const slideContainer = document.getElementById("slideContainer");
let touchStartX = 0;
let touchStartY = 0;
slideContainer.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });
slideContainer.addEventListener("touchend", function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // 横方向に十分スライドした場合のみ切り替え
    if (Math.abs(diffX) > 50 &&
        Math.abs(diffX) > Math.abs(diffY)) {

        if (diffX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});
// マウス操作
let mouseStartX = 0;
let isDragging = false;

slideContainer.addEventListener("mousedown", function(e) {
    mouseStartX = e.clientX;
    isDragging = true;
});

slideContainer.addEventListener("mouseup", function(e) {
    if (!isDragging) return;

    const diffX = e.clientX - mouseStartX;

    if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    isDragging = false;
});
slideContainer.addEventListener("mouseleave", function() {
    isDragging = false;
});

function calculateRValue() {
  const ALT = Number(document.getElementById("rALT").value);
  const ALT_ULN = Number(document.getElementById("rALTULN").value);
  const ALP = Number(document.getElementById("rALP").value);
  const ALP_ULN = Number(document.getElementById("rALPULN").value);
  const result = document.getElementById("rResult");
  const inputs = ["rALT", "rALTULN", "rALP", "rALPULN"];
  if (inputs.some(id => document.getElementById(id).value === "")) {
    result.textContent = "すべて入力してください。";
    return;
  }
  if (
    ![ALT, ALT_ULN, ALP, ALP_ULN].every(Number.isFinite) ||
    ALT < 0 || ALP < 0 ||
    ALT_ULN <= 0 || ALP_ULN <= 0
  ) {
    result.textContent = "正しい数値を入力してください。";
    return;
  }
  if (ALP === 0) {
    result.textContent = "ALP実測値が0のため、R値を計算できません。";
    return;
  }
  const R = (ALT / ALT_ULN) / (ALP / ALP_ULN);
  let pattern = "";
  if (R >= 5) {
    pattern = "肝細胞障害型";
  } else if (R > 2) {
    pattern = "混合型";
  } else {
    pattern = "胆汁うっ滞型";
  }
  result.innerHTML =
    "<p>R値：" + R.toFixed(2) + "，肝障害パターン：" + pattern + "</p>";
}

function calculateFIB4() {
  const age = Number(document.getElementById("fibAge").value);
  const AST = Number(document.getElementById("fibAST").value);
  const ALT = Number(document.getElementById("fibALT").value);
  const PLT = Number(document.getElementById("fibPLT").value);
  const result = document.getElementById("fibResult");
  const inputs = ["fibAge", "fibAST", "fibALT", "fibPLT"];
  if (inputs.some(id => document.getElementById(id).value === "")) {
    result.textContent = "すべて入力してください。";
    return;
  }
  if (
    ![age, AST, ALT, PLT].every(Number.isFinite) ||
    age <= 0 || AST < 0 || ALT <= 0 || PLT <= 0
  ) {
    result.textContent = "正しい数値を入力してください。";
    return;
  }
  // 血小板数を×10^9/Lに換算
  const platelet = PLT * 10;
  const fib4 = (age * AST) / (platelet * Math.sqrt(ALT));
  let risk = "";
  if (fib4 < 1.3) {
    risk = "低リスク";
  } else if (fib4 <= 2.67) {
    risk = "中間リスク";
  } else {
    risk = "高リスク";
  }
  result.innerHTML =
    "<p>FIB-4 index：" + fib4.toFixed(2) + "，肝線維化リスク：" + risk + "</p>";
}


function calculateNFS() {
  const age = Number(document.getElementById("nfsAge").value);
  const BMI = Number(document.getElementById("nfsBMI").value);
  const DM = document.getElementById("nfsDM").value;
  const AST = Number(document.getElementById("nfsAST").value);
  const ALT = Number(document.getElementById("nfsALT").value);
  const PLT = Number(document.getElementById("nfsPLT").value);
  const Alb = Number(document.getElementById("nfsAlb").value);
  const result = document.getElementById("nfsResult");
  const inputs = [
    "nfsAge", "nfsBMI", "nfsDM", "nfsAST",
    "nfsALT", "nfsPLT", "nfsAlb"
  ];
  if (inputs.some(id => document.getElementById(id).value === "")) {
    result.textContent = "すべて入力してください。";
    return;
  }
  if (
    ![age, BMI, AST, ALT, PLT, Alb].every(Number.isFinite) ||
    age <= 0 || BMI <= 0 || AST <= 0 ||
    ALT <= 0 || PLT <= 0 || Alb <= 0
  ) {
    result.textContent = "正しい数値を入力してください。";
    return;
  }
  // 血小板数を×10^9/Lに換算
  const platelet = PLT * 10;
  const nfs =
    -1.675 +
    (0.037 * age) +
    (0.094 * BMI) +
    (1.13 * Number(DM)) +
    (0.99 * (AST / ALT)) -
    (0.013 * platelet) -
    (0.66 * Alb);
  let risk = "";
  if (nfs < -1.455) {
    risk = "低リスク";
  } else if (nfs <= 0.676) {
    risk = "中間リスク";
  } else {
    risk = "高リスク";
  }
  result.innerHTML =
    "<p>NFS：" + nfs.toFixed(3) +"，肝線維化リスク：" + risk + "</p>";
}


function calculateMELD() {
    const bilInput = document.getElementById("meldBil").value;
    const crInput = document.getElementById("meldCr").value;
    const inrInput = document.getElementById("meldINR").value;
    const dialysis = document.getElementById("meldDialysis").checked;
    const result = document.getElementById("meldResult");
    if (bilInput === "" || crInput === "" || inrInput === "") {
        result.innerHTML = "<p>すべて入力してください。</p>";
        return;
    }
    let bil = Number(bilInput);
    let cr = Number(crInput);
    let inr = Number(inrInput);
    if (
        !Number.isFinite(bil) ||
        !Number.isFinite(cr) ||
        !Number.isFinite(inr) ||
        bil <= 0 || cr <= 0 || inr <= 0
    ) {
        result.innerHTML = "<p>正しい数値を入力してください。</p>";
        return;
    }
    // 小数第2位を四捨五入し、小数第1位まで使用
    bil = Math.round(bil * 10) / 10;
    cr = Math.round(cr * 10) / 10;
    inr = Math.round(inr * 10) / 10;
    // 日本のMELDスコア計算規定に基づく補正
    bil = Math.max(1.0, Math.min(999.9, bil));
    inr = Math.max(1.0, Math.min(999.9, inr));
    cr = dialysis ? 4.0 : Math.max(1.0, Math.min(4.0, cr));
    // MELD score
    const meld =
        9.57 * Math.log(cr) +
        3.78 * Math.log(bil) +
        11.20 * Math.log(inr) +
        6.43;
    const score = Math.round(meld);
    result.innerHTML = `
        <p><strong>MELDスコア：${score}</strong>　(${meld.toFixed(2)})</p>
        <p>-9点：1.9%, 10-19点：6.0%, 20-29点：19.6%, 30-39点：52.6%, 40点-：71.3%</p>
    `;
}