import axios from 'axios'
import React, {useState, useEffect,} from 'react'

const Available = (props)=>{

	const [agentProperties, setAgentProperties] = useState([])
	useEffect(()=>{
		getAgentProperties()
	},[])

	const getAgentProperties = async ()=> {
    try {
			let res = await axios.get('/api/properties')
			console.log(res)
			setAgentProperties(res.data)
		} catch (error) {
			alert('errror occured get agentProperties')
		}
	}
  return (
		<div>
			<h1>Available Page</h1>
		</div>
	)   
}

export default Available
