document.addEventListener('DOMContentLoaded', function() {
    const RSS_URL = 'https://www.wired.com/feed/rss';
    const articleList = document.getElementById('article-list');

    fetch(RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll('item');
            let articles = [];

            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const pubDate = new Date(item.querySelector('pubDate').textContent);

                if (pubDate >= new Date('2022-01-01')) {
                    articles.push({ title, link, pubDate });
                }
            });

            articles.sort((a, b) => b.pubDate - a.pubDate);

            articles.forEach(article => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = article.link;
                a.textContent = article.title;
                a.target = "_blank"; 
                li.appendChild(a);
                articleList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching RSS feed:', error));
});
