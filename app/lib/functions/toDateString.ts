export const toDateString = (str: string) => {
    const date = new Date(str)
    return date.toLocaleDateString('ja-JP')
}