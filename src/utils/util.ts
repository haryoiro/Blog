// 配列から重複した要素を取り除く
export function uniq<T>(array: Array<T>): Array<T> {
  return [...new Set<T>(array)]
}

// ネストされた配列を一次元配列にする
export function flatten<U>(source: U[][]): U[] {
  return (<U[]>[]).concat(...source)
}

export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
