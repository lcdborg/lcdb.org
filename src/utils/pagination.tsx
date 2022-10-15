import Link from 'next/link';

function getMaxPage(totalCount: number): number {
  return Math.ceil(totalCount / 300);
}

function getPages(page: number, totalCount: number): number[] {
  const pages = [];

  for (let i = page; i >= page - 2; i--) {
    if (i && i > 0) {
      pages.push(i);
    }
  }

  for (let i = page + 1; i <= page + 4; i++) {
    const total = Math.ceil(totalCount / 300) * 300;

    if (total - (i * 300) >= 0) {
      if (! pages.includes(i) && pages.length < 5) {
        pages.push(i);
      }
    }
  }

  for (let i = page; i > 1 + 4; i--) {
    const total = Math.ceil(totalCount / 300) * 300;

    if (total - (i * 300) >= 0) {
      if (i >= 1 && ! pages.includes(i) && pages.length < 5) {
        pages.push(i);
      }
    }

    if (pages.length === 5) {
      break;
    }
  }

  pages.sort(function(a, b) {
    return a - b;
  });

  return pages;
}

export function alphabet(caps = false): string[] {
  const alphabet: string[] = [];
  const offset = (caps) ? 65 : 97;

  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(i + offset));
  }

  return alphabet;
}

export function PaginationControls(props: any) {
  if (! props.graphql || (
    ! props.graphql.pageInfo.hasNextPage
    && ! props.graphql.pageInfo.hasPreviousPage
  )) {
    return <span />;
  }

  const controls = [];
  const pathname = props.pathname;

  controls.push((
    <Link href={{pathname, query: {page: 1, ...props.baseQuery}}}>
      <a className="pagination-link">
        |&lt; FIRST
      </a>
    </Link>
  ));

  if (props.graphql.pageInfo.hasPreviousPage) {
    controls.push((
      <Link href={{pathname, query: {page: props.page - 1, ...props.baseQuery}}}>
        <a className="pagination-link">
          &lt; PREV
        </a>
      </Link>
    ));
  }

  getPages(props.page, props.graphql.totalCount).map((mapPage: any, key: any) => {
    controls.push((
      <Link key={key} href={{pathname, query: {page: mapPage, ...props.baseQuery}}}>
        <a className="pagination-link">
          { mapPage }
        </a>
      </Link>
    ));
  })

  if (props.graphql.pageInfo.hasNextPage) {
    controls.push((
      <Link href={{pathname, query: {page: props.page + 1, ...props.baseQuery}}}>
        <a className="pagination-link">
          NEXT &gt;
        </a>
      </Link>
    ));
  }

  controls.push((
    <Link href={{pathname, query: {page: getMaxPage(props.graphql.totalCount), ...props.baseQuery}}}>
      <a className="pagination-link">
        LAST |&gt;
      </a>
    </Link>
  ));

  return (
    <>
      <div>
        {controls}
      </div>
    </>
  )
}
