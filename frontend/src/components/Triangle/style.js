import styled from "styled-components";

import img from "../../assets/images/bg-triangle.svg";

export const IconGridWrap = styled.div`
  display: grid; 
  margin-top: 5%;
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
      "leftUp . rightUp"
      ". . ."
      ". down ."; 
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: 80%;
  background-position-x: 50%;
  background-position-y: 50%;
  @media (max-width: 450px) {
    margin-top: 30%;
  }
`;
