import { useHistory } from 'react-router-dom';
import { DeleteIcon } from '../assets/DeleteIcon';
import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { modalCloseDelay } from '../constants/globalConstants';

export const SettingsHeader: React.FC = () => {
  const history = useHistory();
  return (
    <Container pos="space-between">
      <Title fz="52px" fw="700" ff="Alegreya Sans">
        Settings
      </Title>
      <Container
        onClick={() => setTimeout(history.goBack, modalCloseDelay)}
        width="25px"
        style={{ userSelect: 'none', cursor: 'pointer' }}
      >
        <DeleteIcon />
      </Container>
    </Container>
  );
};
