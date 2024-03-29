import Head from 'next/head'
import Link from 'next/link';
import React from 'react';
import { graphql } from '../utils/graphql';
import { PaginationControls} from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import ListTable from 'src/views/creator/list-table';
import FromTo from 'src/views/creator/from-to';
import { useRouter } from 'next/router';
import AlphabetLinks from 'src/views/components/alphabet-links';

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query CreatorUnprefixList($chr: String = "a", $after: String = "LTE=") {
      creators: creatorsUnprefix (
        filter: {
          nameUnprefix: { sort: "ASC", startswith: $chr }
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

  const otherQuery = `
    query CreatorUnprefixListOther($after: String = "LTE=") {
      creators: creatorsUnprefix (
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
    query CreatorUnprefixList($filter: String = "a", $after: String = "LTE=") {
      creators: creatorsUnprefix (
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
  const chr = context.query.chr || 'a';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter || '';

  switch (chr) {
    case 'other':
      query = otherQuery;
      operationName = 'CreatorUnprefixListOther';
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
                <AlphabetLinks pathname='creators'></AlphabetLinks>

                <Link
                  href={{
                    pathname: 'creators',
                    query: {chr: 'other'}
                  }}
                  key="other"
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