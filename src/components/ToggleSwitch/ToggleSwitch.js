import React, {useState, useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import styled from "styled-components";

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
`;

const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  ::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 28px;
    left: 0;
    bottom: 0;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  ::after {
    display: inline;
    position: absolute;
    right: 9.3%;
    bottom: 17.5%;
  }
  input:checked + & {
    background-color: #2196f3;
    ::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    ::after {
      display: inline;
      position: absolute;
      right: 56.3%;
      bottom: 14.5%;
    }
  }
  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  @media all and (max-width: 786px) and (min-width: 425px) {
    ::after {
      right: 15.3%;
      bottom: 22.5%;
    }
    input:checked + &:after {
      right: 60.3%;
      bottom: 20.5%;
    }
  }
  @media all and (max-width: 2560px) and (min-width: 1552px) {
    ::after {
      bottom: 12.5% !important;
    }
  }
  @media all and (max-width: 1552px) and (min-width: 1440px) {
    ::after {
      bottom: 7.5% !important;
    }
  }
`;

const StyledInput = styled.input`
  transform: scale(0.5);
`;

const ToggleSwitch = () => {
  const {isDark} = useContext(StyleContext);
  const [isChecked, setChecked] = useState(isDark);
  const styleContext = useContext(StyleContext);

  return (
    <StyledLabel>
      <StyledInput
        type="checkbox"
        checked={isDark}
        onChange={() => {
          styleContext.changeTheme();
          setChecked(!isChecked);
        }}
      />
      <StyledSlider></StyledSlider>
    </StyledLabel>
  );
};
export default ToggleSwitch;
