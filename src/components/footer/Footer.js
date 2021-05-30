import React, {useContext} from "react";
import styled from "styled-components";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const StyledDiv = styled.div`
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

const StyledText = styled.p`
  text-align: center;
  color: ${props =>
    props.isDark ? "color: white !important;" : "#868e96 !important;"};
`;

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="5px">
      <StyledDiv>
        <StyledText isDark={isDark}>
          Theme by{" "}
          <a href="https://github.com/saadpasta/developerFolio">
            developerFolio
          </a>
        </StyledText>
      </StyledDiv>
    </Fade>
  );
}
