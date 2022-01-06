import { Col, Row, Select } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard';
const { Option } = Select;

const dummyCityProperties = [
  { sq_ft: 1234, beds: 3, baths: 2, price: 312345 },
  { sq_ft: 234, beds: 3, baths: 2, price: 13345 },
  { sq_ft: 3343, beds: 2, baths: 2, price: 23345 },
]

const Cities = () => {
  const [cities, setCities] = useState(null)
  const [city, setCity] = useState(null)
  const [cityProperties, setCityProperties] = useState(null)
  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    try {
      let res = await axios.get('/api/cities')
      setCities(res.data)
    } catch (err) {
      // API not setup so use dummy data
      setCities(["SLC", "Draper", "Provo"])
    }
  }
  const handleChange = async (value) => {
    console.log(`selected ${value}`);
    // api call to get city data
    try {
      let res = await axios.get(`/api/city/${value.toLowerCase()}`)
      setCity(value)
      setCityProperties(res.data)
    } catch (err) {
      setCityProperties(dummyCityProperties)
      console.log(err)
    }
  }
  const renderSelect = () => {
    if (!cities) {
      return (
        <Select style={{ width: 120 }} loading>
        </Select>
      )
    } else {
      return (
        <Select style={{ width: 120 }} onChange={handleChange}>
          {cities.map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>
      )
    }
  }

  const renderCity = () => {
    console.log('cityProperties: ', cityProperties)
    if (!cityProperties) {
      return <p>Loading cities / or select a city</p>
    }
    return (
      <div>
        <Row>
          {cityProperties.map(cp => {
            return (
              <Col sm={24} md={12} lg={8}>
                <PropertyCard {...cp} />
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  return (
    <div>
      <h1>Cities</h1>
      {renderSelect()}
      {renderCity()}
    </div>
  )
}

export default Cities