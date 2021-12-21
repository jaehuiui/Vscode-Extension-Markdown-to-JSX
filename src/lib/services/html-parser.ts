import { regex } from "../utils/regex";
import { tagList, toHtml } from "../utils/tag";

export function htmlParser(md: string) {
  for (const tag of tagList) {
    md = md.replace(regex[tag], toHtml[tag]);
  }

  return md.trim();
}
