export default function uniq<T>(array: Array<T>): Array<T> {
  return [...new Set<T>(array)]
}
