import { Card, CardContent, Grid } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import performanceDate from "src/views/performance/performance-date";
import Details from "src/views/source/details";

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
      }
    }
  `;

  const id = Number(context.query.id);
  const graphqlResult = await graphql(query, {id}, 'Source');

  return {
    props: {
      graphql: graphqlResult,
    },
  }
}

function Source(props: any) {
  return (
    <>
      <Head>
        <title>
          LCDB:
          {' '}
          {props.graphql.data.source.performance.artist.name}
          {' '}
          {performanceDate(props.graphql.data.source.performance)}
          {' '}
          ({String(props.graphql.data.source.id)})
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Details source={props.graphql.data.source}></Details>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

  export default Source;
