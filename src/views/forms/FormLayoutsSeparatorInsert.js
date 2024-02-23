// ** React Imports
import { forwardRef, useState } from 'react'

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
import { useRouter } from 'next/router'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutInsert = () => {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    birthDate: null,
    phoneNo: ''
  })

  const handleInputChange = e => {
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

  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault();

    
  
    if (formData.name && formData.salary && formData.birthDate && formData.phoneNo) {
      const fullName = formData.name;
  
      const existingData = rows.find(row => row.full_name === fullName);
  
      if (existingData) {
        console.log(`Data with full name "${fullName}" already exists. You can update it instead of inserting a new one.`);
  
        return;
      }
  
      const newData = {
        id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 1, // Generating a unique id
        full_name: formData.name,
        post: '',
        email: '',
        city: '',
        start_date: formData.birthDate,
        salary: parseFloat(formData.salary),
        age: '',
        experience: '',
        status: 1,
      };
  
      const updatedRows = [...rows, newData];
  
      console.log('Updated Rows:', updatedRows);
  
      setFormData({
        name: '',
        salary: '',
        birthDate: null,
        phoneNo: ''
      });

      router.push('/home')

      
    } else {
      console.log('Form data is incomplete. Please fill in all fields.');
    }
  }
  

  return (
    <Card>
      <CardHeader title='Insert Data' />
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
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='salary'
                name='salary'
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.birthDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='tel'
                label='Phone No.'
                name='phoneNo'
                value={formData.phoneNo}
                onChange={handleInputChange}
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

export default FormLayoutInsert
