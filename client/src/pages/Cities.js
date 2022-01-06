import { Col, Row, Select } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard';
const { Option } = Select;


const Cities = () => {
  const [cities, setCities] = useState(null)
  const [cityProperties, setCityProperties] = useState(null)
  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    try {
      let res = await axios.get('/api/cities')
      setCities(res.data)
    } catch (err) {
      alert('err in getCities')
      // API not setup so use dummy data
    
    }
  }
  const handleChange = async (value) => {
    // api call to get city data
    try {
      let res = await axios.get(`/api/cities/${value}`)
      setCityProperties(res.data)
    } catch (err) {
      alert('err in handleChange')
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
    if (!cityProperties) {
      return <p>Loading cities / or select a city</p>
    }
    return (
      <div>
        <Row>
          {cityProperties.map(cp => {
            return (
              <Col key={cp.id} sm={24} md={12} lg={8}>
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