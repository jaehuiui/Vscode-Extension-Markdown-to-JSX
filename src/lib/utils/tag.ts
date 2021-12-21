export const tagList = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "b",
  "i",
  "br",
  "a",
  "bq",
  "img",
];

type HtmlType = {
  [key: string]: string;
};

export const toHtml: HtmlType = {
  h1: "<h1>$1</h1>",
  h2: "<h2>$1</h2>",
  h3: "<h3>$1</h3>",
  h4: "<h4>$1</h4>",
  h5: "<h5>$1</h5>",
  h6: "<h6>$1</h6>",
  b: "<b>$1</b>",
  i: "<i>$1</i>",
  br: "<br/>",
  a: "<a href='$2'>$1</a>",
  bq: "<blockquote>$1</blockquote>",
  img: "<img alt='$1' src='$2' />",
};
