// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableColumns from 'src/views/table/table'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box } from '@mui/material'
import FormLayoutsSeparator from 'src/views/forms/FormLayoutsSeparatorInsert'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


const Home = () => {
  return (
    <Box sx={{m:20}}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
            <DatePickerWrapper>
             <FormLayoutsSeparator/>
            </DatePickerWrapper>
        </Grid>
      </Grid>`
    </Box>
  )
}

Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
