export function dateFormat(dateString: string) {
  const date = new Date(dateString);

  return date.toString();
}

export function dateFormatShort(dateString: string) {
  const date = new Date(dateString);

  return date.getFullYear() + '-' + date.getMonth() +  '-' + date.getDate();
}