import { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from './img/star-wars-logo.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  min-width: 300px;
`

const AllCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Card = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid white;
  width: 300px;
  height:auto;
  margin: 10px 20px;
`

const Nombre = styled.h2`
  text-align: center;
  margin: 5px 0;
  color: 	#FFE81F;
`

const Info = styled.h3`
  font-size: 18px;
  margin: 20px 10px 0 10px;
  color: 	#FFE81F;
`

const P = styled.p`
  font-size: 18px;
  margin: 0 10px;
  color: 	white;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  background-color: 	#FFE81F;
  font-size: 20px;
  width:100px;
  height:80px;
  max-width:100px;
  max-height:100px;
  margin: 10px 20px;
`

const Logo = styled.img`
  max-width: 200px;
  max-height: 200px;
`

const Personajes = () => {
  const [response, setResponse] = useState([])
  const [chars, setChars] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  
  const handlePrevious = () => {
    response.previous === null ? setPage(page) : setPage(page-1)
  }

  const handleNext = () => {
    response.next === null ? setPage(page) : setPage(page+1)
  }

  useEffect(() =>  {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {setChars(data.results); setResponse(data)})
      .catch((error)=> console.log(error))
      .finally(() => setLoading(false));
  }, [page])

  console.log(response)
  if (loading) {
    return <div className="Loading">
    <h1>Loading</h1>
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>;
  }

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Nombre> PERSONAJES </Nombre>
      <AllCards>
      {chars.map((personaje, i) => {
        return (
          <Card key={i}>
            <Nombre> {personaje.name} </Nombre>
            <Info> Gender </Info>
            <P>{personaje.gender} </P>
            <Info> Birth Year </Info>
            <P> {personaje.birth_year} </P>
            <Info> Height cm </Info>
            <P> {personaje.height} </P>
            <Info> Weight kg </Info>   
            <P> {personaje.mass} </P>
          </Card>
        )
      })}
      </AllCards>
      <Buttons>
        <Button
          className="Pokemons__button"
          type="button"
          onClick={handlePrevious}
        >
          Anterior
        </Button>
        <Button
          className="Pokemons__button"
          type="button"
          onClick={handleNext}
        >
          Siguiente
        </Button>
      </Buttons>
    </Container>
  );
}

export default Personajes;
