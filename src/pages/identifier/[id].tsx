import { Card, CardContent, Grid } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import Details from "src/views/identifier/details";

export async function getServerSideProps(context: any) {
  const query = `
    query Identifier($id: String!) {
      identifier(id: $id) {
        id
        archiveIdentifier
        performanceDate
        year
        venue
        title
        description
        source {
          id
          comments
        }
        creator {
          id
          name
        }
        files {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  `;
  // Including the files body causes invalid utf8 data.  Better to serve the
  // file raw through a download.

  const id = context.query.id;
  const graphqlResult = await graphql(query, {id}, 'Identifier');

  return {
    props: {
      graphql: graphqlResult,
    },
  }
}

function Identifier(props: any) {
  return (
    <>
      <Head>
        <title>
          {props.graphql.data.identifier.archiveIdentifier}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Details identifier={props.graphql.data.identifier}></Details>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

  export default Identifier;
