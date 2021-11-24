const PORT = 8666;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen";

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);
  const article = []
  $(".ipQwMb", html).each(function () {
    const title = $(this).text();
    const link = $(this).find("a").attr("href");

    article.push({
        title,
        link
    })
  })
  console.log(article)
}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
