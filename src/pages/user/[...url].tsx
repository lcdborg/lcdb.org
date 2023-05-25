import Head from 'next/head'
import React from 'react';
import { graphql } from '../../utils/graphql';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PaginationControls } from 'src/utils/pagination';
import ListTable from 'src/views/user-performance/list-table';
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
        userLists (filter: { name: { sort: "asc" } } ) {
          edges {
            node {
              id
              name
              shortname
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
                <Link href={props.graphql.data.userByUsername.username}>
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

              {props.graphql.data.userByUsername.userLists ? "Sublists: ": ""}

              {
                props.graphql.data.userByUsername.userLists.edges.map((edge: any, key: any) => (
                    <ul key={key}>
                      <li>
                        <Link href={"/user/" + props.graphql.data.userByUsername.username + "/" + edge.node.shortname}>
                          {edge.node.name}
                        </Link>
                      </li>
                    </ul>
                  ))
              }

              {props.graphql.data.userByUsername.userLists ? (<hr />) : ""}

              <PaginationControls
                graphql={props.graphql.data.userPerformances}
                page={props.page}
                pathname={"/user/" + props.graphql.data.userByUsername.username + (props.graphql.data.userListByUsername ? "/" + props.graphql.data.userListByUsername.shortname: "")}
              ></PaginationControls>

              <ListTable graphql={props.graphql}></ListTable>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserPerformancesByUsername;
