import styled from "styled-components";

const RocketList = styled.div`
  overflow: scroll;
  border: 2px solid orange;
  width: ${(props) => props.width || "250px"};
  height: ${(props) => props.height || "150px"};
  background-color: #666;
`;

export default RocketList;
