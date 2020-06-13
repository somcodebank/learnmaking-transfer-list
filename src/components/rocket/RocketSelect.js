import styled from "styled-components";

const RocketSelect = styled.select`
  overflow: scroll;
  border: 2px solid orange;
  margin-bottom: 5px;
  border-radius: 15px;

  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "195px"};
  background-color: #666;
`;

export default RocketSelect;
