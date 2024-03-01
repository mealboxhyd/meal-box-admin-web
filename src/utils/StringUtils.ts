/* eslint-disable @typescript-eslint/no-explicit-any */
export const StringUtils = {
  isNotEmpty: (inputStr: any) => {
    return (
      inputStr && typeof inputStr === "string" && inputStr.trim().length > 0
    );
  },
  isEmpty: (value: any) => {
    return !value || (typeof value === "string" && value.trim().length === 0);
  },
  cleanStringForUI: (inputStr: string) => {
    return inputStr?.replace(/&rsquo;/g, "'");
  },
  cleanStringForAPI: (inputStr: string) => {
    return inputStr?.replace(/'/g, ESC_HTML_CHARS.SINGLE_QUOTE);
  },
};
const ESC_HTML_CHARS = {
  SINGLE_QUOTE: "&rsquo;",
};

const isNotEmpty = (inputStr: any) => {
  return inputStr && typeof inputStr === "string" && inputStr.trim().length > 0;
};
const cleanStringForUI = (inputStr: string) => {
  return inputStr?.replace(/&rsquo;/g, "'");
};
const cleanStringForAPI = (inputStr: string) => {
  return inputStr?.replace(/'/g, ESC_HTML_CHARS.SINGLE_QUOTE);
};

export { isNotEmpty, cleanStringForUI, cleanStringForAPI };
