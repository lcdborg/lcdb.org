export const userTableFragment = `
  fragment UserTableFragment on Connection_User {
    edges {
      cursor

      node {
        id
        name
        username
        activetrading
        userPerformanceCount
        lastUpdate
        topArtists (first: 4) {
          id
          name
          userPerformanceCount
        }
      }
    }

    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }

    totalCount
  }
`;