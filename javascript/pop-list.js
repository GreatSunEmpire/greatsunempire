// Example data, could be loaded from a JSON file or API
const popularLinks = [
  { title: "與納斯共和國之合併公告", url: "link1.html" },
  { title: "大陽聯合帝國對索洛夫當局制裁的正式回應", url: "link2.html" },
  { title: "本帝國與索洛夫社會主義聯邦共和國斷交聲明", url: "link3.html" },
  { title: "對索洛夫社會主義聯邦共和國不當行為之抗議聲明", url: "#" },
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