const fs = require("fs")
const rss = require("rss")
const matter = require("gray-matter")
const path = require("path")

const root = process.cwd();

async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".md", ""),
      },
      ...allPosts,
    ].sort((itemA, itemB) => {
      if (itemA.publishedAt > itemB.publishedAt) return -1;
      if (itemA.publishedAt < itemB.publishedAt) return 1;
      return 0;
    });
  }, []);
}

async function getRssData() {
  const feed = new rss({
    title: "Hanami Mastery newest episodes!",
    description: "The best way to master Hanami ruby framework!",
    feed_url: "https://hanamimastery.com/feed",
    author: "Sebastian Wilgosz",
    site_url: "https://hanamimastery.com",
    image_url: "https://hanamimastery.com/logo-hm.jpeg",
    managingEditor: "Sebastian Wilgosz",
    webMaster: "Sebastian Wilgosz",
    copyright: `${new Date().getFullYear()} Sebastian Wilgosz`,
    language: "en-us",
    categories: ["Ruby", "Hanami", "Web development"],
    pubDate: new Date().toUTCString(),
    ttl: "60",
  });

  const posts = await getAllFilesFrontMatter("articles");
  const episodes = await getAllFilesFrontMatter("episodes");
  const postsWithSlug = posts.map((item) => ({
    ...item,
    url: `https://hanamimastery.com/articles/${item.slug}`,
  }));
  const episodesWithSlug = episodes.map((item) => ({
    ...item,
    url: `https://hanamimastery.com/episodes/${item.slug}`,
  }));
  const items = postsWithSlug.concat(episodesWithSlug).sort((itemA, itemB) => {
    if (itemA.publishedAt > itemB.publishedAt) return -1;
    if (itemA.publishedAt < itemB.publishedAt) return 1;
    return 0;
  });
  items.map(
    ({
      author,
      excerpt,
      tags,
      videoId,
      publishedAt,
      title,
      url,
      thumbnail,
    }) => {
      const xmlItem = {
        title,
        image: `${process.env.NEXT_PUBLIC_BASE_URL}${thumbnail.big}`,
        description: excerpt,
        categories: tags,
        date: publishedAt,
        url,
      };
      // if (!!videoId) {
      //   xmlItem.enclosure = {
      //     'url'  : `https://www.youtube.com/embed/${videoId}`,
      //     'type' : 'video'
      //   }
      // }
      feed.item(xmlItem);
    }
  );
  return feed;
}

async function generateRssFeed() {
  try {
    const feed = await getRssData();
    console.log(feed)

    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/feed.xml", feed.xml());  
  } catch (error) {
    console.log(error)
  }
}

generateRssFeed()