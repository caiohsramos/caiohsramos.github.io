import React, {createRef, useContext} from "react";
import {Fade, Slide} from "react-reveal";
import styled from "styled-components";
import StyleContext from "../../contexts/StyleContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1380px) {
    flex-direction: column;
    padding-bottom: 10px;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Border = styled.div`
  height: 30px;
  width: 80%;
  border-top: 2px solid rgba(211, 211, 211, 0.397);
  margin-bottom: 20px;
  -webkit-transition: width 0.6s ease-in-out;
  -moz-transition: width 0.6s ease-in-out;
  -o-transition: width 0.6s ease-in-out;
  transition: width 0.6s ease-in-out;
  ${Container} + & {
    border-color: #a9a7f9;
    width: 100%;
    -webkit-transition: width 0.6s ease-in-out;
    -moz-transition: width 0.6s ease-in-out;
    -o-transition: width 0.6s ease-in-out;
    transition: width 0.6s ease-in-out;
  }

  @media (max-width: 1380px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SchoolText = styled.h5`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 27px;
  @media (max-width: 1380px) {
    font-size: 20px;
    height: 23px;
  }
`;

const StyledImage = styled.img`
  object-fit: cover;
  margin-right: 2rem;
  width: 6rem;
  height: 6rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  @media (max-width: 1380px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 0.5rem;
    margin-right: 0px;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
    margin-right: 0;
  }
`;

const StyledCardRight = styled.div`
  max-width: 70%;
  @media (max-width: 1380px) {
    max-width: 90%;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledSubHeader = styled.h5`
  color: ${props => (props.isDark ? "white !important" : "black")};
  font-weight: 700;
  font-size: 19px;
  margin: 0px;
  padding-top: 0.8rem;
  line-height: normal;
  @media (max-width: 1380px) {
    padding-top: 0.5rem;
    font-size: 16px;
  }
`;

const StyledDuration = styled.h5`
  color: ${props => (props.isDark ? "white !important" : "black")};
  font-size: 19px;
  margin: 0px;
  padding-top: 0.5rem;
  @media (max-width: 1380px) {
    font-size: 16px;
  }
`;

const StyledDescription = styled.h5`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledBulletsContainer = styled.div`
  margin-top: 0.5rem;
  @media (max-width: 768px) {
    max-width: 80%;
    margin: auto;
  }
`;

export default function EducationCard({school}) {
  const imgRef = createRef();

  const GetDescBullets = ({descBullets}) => {
    return descBullets
      ? descBullets.map((item, i) => <li key={i}>{item}</li>)
      : null;
  };
  const {isDark} = useContext(StyleContext);
  return (
    <div>
      <Fade left duration={1000}>
        <Container>
          <div>
            <StyledImage
              crossOrigin={"anonymous"}
              ref={imgRef}
              src={school.logo}
              alt={school.schoolName}
            />
          </div>
          <StyledCardRight>
            <SchoolText>{school.schoolName}</SchoolText>

            <div>
              <StyledSubHeader isDark={isDark}>
                {school.subHeader}
              </StyledSubHeader>
              <StyledDuration isDark={isDark}>{school.duration}</StyledDuration>
              <StyledDescription>{school.desc}</StyledDescription>
              <StyledBulletsContainer>
                <ul>
                  <GetDescBullets descBullets={school.descBullets} />
                </ul>
              </StyledBulletsContainer>
            </div>
          </StyledCardRight>
        </Container>
      </Fade>
      <Slide left duration={2000}>
        <Border></Border>
      </Slide>
    </div>
  );
}
