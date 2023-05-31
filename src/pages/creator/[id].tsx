import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import { PaginationControls } from "src/utils/pagination";
import ArtistButton from "src/views/components/buttons/artist";
import ListTable from "src/views/identifier/list-table";

export async function getServerSideProps(context: any) {
  const query = `
    query CreatorIdentifiers($id: Int!, $after: String = "LTE=", $year: String = "2022") {
      creator(id: $id) {
        id
        name
        years
        artist {
          id
          name
        }
        identifiers (
          filter: {
            year: { eq: $year }
            performanceDate: { sort: "ASC" }
          }
          pagination: { after: $after }
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          totalCount
          edges {
            node {
              id
              archiveIdentifier
              performanceDate
              venue
              title
              source {
                id
                comments
              }
            }
          }
        }
      }
    }
  `;

  const page = Number(context.query.page) || 1;
  const id = Number(context.query.id);
  let year = context.query.year;
  const after = Buffer.from(String((page - 1) * 300 - 1)).toString('base64')

  if (! year) {
    const latestYearQuery = `
      query Creator($id: Int!) {
        creator (id: $id) {
          latestYear
        }
      }
    `;

    const result = await graphql(latestYearQuery, {id});
    year = String(result.data.creator.latestYear);
  }

  const graphqlResult = await graphql(query, {id, year, after}, 'CreatorIdentifiers');

  return {
    props: {
      graphql: graphqlResult,
      year,
      page
    },
  }
}

const Years = (props: any) => {
  const years: any[] = [];

  props.graphql.data.creator.years.map((year: any, key: any) => {
    years.push((
      <>
        <a
          key={key}
          href={"/creator/" + props.graphql.data.creator.id + "?year=" + year}
          className="year-link"
        >
          {(year === 1939) ? 'unknown' : year}
        </a>
        {' '}
      </>
    ));
  });

  return (
    <div>
      {years}
    </div>
  );
}

const NavButtons = (props: any) => {
  const buttons: any[] = [];

  if (props.graphql.data.creator.artist) {
    buttons.push((
      <ArtistButton artist={props.graphql.data.creator.artist} year={props.year}></ArtistButton>
    ));
  }

  return (
    <div>
      {buttons}
    </div>
  );
}

function CreatorIdentifiers(props: any) {
  return (
    <>
      <Head>
        <title>
          {props.graphql.data.creator.name}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Identifiers for {props.graphql.data.creator.name}
              </Typography>

              <NavButtons graphql={props.graphql}></NavButtons>

              <Years graphql={props.graphql}></Years>

              <PaginationControls
                graphql={props.graphql.data.creator.identifiers}
                page={props.page}
                pathname={'/creator/' + props.graphql.data.creator.id}
                baseQuery={{year: props.year}}>
              </PaginationControls>

              <hr />

              <ListTable identifiers={props.graphql.data.creator.identifiers}></ListTable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

  export default CreatorIdentifiers;
