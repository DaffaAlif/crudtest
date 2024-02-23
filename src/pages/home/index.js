// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TableColumns from 'src/views/table/table'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{m:20}}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableColumns/>
        </Grid>
      </Grid>`
    </Box>
  )
}

Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
