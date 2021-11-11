// TODO Typings
export const PARAMETERS = {
  outputSvgFileName: {
    default: 'graphFile.svg',
    envKey: 'CDR_SVG_FILE_NAME',
    description: 'image filename'
  }
};

export function getValue(key: string) {
  if (process.env[PARAMETERS[key].envKey]) {
    return process.env[PARAMETERS[key].envKey];
  }

  return PARAMETERS[key].default;
}

export function checkAndGetValue(value: unknown, key: string) {
  if (value !== undefined) {
    return value;
  }

  return getValue(key);
}

export function getDefault(key: string) {
  return PARAMETERS[key].default;
}

export function getDescription(key: string) {
  return PARAMETERS[key].description;
}
