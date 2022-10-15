import { catchError, firstValueFrom, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function graphql(
  query: string,
  variables: any = {},
  operationName = ''
) {
  return firstValueFrom(
    fromFetch('https://graphql.lcdb.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'query': query,
        'variables': variables,
        'operationName': operationName,
      })
    }).pipe(
      switchMap(response => {
        if (response.ok) {
          // OK return data
          return response.json();
        } else {
          // Server is returning a status requiring the client to try something else.
          return of({ error: true, message: `Error ${ response.status }` });
        }
      }),
      catchError(err => {
        // Network or other error, handle appropriately
        console.error(err);

        return of({ error: true, message: err.message })
      })
    )
  );
}
