import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) =>{
  const request = axios.delete( `${baseUrl}/${id}` );
  return request.then( response => response.status );
}

export default { getAll, create, update, remove }
/**
 * Muistiinpanopalvelut määrittelevä moduuli siis eksporttaa olion, 
 * jonka kenttinä getAll, create ja update ovat muistiinpanojen käsittelyyn tarkoitetut funktiot.
 */