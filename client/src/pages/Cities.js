import { Col, Row, Select } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard';
const { Option } = Select;


const Cities = () => {
  const [cities, setCities] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
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
      setSelectedCity(value)
      let res = await axios.get(`/api/cities/${value}`)
      console.log('res.data:', res.data)
      setCityProperties(res.data.properties)
      setTotalPages(res.data.total_pages)
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
  
  const pageClicked = async (page)=>{
    setCurrentPage(page)
    let res = await axios.get(`/api/cities/${selectedCity}?page=${page}&yo='taco'`)
    setCityProperties(res.data.properties)
    setTotalPages(res.data.total_pages)
  }
  const getStyle = (page) => {
    let defaultStyle = {
      fontSize:'20px',
      marginRight: '5px',
      cursor: 'pointer'
    }
    if(page === currentPage){
      defaultStyle.borderBottom = '1px solid black'
      defaultStyle.color = 'red'
    }
    return defaultStyle
  }
  const renderPagination =()=>{
    const pages = []
    for( let i = 1; i <= totalPages; i++){
      pages.push(<span onClick={()=> pageClicked(i)} style={getStyle(i)}>{i}</span>)
    }
    return pages
  }

  const renderCity = () => {
    if (!cityProperties) {
      return <p>Loading cities / or select a city</p>
    }
    return (
      <div>
        <h4>pagination demo current page {currentPage}</h4>
        {renderPagination()}
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