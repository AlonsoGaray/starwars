import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  border: 3px solid black;
`

const Card = styled.div`
  display:flex;
  flex-direction: column;
  width: 300px;
  justify-content: center;
  border: 3px solid green;
  height:auto;
  margin: 10px 20px;
`

const Nombre = styled.h2`
  margin: 5px 0;
  text-align: center;
`

const Info = styled.p`
  font-size: 16px;
  margin: 10px 10px;
`

const Personajes = () => {
  const [personajes, setPersonajes] = useState([])
  const [personajesa, setPersonajesa] = useState([])
  const [pages, setPages] = ([])

  const baseUrl = 'https://swapi.dev/api/people/'
  
  const getIndicatorByCountry = async (page=1) => {  
    const query = `${baseUrl}/?page=${page}`
    const response = await axios.get(query)
    setPersonajesa(response.data.results)

    if (personajesa.next != null) {
      return personajesa.concat(await getIndicatorByCountry(page+1)) 
    } else {
      return personajesa
    } 
  }

  const getPersonajes = async () => {
    await axios.get(`https://swapi.dev/api/people/`).then((res) => {
      const { data } = res
      setPersonajes(data.results)
    })
  }

  useEffect(() =>  {
    getPersonajes();
    getIndicatorByCountry();
  }, [])


  return (
    <Container>      
      {personajesa.map((personaje, i) => {
        return (
          <Card key={i}>
            <Nombre>{personaje.name}</Nombre>
            <Info>
              <strong>Gender</strong> <br/>
              {personaje.gender} 
            </Info>
            <Info>
              <strong>Birth Year</strong> <br/>
              {personaje.birth_year} 
            </Info>
            <Info>
              <strong>Height</strong> <br/>
              {personaje.height}
            </Info>
            <Info>
              <strong>Weight</strong> <br/>
              {personaje.mass}
            </Info>            
          </Card>
        )
      })}
    </Container>
  );
}

export default Personajes;
