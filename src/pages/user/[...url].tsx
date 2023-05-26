import Head from 'next/head'
import React from 'react';
import { graphql } from '../../utils/graphql';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PaginationControls } from 'src/utils/pagination';
import UserListTable from 'src/views/user-list/list-table';
import UserPerformanceTable from 'src/views/user-performance/list-table';
import Link from 'next/link';

export async function getServerSideProps(context: any) {
  const standardQuery = `
    query UserPerformancesByUsername($username: String!, $listname: String = "", $after: String = "LTE=") {
      userPerformances: userPerformancesByUsername (username: $username, listname: $listname,
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
            performance {
              artist {
                id
                name
              }
              id
              year
              date
              venue
              city
              state
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
        username
        rules
        email
        userPerformanceCount
        userLists (filter: { name: { sort: "asc" } } ) {
          edges {
            node {
              id
              name
              shortname
              userPerformanceCount
            }
          }
        }
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

  const page = context.query.page ? Number(context.query.page) : 1;

  const variables = {
    username: context.query.url[0],
    listname: context.query.url[1] || "",
    after: Buffer.from(String((page - 1) * 300 - 1)).toString('base64'),
  };

  return {props: {
    graphql: await graphql(query, variables),
    context: context.query,
    page
  }}
}


function UserPerformancesByUsername(props: any) {
/*
  console.log(props.graphql);

  return (<div>asdf</div>)
*/

  return (
    <>
      <Head>
        <title>{props.graphql.data.userByUsername.name} {props.graphql.data.userListByUsername ? " - " + props.graphql.data.userListByUsername.name: ""}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Link href={"/user/" + props.graphql.data.userByUsername.username}>
                  {props.graphql.data.userByUsername.name}
                </Link> {props.graphql.data.userListByUsername ? " - " + props.graphql.data.userListByUsername.name: ""}
                <div style={{ float: "right" }}>
                  <Link href={"mailto:" + props.graphql.data.userByUsername.email}>
                    {props.graphql.data.userByUsername.email}
                  </Link>
                </div>
              </Typography>


              <div dangerouslySetInnerHTML={{ __html: props.graphql.data.userByUsername.rules }} />

              <div dangerouslySetInnerHTML={{ __html: props.graphql.data.userListByUsername
               ? props.graphql.data.userListByUsername.notes: "" }} />

              <hr />

              <UserListTable
                user={props.graphql.data.userByUsername}
                userLists={props.graphql.data.userByUsername.userLists}
              ></UserListTable>

              <hr />

              <PaginationControls
                graphql={props.graphql.data.userPerformances}
                page={props.page}
                pathname={"/user/" + props.graphql.data.userByUsername.username + (props.graphql.data.userListByUsername ? "/" + props.graphql.data.userListByUsername.shortname: "")}
              ></PaginationControls>

              <UserPerformanceTable graphql={props.graphql}></UserPerformanceTable>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserPerformancesByUsername;
