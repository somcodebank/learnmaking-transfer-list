import styled from "styled-components";

const RocketXferAction = styled.button`
  color: orange;
  background-color: #333;
  padding: 0.45rem;
  transition: all 0.1s ease-in;
  width: 90%;
  margin-bottom: 5px;
  border-radius: 10px;

  &:hover {
    color: #333;
    background: orange;
  }
  &:disabled {
    color: #ddd;
    background: #999;
  }
`;

export default RocketXferAction;
