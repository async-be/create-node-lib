const fs = require("fs");

const FILE_FORMAT = {
  JSON: Symbol.for("FILE_FORMAT_JSON"),
  RAW: Symbol.for("FILE_FORMAT_RAW"),
};

const fileJson = path => {
  let _path = path;
  let _content = {};

  const getPath = () => _path;
  const setPath = p => (_path = p);

  const getContent = () => _content;
  const setContent = c => {
    _content =
      Object.prototype.toString.call(c) === "[object Function]"
        ? c(_content)
        : c;
  };

  const writeOnDisk = () => {
    fs.writeFileSync(_path, JSON.stringify(_content, null, 2), { mode: "777" });
  };

  return {
    getPath,
    setPath,
    getContent,
    setContent,
    writeOnDisk,
  };
};

const fileRaw = path => {
  let _path = path;
  let _content = {};

  const getPath = () => _path;
  const setPath = p => (_path = p);

  const getContent = () => _content;
  const setContent = c => {
    _content =
      Object.prototype.toString.call(c) === "[object Function]"
        ? c(_content)
        : c;
  };

  const writeOnDisk = () => {
    fs.writeFileSync(_path, _content, { mode: "777" });
  };

  return {
    getPath,
    setPath,
    getContent,
    setContent,
    writeOnDisk,
  };
};

const file = (path, contentFormat = FILE_FORMAT.JSON) => {
  switch (contentFormat) {
    case FILE_FORMAT.JSON:
      return fileJson(path);
    case FILE_FORMAT.RAW:
      return fileRaw(path);
  }
};

module.exports = {
  FILE_FORMAT,
  file,
};
