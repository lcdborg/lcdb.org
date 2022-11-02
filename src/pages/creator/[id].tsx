import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import { PaginationControls } from "src/utils/pagination";
import ListTable from "src/views/identifier/list-table";

export async function getServerSideProps(context: any) {
  const query = `
    query CreatorIdentifiers($id: Int!, $after: String = "LTE=", $year: String = "2022") {

      years: identifierYears(id: $id)

      creator(id: $id) {
        id
        name
        identifiers (filter: {_after: $after, year: $year, performanceDate_sort: "ASC" }) {
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
  let year = String(context.query.year);
  const after = Buffer.from(String((page - 1) * 300 - 1)).toString('base64')

  if (! year) {
    const latestYearQuery = `
      query IdentifierLatestYear($id: Int!) {
        identifierLatestYear(id: $id)
      }
    `;

    const result = await graphql(latestYearQuery, {id});
    year = String(result.data.sourceLatestYear);
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

  props.graphql.data.years.map((year: any, key: any) => {
    years.push((
      <a
        key={key}
        href={"/creator/" + props.graphql.data.creator.id + "?year=" + year}
        className="year-link"
      >
        {(year === 1939) ? 'unknown' : year}
      </a>
    ));
  });

  return (
    <div>
      {years}
    </div>
  );
}

function CreatorIdentifiers(props: any) {

  console.log(props.graphql);

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
