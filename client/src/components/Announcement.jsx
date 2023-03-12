import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    width: 100vw;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
`
const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over $50
    </Container>
  )
}

export default Announcement
