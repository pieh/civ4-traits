const scrapeData = require(`./scrape-data`);

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const { createNode } = actions;
  const leaders = await scrapeData();

  require(`fs-extra`).writeJSONSync("./leaders.json", leaders);

  leaders.forEach(leader => {
    const leaderNode = {
      id: createNodeId(leader.leader),
      ...leader,
      internal: {
        type: `CivLeader`,
        contentDigest: createContentDigest(leader)
      }
    };

    createNode(leaderNode);
  });
};
