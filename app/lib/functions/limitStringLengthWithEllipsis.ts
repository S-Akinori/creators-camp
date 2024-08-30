/**
 * 文字列の長さを制限し、必要に応じて省略記号を追加する関数
 * @param str - 入力文字列
 * @param maxLength - 最大文字数
 * @returns 最大文字数を超えた場合はトリミングされ、省略記号が追加された文字列
 */
export function limitStringLengthWithEllipsis(str: string, maxLength: number): string {
  if(!str) return '';
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}