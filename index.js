const OBJ_KEY = '@@object';
const FILE_PREFIX = '@@file:';

const createFileLink = index => `${FILE_PREFIX}${index}`;

const isFileLink = unknown => typeof unknown === 'string' && unknown.indexOf(FILE_PREFIX) === 0 && !Number.isNaN(unknown.slice(FILE_PREFIX.length))

const pack = (data) => {
  try {
    const blobs = [];
    let id = 0;
    const series = JSON.stringify(data, (field, input) => {
      if (input instanceof Blob) {
        const key = createFileLink(id++);
        blobs.push({
          id: key,
          value: input
        });
        return key;
      }
      return input;
    });
    const formData = new FormData();
    formData.append(OBJ_KEY, series);
    blobs.forEach(({ id, value }) => {
      formData.append(id, value);
    });
    return formData;
  } catch(e) {
    throw new Error('unable to pack data');
  }
}

const parse = (input) => {
  try {
    const series = input[OBJ_KEY];
    return JSON.parse(series, (field, data) => {
      if (isFileLink(data)) {
        return input[data];
      }
      return data;
    });
  } catch(e) {
    throw new Error('unable to parse input');
  }
}

const unpack = (formData) => {
  if (!formData instanceof FormData) {
    throw new Error('not an instance of FormData');
  }
  try {
    const dict = {};
    for (let key of formData.keys()) {
      dict[key] = formData.get(key);
    }
    return parse(dict);
  } catch(e) {
    throw new Error('unable to unpack data');
  }
}

module.exports = {
  pack,
  parse,
  unpack,
  OBJ_KEY,
}
