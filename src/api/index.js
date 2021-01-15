const fetchApi = (url) => {
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch(err => {
      // 错误处理
      throw new Error()
    });
};

export default {
  // 获取新闻
  getItem: (id) => fetchApi(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`),
  // 获取评论
  getComment: (kid) => fetchApi(`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`),
  // 获取最新的新闻
  getNews: () => fetchApi('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'),
  // 添加评论
  writeComment: () => fetchApi(),
  // 添加评论
  replyComment: () => fetchApi(),
}
