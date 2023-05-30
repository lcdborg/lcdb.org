import Link from "next/link";

export function UserLink(props: any) {
  return (
    <Link
      href={{ pathname: '/user/' + props.user.username}}
    >
      {props.user.name}
    </Link>
  );
}

