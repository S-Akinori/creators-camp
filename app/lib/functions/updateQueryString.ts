import { ReadonlyURLSearchParams } from "next/navigation";

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
  export const updateQueryString = (currentParams: QueryParams | ReadonlyURLSearchParams | string, key: string, value: string): string => {
    const params = new URLSearchParams(currentParams as string);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    return params.toString();
  }
  