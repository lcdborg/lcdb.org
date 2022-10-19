export default function MediaSize(props: any) {
  const originalSize = Number(props.size);
  let size = Number(props.size);
  let i = 0;

  if (! size) {
    return (<>0</>);
  }

  const bytes = ['KB', 'KB', 'MB', 'GB', 'TB'];

  if (size <= 1024) {
    size = 1;
  }

  for (i = 0; size > 1024; i++) {
    size /= 1024;
  }

  return (
    <>
      {String(Math.round(size * 100) / 100)} {bytes[i]}
      ({originalSize} bytes)
    </>
  )
}