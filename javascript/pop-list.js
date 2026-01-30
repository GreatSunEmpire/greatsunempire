// Example data, could be loaded from a JSON file or API
const popularLinks = [
  { title: "與納斯共和國之合併公告", url: "https://greatsunempire.github.io/greatsunempire/post.html?category=PMOfficeA&id=1" },
  { title: "大陽聯合帝國對索洛夫當局制裁的正式回應", url: "https://greatsunempire.github.io/greatsunempire/post.html?category=ForeignMinistryA&id=3" },
  { title: "本帝國與索洛夫社會主義聯邦共和國斷交聲明", url: "https://greatsunempire.github.io/greatsunempire/post.html?category=ForeignMinistryA&id=2" },
  { title: "對索洛夫社會主義聯邦共和國不當行為之抗議聲明", url: "https://greatsunempire.github.io/greatsunempire/post.html?category=ForeignMinistryA&id=1"},
];

const list = document.getElementById('popular-list');
popularLinks.forEach(item => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = item.url;
  a.textContent = item.title;
  li.appendChild(a);
  list.appendChild(li);
});