// Example data, could be loaded from a JSON file or API
const popularLinks = [
  { title: "Service 1", url: "link1.html" },
  { title: "Service 2", url: "link2.html" },
  { title: "Service 3", url: "link3.html" },
  { title: "Service 4", url: "link4.html" },
  { title: "Service 5", url: "link5.html" }
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