type RegexType = {
  [key: string]: RegExp;
};

export const regex: RegexType = {
  h1: /^# (.*$)/gim,
  h2: /^## (.*$)/gim,
  h3: /^### (.*$)/gim,
  h4: /^#### (.*$)/gim,
  h5: /^##### (.*$)/gim,
  h6: /^###### (.*$)/gim,
  b: /\*\*(.*)\*\*/gim,
  i: /\*(.*)\*/gim,
  br: /\n$/gim,
  a: /\[(.*?)\]\((.*?)\)/gim,
  bq: /^\> (.*$)/gim,
  img: /!\[(.*?)\]\((.*?)\)/gim,
};
