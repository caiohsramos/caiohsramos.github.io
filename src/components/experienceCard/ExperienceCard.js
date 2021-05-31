import React, {useState, createRef} from "react";
import styled from "styled-components";
import ColorThief from "colorthief";

const StyledContainer = styled.div`
  position: relative;
  background-color: ${props =>
    props.isDark ? "#171c28;" : "rgb(255, 255, 255)"};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px -15px;
  border-radius: 10px;
  border: 1px solid rgba(211, 211, 211, 0.397);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px -10px;
  }
`;

const StyledBanner = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 150%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  border-radius: 10px 10px 0px 0px;
  -webkit-filter: blur(0px);
  -moz-filter: blur(0px);
  -o-filter: blur(0px);
  -ms-filter: blur(0px);
  filter: blur(0px);
  height: 11rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const BlurredDiv = styled.div`
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  height: 11rem;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
`;

const CompanyNameContainer = styled.div`
  position: absolute;
  background: transparent;
  height: 9rem;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCompanyText = styled.h5`
  text-align: center;
  padding: 1.5rem;
  margin: 0;
  color: #fff;
  font-size: 25px;
  text-align: center;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: 1380px) {
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  object-fit: cover;
  left: 0;
  right: 0;
  top: 7rem;
  margin-left: auto;
  margin-right: auto;
  width: 8rem;
  height: 8rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  @media (max-width: 1380px) {
    width: 6.5rem;
    height: 6.5rem;
  }
`;

const StyledDetailsContainer = styled.div`
  padding: 1.5rem;
  margin-top: 2rem;
`;

const StyledRole = styled.h5`
  text-align: center;
  color: ${props => (props.isDark ? "white !important" : "black")};
  font-weight: 700;
  font-size: 25px;
  margin: 0px;
  padding-top: 1.5rem;
  line-height: normal;
  @media (max-width: 1380px) {
    padding-top: 0.5rem;
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const StyledDate = styled.h5`
  text-align: center;
  color: ${props => (props.isDark ? "white !important" : "black")};
  font-size: 20px;
  margin: 0px;
  padding-top: 1rem;
  font-weight: 600;
  @media (max-width: 1380px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const StyledDescription = styled.p`
  text-align: center;
  ${props => props.isDark && "color: white !important;"}
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StyledDescriptionBullet = styled.li`
  ${props => props.isDark && "color: white !important;"}
`;

export default function ExperienceCard({cardInfo, isDark}) {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({descBullets, isDark}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <StyledDescriptionBullet key={i} isDark={isDark}>
            {item}
          </StyledDescriptionBullet>
        ))
      : null;
  };

  return (
    <StyledContainer isDark={isDark}>
      <StyledBanner style={{background: rgb(colorArrays)}}>
        <BlurredDiv></BlurredDiv>
        <CompanyNameContainer>
          <StyledCompanyText>{cardInfo.company}</StyledCompanyText>
        </CompanyNameContainer>

        <StyledImage
          crossOrigin={"anonymous"}
          ref={imgRef}
          src={cardInfo.companylogo}
          alt={cardInfo.company}
          onLoad={getColorArrays}
        />
      </StyledBanner>
      <StyledDetailsContainer>
        <StyledRole isDark={isDark}>{cardInfo.role}</StyledRole>
        <StyledDate isDark={isDark}>{cardInfo.date}</StyledDate>
        <StyledDescription isDark={isDark}>{cardInfo.desc}</StyledDescription>
        <ul>
          <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
        </ul>
      </StyledDetailsContainer>
    </StyledContainer>
  );
}
