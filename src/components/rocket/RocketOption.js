import styled from "styled-components";

const RocketOption = styled.option`
  color: orange;
  background-color: #333;
  padding: 0.45rem;
  transition: all 0.1s ease-in;
  &:hover {
    color: #333;
    background: orange;
  }
  /* &:focus {
    color: #333;
    background: orange;
  } */
`;

export default RocketOption;
