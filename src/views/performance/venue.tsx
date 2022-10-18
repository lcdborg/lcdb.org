export default function Venue(props: any) {
  let venue = props.performance.venue;

  if (venue) {
    if (props.performance.city) {
      venue += ', ' + props.performance.city;
    }
  } else {
    venue = props.performance.city;
  }

  if (venue) {
    if (props.performance.state) {
      venue += ', ' + props.performance.state;
    }
  } else {
    venue = props.performance.state;
  }

  return (
    <>
      {venue}
    </>
  )
}
