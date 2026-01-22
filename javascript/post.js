function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

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

async function extractPostData() {
    const category = getUrlParam('category') || 'default';
    const id = getUrlParam('id');
    const jsonFile = categoryToJsonMap[category] || categoryToJsonMap['default'];

    try {
        const res = await fetch(jsonFile);
        if (!res.ok) throw new Error(`Loading Error: ${res.statusText}`);
        const posts = await res.json();

        // Find the post with the matching id
        const post = posts.find(p => String(p.id) === String(id));
        if (!post) {
            // No post found, return nulls or handle as needed
            return null;
        }

        // Extract all data into variables
        const postId = post.id;
        const postTitle = post.title;
        const postAuthor = post.author;
        const postAuthorImg = post.author_img;
        const postContext = post.context;
        const postAttachment = post.attachment;
        const postTime = post.time;

        document.getElementById('category-name').textContent = categoryToName[category] || categoryToName['default'];
        document.getElementById('post-title').textContent = postTitle;
        document.getElementById('post-author').textContent = postAuthor;
        document.getElementById('post-author-img').src = postAuthorImg;
        document.getElementById('post-context').textContent = postContext;
        document.getElementById('post-attachment').src = postAttachment;
        document.getElementById('post-time').textContent = postTime;
    } catch (err) {
        // Handle error as needed
        return null;
    }
}

extractPostData();