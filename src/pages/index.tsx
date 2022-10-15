// ** MUI Imports
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import Card from '@mui/material/Card'
import { CardContent, Typography } from '@mui/material'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Live Concert Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Welcome to the Live Concert Database
              </Typography>

              This website will replace <a href="https://etreedb.org">etreedb.org</a> in time.
              While this process is taking place this website will use the exact same database
              as <a href="https://etreedb.org">etreedb.org</a> so all changes on each site will
              be reflected in each other.
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
