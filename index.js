var fs = require("fs");
const path = require("path");

const solution = (input) => {
  const result = {};
  input.forEach((obj) => {
    const keys = Object.keys(obj.provider);
    keys.forEach((key) => {
      if (!result[key]) {
        result[key] = { [obj.provider[key]]: [obj.fileName] };
      } else {
        if (result[key][obj.provider[key]]) {
          result[key] = {
            ...result[key],
            [obj.provider[key]]: [
              ...result[key][obj.provider[key]],
              obj.fileName,
            ],
          };
        } else {
          result[key] = { ...result[key], [obj.provider[key]]: [obj.fileName] };
        }
      }
    });
  });

  return result;
};

const fsp = fs.promises;

async function readFiles(dirname = path.resolve(__dirname) + "/input/") {
  const data = [];
  const files = await fsp.readdir(dirname);
  for (const filename of files) {
    const full = path.join(dirname, filename);
    const content = await fsp.readFile(full, { encoding: "utf8" });
    data.push({ ...JSON.parse(content), fileName: filename });
  }
  return data;
}

readFiles().then((res) => {
  const finalResponse = solution(res);
  console.log(finalResponse);
});
