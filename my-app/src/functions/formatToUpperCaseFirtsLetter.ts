export const formatToUpperCaseFirtsLetter = (string?: string) => {
    if (!string) return ''
    const stringSplit = string.split(' ')
    return stringSplit
      ?.map(
        (word) =>
          word[0].toLocaleUpperCase() +
          word.substring(1, word.length).toLocaleLowerCase(),
      )
      .join(' ')
  }