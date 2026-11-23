// Medicalフォルダを基準にする
const SITE_ROOT = new URL("../", document.currentScript.src);

// Medicalフォルダを起点にファイルを読み込む
async function loadComponent(id, file) {
    const response = await fetch(new URL(file, SITE_ROOT));

    if (!response.ok) {
        console.error(`${file} の読み込みに失敗しました`);
        return;
    }

    const html = await response.text();
    const target = document.getElementById(id);

    if (target) {
        target.innerHTML = html;
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    // 共通部品
    await loadComponent("header", "components/header.html");
    await loadComponent("menu", "components/menu.html");
    await loadComponent("search", "components/search.html");
    await loadComponent("footer", "components/footer.html");

    // メニューの動作
    const menu = document.getElementById("sideMenu");
    const button = document.getElementById("menuButton");
    const overlay = document.getElementById("overlay");

    if (menu && button && overlay) {
        button.addEventListener("click", () => {
            menu.classList.toggle("open");
            overlay.classList.toggle("show");
        });

        overlay.addEventListener("click", () => {
            menu.classList.remove("open");
            overlay.classList.remove("show");
        });
    }

    // 検索窓の動作
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    if (searchButton && searchBox) {
        searchButton.addEventListener("click", () => {
            searchBox.classList.toggle("show");
        });
    }
});