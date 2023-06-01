import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { userTableFragment } from "src/graphql/fragment/user-table-fragement";
import { graphql } from "src/utils/graphql";
import { PaginationControls } from "src/utils/pagination";
import ArtistLink from "src/views/artist/artist-link";
import { UserTable } from "src/views/user/list-table";

export async function getServerSideProps(context: any) {
  const query = `
    query ArtistUsers($id: Int!, $after: String = "LTE=") {
      artist(id: $id) {
        id
        name
        users (pagination: {first: 50, after: $after}) {
          ...UserTableFragment
        }
      }
    }
  ` + userTableFragment;

  const id = Number(context.query.id);
  const page = Number(context.query.page) || 1;
  const graphqlResult = await graphql(query, {
    id,
    after: Buffer.from(String((page - 1) * 50 - 1)).toString('base64')
  }, 'ArtistUsers');

  return {
    props: {
      graphql: graphqlResult,
      page
    },
  }
}

function ArtistUsers(props: any) {

  return (
    <>
      <Head>
        <title>
          {props.graphql.data.artist.name}
          {' Users'}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ArtistLink artist={props.graphql.data.artist}></ArtistLink>
              </Typography>

              <hr />
              {
                props.graphql.data.artist.users.edges.length ? (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                      Users with this artist
                    </Typography>

                    <PaginationControls
                      graphql={props.graphql.data.artist.users}
                      page={props.page}
                      pathname={'/artist-users/' + props.graphql.data.artist.id}
                      limit={50}
                    >
                    </PaginationControls>

                    <UserTable users={props.graphql.data.artist.users}></UserTable>
                  </>
                ): (<>
                    <Typography gutterBottom variant="h5" component="div">
                      No users own this artist
                    </Typography>
                </>)
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ArtistUsers;
