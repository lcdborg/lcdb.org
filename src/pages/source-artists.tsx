import Head from "next/head";
import Link from "next/link";
import React from "react";
import { graphql } from "../utils/graphql";
import { PaginationControls } from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { useRouter } from "next/router";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import FromTo from "src/views/artist/from-to";
import ListTable from "src/views/artist/list-table";
import AlphabetLinks from "src/views/components/alphabet-links";

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query ArtistsUnprefixSource($chr: String = "a", $after: String = "LTE=") {
      artists: artistsUnprefixSource (filter: { nameUnprefix_sort: "ASC", name_startswith: $chr, _after: $after }) {
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
    query ArtistsUnprefixSourceOther($after: String = "LTE=") {
      artists: artistsUnprefixSource (filter: { nameUnprefix_sort: "ASC", _after: $after }) {
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
    query ArtistsUnprefixSource($filter: String = "a", $after: String = "LTE=") {
      artists: artistsUnprefixSource (filter: { nameUnprefix_sort: "ASC", name_contains: $filter, _after: $after }) {
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
  let operationName = 'ArtistsUnprefixSource';
  const chr = context.query.chr ? context.query.chr : 'top100';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter ? context.query.filter : '';

  switch (chr) {
    case 'other':
      query = otherQuery;
      operationName = 'ArtistsUnprefixSourceOther';
      break;
    default:
      break;
  }

  if (filter) {
    query = filterQuery;
    operationName = 'ArtistsUnprefixSource';
  }

  const variables = {
    chr: context.query.chr ? context.query.chr : 'a',
    filter,
    after: Buffer.from(String((page - 1) * 300 - 1)).toString('base64')
  };

  return {props: {
    graphql: await graphql(query, variables, operationName),
    page: page,
    chr: chr,
    filter: filter
  }}
}

function SourceArtists(props: any) {

  const router = useRouter();

  const applyFilter = async (event: any) => {
    if (event.keyCode !== 13) {
      return;
    }

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const query = new URLSearchParams();
    query.set('filter', event.target.value);
    router.push('/source-artists?' + query.toString());
  }

  return (
    <>
      <Head>
        <title>LCDB: Source Artists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Source Artists
              </Typography>

              <div>
                <AlphabetLinks pathname='source-artists'></AlphabetLinks>

                <Link
                  href={{
                    pathname: 'source-artists',
                    query: {chr: 'other'}
                  }}
                ><a className="alphabet">other</a></Link>
              </div>

              <div>
                <span className="alphabet-link">
                  Filter&nbsp;
                  <input
                    type="text"
                    style={{ width: "15em" }}
                    onKeyDown={applyFilter}
                    defaultValue={props.filter}
                  />
                </span>
              </div>

              <PaginationControls
                graphql={props.graphql.data.artists}
                page={props.page}
                pathname='/source-artists'
                baseQuery={{chr: props.chr}}>
              </PaginationControls>

              <FromTo graphql={props.graphql} pathname="/sources/"/>

              <hr />

              <ListTable graphql={props.graphql} pathname="/sources/"/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SourceArtists;