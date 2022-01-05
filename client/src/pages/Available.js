import axios from 'axios'
import React, {useState, useEffect,} from 'react'
import { Card, Divider, Table } from "antd";

const columns = [
	{
	  title: "Beds",
	  dataIndex: "beds",
	  key: "beds"
	},
	{
	  title: "Baths",
	  dataIndex: "baths",
	  key: "baths"
	},
	{
	  title: "City",
	  dataIndex: "city",
	  key: "city"
	},
	{
	  title: "Price",
	  dataIndex: "price",
	  key: "price"
	},
	{
	  title: "SQ FT",
	  dataIndex: "sq_ft",
	  key: "sq_ft"
	},
	{
	  title: "Street",
	  dataIndex: "street",
	  key: "street"
	},
	{
	  title: "Zip",
	  dataIndex: "zip",
	  key: "zip"
	}
  ];
  


const Available = (props)=>{

	const [agentProperties, setAgentProperties] = useState([])
	useEffect(()=>{
		getAgentProperties()
	},[])
	const normalizeData = (data)=>{
	  let	ids = data.map( t => t.agent_id)
    let uniqueIds = [... new Set(ids)]

		let normailizedData = uniqueIds.map( id =>{
		let properties =  data.filter( d=> d.agent_id === id)
		let filterProperties = properties.map(p=>{
				return {key: p.id, sq_ft: p.sq_ft,price: p.price, beds:p.beds, baths:p.baths, city: p.city, zip:p.zip, street:p.street}
		})
			return {
					name:  properties[0].first_name + ' ' + properties[0].last_name,
					email:  properties[0].email,
					properties: filterProperties

			}
		})
	return normailizedData
	}

	const getAgentProperties = async ()=> {
    try {
			let res = await axios.get('/api/properties')
			console.log(res.data)
			let normailizedData = normalizeData(res.data)
			setAgentProperties(normailizedData)
		} catch (error) {
			alert('errror occured get agentProperties')
		}
	}
	const renderAgentProperties = () => {
		return agentProperties.map((a) => {
		  return (
			<>
			  <div>
				<Card title={a.name} style={{ width: 300, marginBottom: "20px" }}>
				  {a.email}
				</Card>
				<Table columns={columns} dataSource={a.properties} />
			  </div>
			  <Divider orientation="left"></Divider>
			</>
		  );
		});
	  };
  return (
		<div>
			<h1>Available Page</h1>
			<div>{renderAgentProperties()}</div>
		</div>
	)   
}

export default Available
