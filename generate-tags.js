const fs = require("fs");
const path = require("path");
const glob = require("glob");
const yaml = require("js-yaml");

const generateTags = () => {
  const tagsSet = new Set();
  const articles = [];

  const files = glob.sync(path.join(__dirname, "docs/src/**/*.md")); // 修改为实际路径

  files.forEach((file) => {
    // 跳过自定义页面（不算做文章）
    if (file.includes("custom-pages")) {
      return; 
    }
    const content = fs.readFileSync(file, "utf8");

    // 将所有tab字符替换为4个空格
    const contentWithoutTabs = content.replace(/\t/g, "    ");

    const match = contentWithoutTabs.match(/^---\n([\s\S]*?)\n---/);

    if (match) {
      try {
        const frontMatter = yaml.load(match[1]);
        const filePath = file.replace(path.join(__dirname, "docs"), "");

        // 从内容中提取标题
        const titleMatch = contentWithoutTabs.match(/^#\s+(.+)/m);
        const title = titleMatch ? titleMatch[1] : "Untitled";

        if (frontMatter.tags) {
          frontMatter.tags.forEach((tag) => tagsSet.add(tag));
          articles.push({
            path: filePath.replace(/\.md$/, ""),
            title,
            tags: frontMatter.tags,
          });
        }
      } catch (e) {
        console.error(`Error parsing YAML front matter in file: ${file}`, e);
      }
    }
  });

  const tagsArray = Array.from(tagsSet).sort();
  const data = { tags: tagsArray, articles };

  const outputDir = path.join(__dirname, "docs/src/custom-pages/tag-page");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, "tags.json"),
    JSON.stringify(data, null, 2)
  );
};

generateTags();
