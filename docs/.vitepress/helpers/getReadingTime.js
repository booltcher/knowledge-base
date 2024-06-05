function getWords(content) {
  return content.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
}

function getChinese(content) {
  return content.match(/[\u4E00-\u9FD5]/gu);
}

function getEnWordCount(content) {
  return (
    getWords(content)?.reduce(
      (accumulator, word) =>
        accumulator +
        (word.trim() === "" ? 0 : word.trim().split(/\s+/u).length),
      0
    ) || 0
  );
}

function getCnWordCount(content) {
  return getChinese(content)?.length || 0;
}

function getWordNumber(content) {
  return getEnWordCount(content) + getCnWordCount(content);
}
const getReadingTime = (
  content,
  cnWordPerMinute = 350,
  enWordPerMinute = 160
) => {
  const count = getWordNumber(content || "");
  const words = count >= 1000 ? `${Math.round(count / 100) / 10}k` : count;

  const enWord = getEnWordCount(content);
  const cnWord = getCnWordCount(content);

  const readingTime = cnWord / cnWordPerMinute + enWord / enWordPerMinute;

  const timeToRead =
    readingTime < 1 ? "1" : Number.parseInt(`${readingTime}`, 10);

  return {
    timeToRead,
    words,
  };
};

module.exports = getReadingTime;
