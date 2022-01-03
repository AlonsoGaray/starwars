import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  border: 3px solid black;
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
  border: 3px solid green;
  width: 300px;
  height:auto;
  margin: 10px 20px;
`

const Nombre = styled.h2`
  text-align: center;
  margin: 5px 0;
`

const Info = styled.p`
  font-size: 16px;
  margin: 10px 10px;
`
const Buttons = styled.div`
  border: 3px solid yellow;
  display:flex;
  justify-content: center;
`

const Personajes = () => {
  const [chars, setChars] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const handlePrevious = () => {
    setPage(page-1)
  }

  const handleNext = () => {
    setPage(page+1)
  }

  useEffect(() =>  {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((res) => res.json())
      .then((data) => setChars(data.results))
      .catch((error)=> console.log(error))
      .finally(() => setLoading(false));
  }, [page])

  if (loading) {
    return <>
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
  </>;
  }

  return (
    <Container>
      <AllCards>
      {chars.map((personaje, i) => {
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
      </AllCards>
      <Buttons>
      <button
        className="Pokemons__button"
        type="button"
        onClick={handlePrevious}
      >
        Anterior Pagina
      </button>
      <button
        className="Pokemons__button"
        type="button"
        onClick={handleNext}
      >
        Siguiente Pagina
      </button>
      </Buttons>
    </Container>
  );
}

export default Personajes;
