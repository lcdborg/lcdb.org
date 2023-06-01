import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { userTableFragment } from "src/graphql/fragment/user-table-fragement";
import { graphql } from "src/utils/graphql";
import Details from "src/views/performance/details";
import performanceDate from "src/views/performance/performance-date";
import { UserTable } from "src/views/user/list-table";

export async function getServerSideProps(context: any) {
  const query = `
    query Performance($id: Int!) {
      performance(id: $id) {
        id
        date
        year
        venue
        city
        state
        set1
        set2
        set3
        comment
        createdAt
        updatedAt
        sources {
          edges {
            node {
              id
              createdAt
              updatedAt
              circdate
              archiveIdentifier
              comments
              performance {
                id
                date
                year
                venue
                city
                state
                artist {
                  id
                  name
                }
              }
            }
          }
        }
        artist {
          id
          name
          artistToArtistGroups {
            edges {
              node {
                artistGroup {
                  id
                  title
                }
              }
            }
          }
        }
        users (pagination: {first: 25}) {
          ...UserTableFragment
        }
      }
    }
  ` + userTableFragment;

  const id = Number(context.query.id);
  const graphqlResult = await graphql(query, {id}, 'Performance');

  return {
    props: {
      graphql: graphqlResult,
    },
  }
}

function Performance(props: any) {

  return (
    <>
      <Head>
        <title>
          {props.graphql.data.performance.artist.name}
          {' '}
          {performanceDate(props.graphql.data.performance)}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Details performance={props.graphql.data.performance}></Details>

              <hr />
              {
                props.graphql.data.performance.users.edges.length ? (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                      Users with this performance
                    </Typography>

                    <UserTable users={props.graphql.data.performance.users}></UserTable>
                  </>
                ): (<>
                    <Typography gutterBottom variant="h5" component="div">
                      No users own this performance
                    </Typography>
                </>)
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

  export default Performance;
