import Head from "next/head";
import Link from "next/link";
import React from "react";
import { graphql } from "../utils/graphql";
import { PaginationControls } from '../utils/pagination';
import { Buffer } from 'node:buffer';
import { useRouter } from "next/router";
import FromTo from "src/views/artist/from-to";
import ListTable from "src/views/artist/list-table";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import AlphabetLinks from "src/views/components/alphabet-links";

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query ArtistGroups($chr: String = "a", $after: String = "LTE=") {
      artists: artistGroups (
        filter: {
          title: { sort: "ASC", startswith: $chr }
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
            name: title
          }
        }
      }
    }
  `;

  const otherQuery = `
    query ArtistGroupsOther($after: String = "LTE=") {
      artists: artistGroups (
        filter: {
          title: { sort: "ASC" }
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
            name: title
          }
        }
      }
    }
  `;

  const filterQuery = `
    query ArtistGroups($filter: String = "a", $after: String = "LTE=") {
      artists: artistGroups (
        filter: {
          title: { sort: "ASC", contains: $filter }
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
            name: title
          }
        }
      }
    }
  `;


  let query = standardQuery;
  let operationName = '';
  const chr = context.query.chr ? context.query.chr : 'a';
  const page = context.query.page ? Number(context.query.page) : 1;
  const filter = context.query.filter ? context.query.filter : '';

  switch (chr) {
    case 'other':
      query = otherQuery;
      operationName = 'ArtistGroupsOther';
      break;
    default:
      break;
  }

  if (filter) {
    query = filterQuery;
    operationName = '';
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

function ArtistGroups(props: any) {

  const router = useRouter();

  const applyFilter = async (event: any) => {
    if (event.keyCode !== 13) {
      return;
    }

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const query = new URLSearchParams();
    query.set('filter', event.target.value);
    router.push('/artist-groups?' + query.toString());
  }

  return (
    <>
      <Head>
        <title>LCDB: Artist Groups</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Artist Groups
              </Typography>

              <div>
                <AlphabetLinks pathname='artist-groups'></AlphabetLinks>

                <Link
                  href={{
                    pathname: '/artist-groups',
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
                pathname='/artist-groups'
                baseQuery={{chr: props.chr}}>
              </PaginationControls>

              <FromTo graphql={props.graphql} pathname="/artist-group/"/>

              <hr />

              <ListTable graphql={props.graphql} pathname="/artist-group/"/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ArtistGroups;