// ** MUI Imports
import { forwardRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePicker from 'react-datepicker'
import { rows } from 'src/data/data'

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <CustomTextField
      fullWidth
      onClick={onClick}
      value={value}
      inputRef={ref}
      label='Birth Date'
      placeholder='MM-DD-YYYY'  
      autoComplete='off'
    />
  );
});

const FormLayoutUpdate = (id) => {
  // ** States
  const [formData, setFormData] = useState({
    name: '',
    birthDate: null,
    salary: '',
    age: ''
  })

  console.log(id.id)

  const router = useRouter()

  useEffect(() => {
    console.log(id.id)
    const rowData = rows.find(row => row.id === parseInt(id.id));
    console.log(rowData)

    if (rowData) {
      setFormData({
        name: rowData.full_name || '',
        birthDate: new Date(rowData.start_date),
        salary: rowData.salary || '',
        age: rowData.age || ''
      });
      console.log(rowData)
    }
  }, [id]); 


  const handleSubmit = e => {
    e.preventDefault()

    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          full_name: formData.name,
          start_date: formData.birthDate,
          salary: parseFloat(formData.salary),
          age: parseInt(formData.age)
        }
      }

      return row
    })

    console.log('Updated Rows:', updatedRows)

    router.push('/home')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDateChange = date => {
    setFormData(prevState => ({
      ...prevState,
      birthDate: date
    }))
  }

  return (
    <Card>
      {console.log(formData)}
      <CardHeader title='Update Data' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                id='form-layouts-separator-date'
                customInput={<CustomInput />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Salary'
                name='salary'
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Age'
                name='age'
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutUpdate
