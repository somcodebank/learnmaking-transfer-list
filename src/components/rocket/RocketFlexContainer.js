import styled from "styled-components";

const RocketFlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: ${(props) => props.direction || "wrap"};
  justify-content: ${(props) => props.justify || "center"};
  align-content: ${(props) => props.alignContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;

export default RocketFlexContainer;
