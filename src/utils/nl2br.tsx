export default function nl2br(text: string) {
  return text.split('\n').map(function(item, key) {
    return (
      <span key={key}
        dangerouslySetInnerHTML={{ __html: item + '<br/>'}}
      ></span>
    )
  });
}