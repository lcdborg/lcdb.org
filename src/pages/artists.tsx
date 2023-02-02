import Head from 'next/head'
import Link from 'next/link';
import React from 'react';
import { graphql } from '../utils/graphql';
import { PaginationControls} from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import ListTable from 'src/views/artist/list-table';
import FromTo from 'src/views/artist/from-to';
import { useRouter } from 'next/router';
import AlphabetLinks from 'src/views/components/alphabet-links';

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query ArtistList($chr: String = "a", $after: String = "LTE=") {
      artists: artistsUnprefix (
        filter: {
          nameUnprefix: { sort: "ASC", startswith: $chr }
        }
        pagination: { after: $after}
      ) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name
          }
        }
      }
    }
  `;

  const top100query = `
  {
    artists: artistsUnprefix (
      filter: {
        nameUnprefix: { sort: "ASC" }
        top100: { eq: true }
      }
    ) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
  }
  `;

  const otherQuery = `
    query ArtistUnprefixListOther($after: String = "LTE=") {
      artists: artistsUnprefix (
        filter: {
          nameUnprefix: { sort: "ASC" }
        }
        pagination: { after: $after }
      ) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name
          }
        }
      }
    }
  `;

  const filterQuery = `
    query ArtistList($filter: String = "a", $after: String = "LTE=") {
      artists: artistsUnprefix (
        filter: {
          nameUnprefix: { sort: "ASC" }
          name: { contains: $filter }
        }
        pagination: { after: $after }
      ) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name
          }
        }
      }
    }
  `;

  let query = standardQuery;
  let operationName = '';
  const chr = context.query.chr ? context.query.chr : 'top100';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter ? context.query.filter : '';

  switch (chr) {
    case 'top100':
      query = top100query;
      break;
    case 'other':
      query = otherQuery;
      operationName = 'ArtistUnprefixListOther';
      break;
    default:
      break;
  }

  const variables = {
    chr: context.query.chr ? context.query.chr : 'a',
    filter,
    after: Buffer.from(String((page - 1) * 300 - 1)).toString('base64')
  };

  if (filter) {
    query = filterQuery;
  }

  return {props: {
    graphql: await graphql(query, variables, operationName),
    page: page,
    chr: chr,
    filter: filter
  }}
}


function Artists(props: any) {
  const router = useRouter();

  const applyFilter = async (event: any) => {
    if (event.keyCode !== 13) {
      return;
    }

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const query = new URLSearchParams();
    query.set('filter', event.target.value);

    router.push('/artists?' + query.toString());
  }

  return (
    <>
      <Head>
        <title>LCDB: Artists</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Artists
              </Typography>

              <div>
                <Link
                  href={{
                    pathname: 'artists',
                    query: {chr: 'top100'}
                  }}
                ><a className="alphabet">top 100</a></Link>
                {' '}

                <AlphabetLinks pathname='artists'></AlphabetLinks>

                <Link
                  href={{
                    pathname: 'artists',
                    query: {chr: 'other'}
                  }}
                ><a className="alphabet">other</a></Link>

                <br />

              <span className="alphabet-link">
                Filter&nbsp;
                <input
                  type="text"
                  style={{ width: "15em" }}
                  onKeyDown={applyFilter}
                  defaultValue={props.filter}
                />
              </span>


              <br />

              <PaginationControls
                graphql={props.graphql.data.artists}
                page={props.page}
                pathname='/artists'
                baseQuery={{chr: props.chr}}>
              </PaginationControls>

              <FromTo graphql={props.graphql} pathname="/artist/"/>
            </div>

            <hr />

            <ListTable graphql={props.graphql} pathname="/artist/"/>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Artists