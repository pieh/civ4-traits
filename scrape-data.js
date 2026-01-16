const axios = require(`axios`);
const cheerio = require("cheerio");

const run = async () => {
  const response = await axios.get(
    `https://www.civfanatics.com/civ4/civilopedia/civilizations/`
  );

  const $ = cheerio.load(response.data);

  const data = [];
  let civData = null;

  $("table")
    .eq(1)
    .find("tr")

    .each(function (i) {
      if (i === 0) {
        return true;
      }

      const cells = $(this).find(`td`);

      const getOffset = (index) => {
        if (index < 4 || cells.length === 8) {
          return index;
        } else return index - 4;
      };

      const extractText = (index) => {
        return cells
          .eq(getOffset(index))
          .find("span,em,p")
          .text()
          .replace(/\n/g, ``)
          .trim();
      };

      const extractList = (index) => {
        let td = cells.eq(getOffset(index));

        let html = td.find("span,em,p").html();

        if (!html) {
          html = td.html();
        }

        return html
          .replace(/\n/g, ``)
          .split("<br>")
          .map((text) => text.trim());
      };

      const extractImageSrc = (index) => {
        const src = cells.eq(getOffset(index)).find("img").prop("data-src");
        return src
          ? src.startsWith("data:")
            ? src
            : `https://www.civfanatics.com${src}`
          : null;
      };

      if (cells.length === 8) {
        civData = {
          civ: extractText(0),
          civImage: extractImageSrc(0),
          uniqueUnit: extractText(1),
          uniqueBuilding: extractText(2),
          startingTechs: extractList(3),
        };
      }

      data.push({
        ...civData,
        leader: extractText(4),
        leaderImage: extractImageSrc(4),
        traits: extractList(5),
        favouriteCivic: extractText(7),
      });

      const span = cells.eq(0).prop(`rowspan`);
    });

  return data;
};

module.exports = run;
