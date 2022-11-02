import Head from 'next/head'
import Link from 'next/link';
import React from 'react';
import { graphql } from '../utils/graphql';
import { alphabet } from '../utils/pagination';
import { PaginationControls} from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import ListTable from 'src/views/creator/list-table';
import FromTo from 'src/views/creator/from-to';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query CreatorList($chr: String = "a", $after: String = "LTE=") {
      creators (filter: { name_sort: "ASC", name_startswith: $chr, _after: $after }) {
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
  query CreatorListOther($after: String = "LTE=") {
    creators (filter: { name_sort: "ASC", _after: $after }) {
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
    query CreatorList($filter: String = "a", $after: String = "LTE=") {
      creators (filter: { name_sort: "ASC", name_contains: $filter, _after: $after }) {
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
  const chr = context.query.chr || 'a';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter || '';

  switch (chr) {
    case 'other':
      query = otherQuery;
      operationName = 'CreatorListOther';
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


function Creators(props: any) {
  const router = useRouter();

  const applyFilter = async (event: any) => {
    if (event.keyCode !== 13) {
      return;
    }

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const query = new URLSearchParams();
    query.set('filter', event.target.value);

    router.push('/creators?' + query.toString());
  }

  return (
    <>
      <Head>
        <title>LCDB: Creators</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Creators
              </Typography>

              <div>
                {alphabet(true).map((chr, key) => (
                  <Link
                    href={{
                      pathname: 'creators',
                      query: {chr}
                    }}
                    key={key}
                  ><a className="alphabet">{chr}</a></Link>
                ))}

                <Link
                  href={{
                    pathname: 'creators',
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
                graphql={props.graphql.data.creators}
                page={props.page}
                pathname='/creators'
                baseQuery={{chr: props.chr}}>
              </PaginationControls>

              <FromTo graphql={props.graphql} pathname="/creator/"/>
            </div>

            <hr />

            <ListTable graphql={props.graphql} pathname="/creator/"/>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Creators