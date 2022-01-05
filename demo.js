const data = [
    {
        "id": 1,
        "price": 1405737,
        "beds": 7,
        "baths": 3,
        "city": "SLC",
        "zip": "70044",
        "street": "62150 Hills Points",
        "agent_id": 1,
        "first_name": "Kurt",
        "last_name": "Champlin",
        "email": "eric_dach@robel.co",
        "address_id": 1
    },
    {
        "id": 2,
        "price": 1219111,
        "beds": 2,
        "baths": 4,
        "city": "Draper",
        "zip": "48140-6672",
        "street": "179 Cristobal Track",
        "agent_id": 1,
        "first_name": "Kurt",
        "last_name": "Champlin",
        "email": "eric_dach@robel.co",
        "address_id": 2
    },
    {
        "id": 3,
        "price": 621438,
        "beds": 8,
        "baths": 3,
        "city": "Sandy",
        "zip": "17250",
        "street": "3241 King Courts",
        "agent_id": 1,
        "first_name": "Kurt",
        "last_name": "Champlin",
        "email": "eric_dach@robel.co",
        "address_id": 3
    },
    {
        "id": 4,
        "price": 1120976,
        "beds": 8,
        "baths": 5,
        "city": "SLC",
        "zip": "93237-6143",
        "street": "1333 Donovan Glens",
        "agent_id": 1,
        "first_name": "Kurt",
        "last_name": "Champlin",
        "email": "eric_dach@robel.co",
        "address_id": 4
    },
    {
        "id": 5,
        "price": 306253,
        "beds": 5,
        "baths": 6,
        "city": "SLC",
        "zip": "17278",
        "street": "244 Marlo Drive",
        "agent_id": 1,
        "first_name": "Kurt",
        "last_name": "Champlin",
        "email": "eric_dach@robel.co",
        "address_id": 5
    },
    {
        "id": 7,
        "price": 854571,
        "beds": 7,
        "baths": 1,
        "city": "Draper",
        "zip": "48629",
        "street": "849 Francina Path",
        "agent_id": 2,
        "first_name": "Mercedes",
        "last_name": "Raynor",
        "email": "korey_rippin@lind.net",
        "address_id": 7
    },

]

ids = data.map( t => t.agent_id)
console.log(ids)
let uniqueIds = [... new Set(ids)]
console.log(uniqueIds)

let x = uniqueIds.map( id =>{
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
console.log(x[0].properties[0])

