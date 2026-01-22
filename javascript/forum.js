let currentPage = 1;
const postsPerPage = 10; //每頁帖文數設定
let totalPosts = [];
let totalPages = 0;
let category = '';

// URL參數獲取
function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

// 目錄與json資料庫對應表
const categoryToJsonMap = {
    "PMOfficeA": "../database/IDG/pm_office_a.json", // 首相府
    "ForeignMinistryA": "../database/IDG/foreign_a.json", // 外交部
    "RoyalDecrees": "../database/IDG/royal_decree.json", // 皇家命令
    "Const-Laws": "../database/laws/constitution_laws.json", // 憲政
    "Current-Laws": "../database/laws/current_laws.json", // 現行法令
    "default": "../forum_sample.json" // 默认文件
};

const categoryToName = {
    "PMOfficeA": "官方訊息---首相府",
    "ForeignMinistryA": "官方訊息---外交部",
    "RoyalDecrees": "官方訊息---皇家命令",
    "Const-Laws": "法律---憲政",
    "Current-Laws": "法律---現行法令",
    "default": "一般討論區"
};

// 加載指定json文件的數據
async function loadAllPosts(jsonFile) {
    try {
        // 發起請求獲取數據
        const res = await fetch(jsonFile);
        if (!res.ok) throw new Error(`Loading Error: ${res.statusText}`);
        totalPosts = await res.json();

        document.getElementById('forum-title').textContent = categoryToName[getUrlParam('category')] || categoryToName['default'];
        document.getElementById('total').textContent = totalPosts.length;

        totalPages = Math.ceil(totalPosts.length / postsPerPage);

        document.getElementById('totalPages').textContent = totalPages;

        renderPosts(currentPage);
        renderPagination();
    } catch (err) {
        document.getElementById('posts').textContent = 'Loading Error: ' + err.message;
    }
}

// 修正表头与内容列匹配，补充完整表头
function renderPosts(page) {
    const container = document.getElementById('posts');
    container.innerHTML = '';

    if (!totalPosts || totalPosts.length === 0) {
        container.textContent = 'None avaliable data';
        return;
    }

    // 分頁計算
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts.length);
    const currentPosts = totalPosts.slice(startIndex, endIndex);

    // 為每個帖子創建一個單獨的容器
    for (const post of currentPosts) {
        // Create a link that wraps the post container
        const postLink = document.createElement('a');
        postLink.href = `post.html?category=${encodeURIComponent(category)}&id=${encodeURIComponent(post.id)}`;
        postLink.className = 'post-container';
        postLink.style.textDecoration = 'none'; // Optional: remove underline

        // 帖子標題
        const title = document.createElement('h2');
        title.className = 'post-title';
        title.textContent = post.title ?? '(No Title)';
        postLink.appendChild(title);

        // 作者和時間
        const meta = document.createElement('div');
        meta.className = 'post-meta';
        meta.textContent = `作者 / Author: ${post.author ?? ''} | 時間 / Time: ${post.time ?? ''} | ID: ${post.id ?? ''}`;
        postLink.appendChild(meta);

        container.appendChild(postLink);
    }

    // 分頁容器
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    container.appendChild(paginationContainer);

    document.getElementById('current_page').textContent = currentPage;
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // 上一頁按钮
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '上一頁';
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = 'pagination-btn';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevBtn);

    // 頁碼按钮
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderPosts(currentPage);
            renderPagination();
        });
        paginationContainer.appendChild(pageBtn);
    }

    // 下一頁按钮
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '下一頁';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = 'pagination-btn';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextBtn);
}

// 初始化
(function init() {
    // 獲取category參數
    const category = getUrlParam('category') || 'default';
    // 映射到json文件
    const targetJsonFile = categoryToJsonMap[category] || categoryToJsonMap['default'];
    //加載數據
    loadAllPosts(targetJsonFile);
})();