import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { SecondButton } from '../components/SecondButton';
import { SettingsHeader } from '../containers/SettingsHeader';
import { SettingsSection } from '../containers/SettingsSection';
import { SwitchButton } from '../components/SwitchButton';
import { Title } from '../components/Title';
import { UserInfo } from '../containers/UserInfo';
import { colors } from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateIsOnCategory } from '../store/users/usersActions';
import { RootState } from '../store/rootReducer';
import { ReturnLastTimer } from '../containers/ReturnLastTimer';

export const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();

  //TODO важно! use selector!
  // const categories = useSelector((state: RootState) => state.users.categories);
  // const [currentCategory, categories] = useSelector((state: RootState) => {return [selectCurrentCategoryById(state, state.users.currentCategoryId), state.users.categories]})
  const { categories } = useSelector((state: RootState) => {
    return {
      categories: state.users.categories,
    };
  });

  return (
    <Container maxWidth="470px">
      <SwitchButton
        switchButtonStyle="settings"
        selectorPosition={false}
        isElementLoading={false}
      />
      <SettingsHeader />
      <UserInfo style={{ marginTop: '18px' }} />
      <SettingsSection
        title="Categories"
        marginTop="46px"
        description="Select categories would you like to see in the main screen"
      >
        {categories.map((category) => (
          <SecondButton
            key={category.id}
            design="switcher"
            width="114px"
            margin="0 16px 0 0"
            isOn={category.isOn}
            onClick={() => dispatch(fetchUpdateIsOnCategory(category.id))}
          >
            {category.name}
          </SecondButton>
        ))}
      </SettingsSection>
      <SettingsSection
        title="Return last timer"
        marginTop="28px"
        description="If you stopped you current timer you can get it back"
      >
        <ReturnLastTimer />
      </SettingsSection>
      <Container
        pos="space-between"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginBottom="28px"
      >
        <SettingsSection
          title="Confirm window"
          style={{ margin: '28px 30px 0px 0px', maxWidth: '50%' }}
        >
          <SwitchButton
            switchButtonStyle={'settings'}
            selectorPosition={true}
          />
        </SettingsSection>
        <SettingsSection title="Dark theme" marginTop="28px">
          <SwitchButton
            switchButtonStyle={'settings'}
            selectorPosition={true}
          />
        </SettingsSection>
      </Container>
      <Title fz="32px" ff="Alegreya Sans" fw="500">
        About us
      </Title>
      <Link to="/">
        <Title ff="Alegreya Sans" fz="24px" color={colors.$gray} fw="300">
          Terms and conditions
        </Title>
      </Link>
    </Container>
  );
};
