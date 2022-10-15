// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  // ** Var
//  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`©${new Date().getFullYear()}, `}
        <Link href='mailto:contact@lcdb.org'>
          Live Concert Database, LLC.
        </Link>

        {  } All code is
        <Link target='_blank' href='https://github.com/lcdborg'>
          {' open source at GitHub. '}
        </Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
