// this is done yet
const path = require("path");
const fs = require("fs");

module.exports = {
  Mutation: {
    uploadImage: async (parent, { file }) => {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../../public/images/${filename}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      return {
        url: `http://localhost:4000/images/${filename}`,
      };
    },
  },
};
