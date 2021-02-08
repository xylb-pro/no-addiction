import React, { HTMLAttributes } from 'react';
import { colors } from '../styles/colors';
import { Container } from '../components/Container';
import { Title } from '../components/Title';

interface ISettingsSection extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  marginTop?: string;
  description?: string;
}

export const SettingsSection: React.FC<ISettingsSection> = ({
  title,
  marginTop,
  description,
  children,
  ...rest
}) => {
  return (
    <Container {...rest} marginTop={marginTop}>
      <Title fz="32px" ff="Alegreya Sans" fw="500">
        {title}
      </Title>
      <Container pos="space-between" margin="12px 0px 8px 0px">
        {children}
      </Container>

      <Title fz="18px" ff="Alegreya Sans" fw="400" color={colors.$gray}>
        {description}
      </Title>
    </Container>
  );
};
