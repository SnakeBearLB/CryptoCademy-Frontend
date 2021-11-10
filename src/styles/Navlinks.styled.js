import styled from "styled-components"

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 998;
  height: 80px;
  width: 200px;
  background-color: gray;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  border-radius: 5px;
  left: 0;
  top: 50px;
`

export const Li = styled.li`
  text-decoration: none;
`
export const P = styled.p`
  margin: 0 auto;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
  color: white;
  font-family: cambria;
`