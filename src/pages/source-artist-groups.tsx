import Head from "next/head";
import Link from "next/link";
import React from "react";
import { graphql } from "../utils/graphql";
import { alphabet, PaginationControls } from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { useRouter } from "next/router";
import FromTo from "src/views/artist/from-to";
import ListTable from "src/views/artist/list-table";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query SourceArtistGroups($chr: String = "a", $after: String = "LTE=") {
      artists: artistGroups (filter: { title_sort: "ASC", title_startswith: $chr, _after: $after }) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name: title
          }
        }
      }
    }
  `;

  const otherQuery = `
    query SourceArtistGroupsOther($after: String = "LTE=") {
      artists: artistGroups (filter: { title_sort: "ASC", _after: $after }) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name: title
          }
        }
      }
    }
  `;

  const filterQuery = `
    query SourceArtistGroups($filter: String = "a", $after: String = "LTE=") {
      artists: artistGroups (filter: { title_sort: "ASC", title_contains: $filter, _after: $after }) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name: title
          }
        }
      }
    }
  `;

  let query = standardQuery;
  let operationName = 'SourceArtistGroups';
  const chr = context.query.chr || 'a';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter || '';

  switch (chr) {
    case 'other':
      query = otherQuery;
      operationName = 'SourceArtistGroupsOther';
      break;
    default:
      break;
  }

  if (filter) {
    query = filterQuery;
    operationName = 'SourceArtistGroups';
  }

  const variables = {
    chr: context.query.chr ? context.query.chr : 'a',
    filter,
    after: Buffer.from(String((page - 1) * 300 - 1)).toString('base64')
  };

  return {
    props: {
      graphql: await graphql(query, variables, operationName),
      page: page,
      chr: chr,
      filter: filter,
      query: context.query
    }
  }
}

function SourceArtistGroups(props: any) {

  const router = useRouter();

  const applyFilter = async (event: any) => {
    if (event.keyCode !== 13) {
      return;
    }

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const query = new URLSearchParams();
    query.set('filter', event.target.value);
    router.push('/source-artist-groups?' + query.toString());
  }

  return (
    <>
      <Head>
        <title>LCDB: Source Artist Groups</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Source Artist Groups
              </Typography>

              <div>
                {alphabet(true).map((chr, key) => (
                  <Link
                    href={{
                      pathname: 'source-artist-groups',
                      query: {chr}
                    }}
                    key={key}
                  ><a className="alphabet">{chr}</a></Link>
                ))}

                <Link
                  href={{
                    pathname: 'source-artist-groups',
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
                pathname='/source-artist-groups'
                baseQuery={{chr: props.chr}}>
              </PaginationControls>

              <FromTo graphql={props.graphql} pathname="/artist-group-sources/"/>

              <hr />

              <ListTable graphql={props.graphql} pathname="/artist-group-sources/"/>
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SourceArtistGroups;