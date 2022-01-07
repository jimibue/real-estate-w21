import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Select } from 'antd';
import PropertyCard from '../components/PropertyCard';

const { Option } = Select;

const FindHomes = (props) => {

	const [agents, setAgents] = useState(null)
	const [buyers, setBuyers] = useState(null)
	const [buyerProperties, setBuyerProperties] = useState(null)
	useEffect(() => {
		getAgents()
	}, [])

	const getAgents = async () => {
		let res = await axios.get('/api/agents')
		setAgents(res.data)
	}

	async function onChange(value) {
		// axios call to get agents buyers
		try{
		let res = await axios.get(`/api/agents/${value}`)
		setBuyers(res.data)
		} catch(err){
			alert('err')
		}
	}
	
	// .then .catch old way of working with promises
	function onBuyerChange(value) {
		console.log(value)
		axios.get(`/api/buyers/${value}`).then((res)=>{
			// it was succesfull
			setBuyerProperties(res.data)
		}).catch((err)=>{
			alert('err')
		})
  }

	function onSearch(val) {
	}
	const renderAgentSelect = () => {
		if (!agents) return <Select style={{ width: '200px' }} loading />
		return (
			<Select
				style={{ width: '200px' }}
				showSearch
				placeholder="Select a Agent"
				optionFilterProp="children"
				onChange={onChange}
				onSearch={onSearch}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{agents.map(a => <Option key={a.id} value={a.id}>{`${a.first_name} ${a.last_name}`}</Option>)}
			</Select>

		)
	}

	const renderBuyerSelect = () => {
		if (!agents) return <Select style={{ width: '200px' }} />
		if (!buyers) return <Select style={{ width: '200px' }} />
	  return (
			<Select
				style={{ width: '200px' }}
				showSearch
				placeholder="Select a Buyer"
				optionFilterProp="children"
				onChange={onBuyerChange}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{buyers.map(a => <Option key={a.id} value={a.id}>{`${a.first_name} ${a.last_name}`}</Option>)}
			</Select>

		)
	}

	return (
		<div>
			<h1>Find Homes</h1>
			<h4>Agent</h4>
			{renderAgentSelect()}
			<h4>Buyer</h4>
			{renderBuyerSelect()}
			<h4>Buyer Properties</h4>
			{JSON.stringify(buyerProperties)}
		</div>
	)
}

export default FindHomes