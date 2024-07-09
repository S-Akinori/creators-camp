// utils/updateQueryString.ts
interface QueryParams {
    [key: string]: string | undefined;
  }
  
  /**
   * クエリパラメータを追加または更新して文字列として返す関数
   * @param currentParams - 現在のクエリパラメータ
   * @param key - 追加または更新するクエリパラメータのキー
   * @param value - 追加または更新するクエリパラメータの値
   * @returns 新しいクエリ文字列
   */
  export const updateQueryString = (currentParams: QueryParams, key: string, value: string): string => {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    params.set(key, value);
    return params.toString();
  }
  