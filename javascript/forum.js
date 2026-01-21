let currentPage = 1;
const postsPerPage = 10; //每頁帖文數設定
let totalPosts = [];
let totalPages = 0;

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

// 加載指定json文件的數據
async function loadAllPosts(jsonFile) {
    try {
        // 發起請求獲取數據
        const res = await fetch(jsonFile);
        if (!res.ok) throw new Error(`Loading Error: ${res.statusText}`);
        totalPosts = await res.json();
        totalPages = Math.ceil(totalPosts.length / postsPerPage);
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

    // 生成表格
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>標題(繁中)</th>
            <th>標題(英文)</th>
            <th>作者(繁中)</th>
            <th>作者(英文)</th>
            <th>內容(繁中)</th>
            <th>內容(英文)</th>
            <th>發佈時間</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const post of currentPosts) {
        const tr = document.createElement('tr');
        // 依次创建列（与表头对应）
        const idTd = document.createElement('td'); 
        idTd.textContent = post.id ?? '';
        const titleTd = document.createElement('td'); 
        titleTd.textContent = post.title ?? '';
        const title_engTd = document.createElement('td');
        title_engTd.textContent = post.title_eng ?? '';
        const authorTd = document.createElement('td'); 
        authorTd.textContent = post.author ?? '';
        const author_engTd = document.createElement('td');
        author_engTd.textContent = post.author_eng ?? '';
        const contextTd = document.createElement('td'); 
        contextTd.textContent = post.context ?? ''; 
        const context_engTd = document.createElement('td');
        context_engTd.textContent = post.context_eng ?? '';
        const attachmentTd = document.createElement('td'); 
        attachmentTd.textContent = post.attachment ?? '';
        const timeTd = document.createElement('td'); 
        timeTd.textContent = post.time ?? '';

        // 追加所有列到行
        tr.appendChild(idTd);
        tr.appendChild(titleTd);
        tr.appendChild(title_engTd);
        tr.appendChild(authorTd);
        tr.appendChild(author_engTd);
        tr.appendChild(contextTd);
        tr.appendChild(context_engTd);
        tr.appendChild(timeTd);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);

    // 分頁容器
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    container.appendChild(paginationContainer);
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // 上一頁按钮
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '上一頁';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevBtn);

    // 𧟴碼按钮
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.style.backgroundColor = '#007bff';
            pageBtn.style.color = 'white';
        }
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
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextBtn);

    // 樣式style
    const allButtons = paginationContainer.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.style.margin = '0 4px';
        btn.style.padding = '4px 12px';
        btn.style.border = '1px solid #ccc';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = 'white';
    });
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