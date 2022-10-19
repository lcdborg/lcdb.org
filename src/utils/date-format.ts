export default function dateFormat(dateString: string) {
  const date = new Date(dateString);

  return date.toString();
}