(function () {
    const ids = ["crp", "wbc", "hb", "na", "cr", "glu"];
    const calculateButton = document.getElementById("lrinec-calculate");
    const resetButton = document.getElementById("lrinec-reset");
    function getValue(id) {
        const element = document.getElementById("lrinec-" + id);
        const value = element.value.trim();
        if (value === "") return null;
        const number = Number(value);
        if (!Number.isFinite(number) || number < 0) {
            return NaN;
        }
        return number;
    }
    calculateButton.addEventListener("click", function () {
        const values = {};
        for (const id of ids) {
            values[id] = getValue(id);
        }
        if (Object.values(values).some(value => value === null)) {
            alert("すべて入力してください");
            return;
        }
        if (Object.values(values).some(value => Number.isNaN(value))) {
            alert("正しい数値を入力してください");
            return;
        }
        let score = 0;
        const details = [];
        // CRP
        const crpPoint = values.crp >= 150 ? 4 : 0;
        score += crpPoint;
        details.push("CRP：" + crpPoint + "点");
        // WBC
        let wbcPoint = 0;
        if (values.wbc > 25000) {
            wbcPoint = 2;
        } else if (values.wbc >= 15000) {
            wbcPoint = 1;
        }
        score += wbcPoint;
        details.push("WBC：" + wbcPoint + "点");
        // Hb
        let hbPoint = 0;
        if (values.hb < 11.0) {
            hbPoint = 2;
        } else if (values.hb <= 13.5) {
            hbPoint = 1;
        }
        score += hbPoint;
        details.push("Hb：" + hbPoint + "点");
        // Na
        const naPoint = values.na < 135 ? 2 : 0;
        score += naPoint;
        details.push("Na：" + naPoint + "点");
        // Cr
        const crPoint = values.cr >= 1.6 ? 2 : 0;
        score += crPoint;
        details.push("Cr：" + crPoint + "点");
        // Glucose
        const gluPoint = values.glu > 180 ? 1 : 0;
        score += gluPoint;
        details.push("血糖：" + gluPoint + "点");
        let risk = "";
        if (score >= 8) {
            risk = "高リスク";
        } else if (score >= 6) {
            risk = "中等度リスク";
        } else {
            risk = "低リスク";
        }
        document.getElementById("lrinec-total").textContent =
            "LRINECスコア：" + score + "点 / 13点";
        document.getElementById("lrinec-risk").textContent =
            "判定：" + risk;
        document.getElementById("lrinec-detail").textContent =
            "内訳：" + details.join("、");
    });

    resetButton.addEventListener("click", function () {
        for (const id of ids) {
            document.getElementById("lrinec-" + id).value = "";
        }
        document.getElementById("lrinec-total").textContent =
            "LRINECスコア：未計算";
        document.getElementById("lrinec-risk").textContent = "";
        document.getElementById("lrinec-detail").textContent = "";
    });
})();