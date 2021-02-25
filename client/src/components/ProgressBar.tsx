import styled from 'styled-components';
import { globalPasswordStrong } from '../constants/validationConst';
import { colors } from '../styles/colors';

interface IProgressBar {
  fill: number;
  maxFill?: number;
  passwordLength?: number;
}

export const ProgressBar: React.FC<IProgressBar> = ({
  fill,
  passwordLength = 100,
  maxFill = 100,
}) => {
  const perc = () => {
    let currentColor = colors.$red;
    fill = (fill / maxFill) * 100;
    if (fill > globalPasswordStrong.bad && passwordLength > 5)
      currentColor = colors.$orange;
    if (fill > globalPasswordStrong.normal && passwordLength > 10)
      currentColor = colors.$yellow;
    if (fill > globalPasswordStrong.good && passwordLength > 13)
      currentColor = colors.$green;
    if (fill > globalPasswordStrong.veryGood && passwordLength > 15)
      currentColor = colors.$blue;
    return { currentColor, fill };
  };

  return (
    <Bar>
      <BarFill
        width={String(perc().fill) + '%'}
        color={perc().currentColor}
      ></BarFill>
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  height: 15px;
  margin: 0px auto;
  border-radius: 10px;
  border: 2px solid ${colors.$gray};
  display: flex;
  position: relative;
`;

// const BarSection = styled.div`
//   left: 0;
//   top: 0;
//   height: 15px;
//   position: absolute;
//   width: 50px;
//   border: 2px solid ${colors.$gray};
// `;

const BarFill = styled.div<{ width: string; color: string }>`
  border-radius: 10px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
`;
