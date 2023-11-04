import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { userTableFragment } from "src/graphql/fragment/user-table-fragement";
import { graphql } from "src/utils/graphql";
import performanceDate from "src/views/performance/performance-date";
import Details from "src/views/source/details";
import { UserTable } from "src/views/user/list-table";

export async function getServerSideProps(context: any) {
  const query = `
    query Source($id: Int!) {
      source(id: $id) {
        id
        createdAt
        updatedAt
        enterUsername
        circdate
        shndiskcount
        wavdiskcount
        archiveIdentifier
        comments
        textdoc
        mediaSize
        mediaSizeUncompressed

        checksums {
          edges {
            node {
              description
              body
              createdAt
              id
            }
          }
        }

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

        users (pagination: {first: 25}) {
          ...UserTableFragment
        }
      }
    }
  ` + userTableFragment;

  const id = Number(context.query.id);
  const graphqlResult = await graphql(query, {id}, 'Source');

  return {
    props: {
      graphql: graphqlResult,
      server: process.env.NEXT_PUBLIC_GRAPHQL_SERVER
    },
  }
}

function Source(props: any) {
  return (
    <>
      <Head>
        <title>
          SHNID
          {' '}
          {String(props.graphql.data.source.id)}
          {' '}
          {props.graphql.data.source.performance.artist.name}
          {' '}
          {performanceDate(props.graphql.data.source.performance)}
          {' '}

        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Details server={props.server} source={props.graphql.data.source}></Details>

              <hr />
              {
                props.graphql.data.source.users.edges.length ? (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                      Users with this source
                    </Typography>

                    <UserTable users={props.graphql.data.source.users}></UserTable>
                  </>
                ): (<>
                    <Typography gutterBottom variant="h5" component="div">
                      No users own this source
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

  export default Source;
