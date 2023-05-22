import Head from 'next/head'
import React from 'react';
import { graphql } from '../../utils/graphql';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PaginationControls } from 'src/utils/pagination';
import ListTable from 'src/views/user/list-table';

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query UserListPerformances($username: String!, $listname: String!) {
      userListPerformances (username: $username, listname: $listname) {
        edges {
          node {
            performance {
              artist {
                id
                name
              }
              id
              year
              date
            }
            source {
              id
              comments
            }
            sourceInfo
            checksums
            createdAt
            media_count
            media_type
            noise_reduction
            scms_status
            show_rating
            sound_rating
            microphones
            generation
            note
            j_card_comment
            tech_note
            reference_number
            traded_from
            traded_from_email
            tradesAllowed
            status
            attendance
            userid
            tapername
            miclocation
            id
          }
          cursor
        }
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }

      userByUsername (username: $username) {
        id
        name
      }

      userListByUsername (username: $username, listname: $listname) {
        id
        name
        shortname
        notes
      }
    }
  `;

  const query = standardQuery;

  const variables = {
    username: context.query.url[0],
    listname: context.query.url[1],
  };

  return {props: {
    graphql: await graphql(query, variables),
    context: context.query,
    page: 1,
  }}
}


function UserListPerformances(props: any) {

  console.log(props.graphql);

  return (
    <>
      <Head>
        <title>{props.graphql.data.userByUsername.name} - {props.graphql.data.userListByUsername.name}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.graphql.data.userByUsername.name} - {props.graphql.data.userListByUsername.name}
              </Typography>
              <hr />

              <PaginationControls
                graphql={props.graphql.data.userListPerformances}
                page={props.page}
                pathname='/artists'
              ></PaginationControls>

              <ListTable graphql={props.graphql}></ListTable>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserListPerformances;