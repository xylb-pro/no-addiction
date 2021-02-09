import React from 'react';

import { RecordsPage } from './RecordsPage';
import { Container } from '../components/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { InAddiction } from '../containers/InAddiction';
import { OutAddiction } from '../containers/OutAddiction';
// import { animationSpeed } from '../constants/validationConst';

// const param = {
//   animation: false,
//   speed: animationSpeed,
//   action: 0,
// };

export const MainPage: React.FC = () => {
  const inAddiction = useSelector(
    (state: RootState) => state.timers.inAddiction,
  );
  // const scroll = () => {
  //   if (param.action === 1 || document.location.hash === '') {
  //     param.action = 1;
  //     if (param.animation) {
  //       if (document.location.hash === '') {
  //         param.animation = false;
  //         // @ts-ignore
  //         animateScrollTo(document.getElementById('records'), {
  //           cancelOnUserAction: false,
  //           speed: param.speed,
  //         });
  //       } else if (document.location.hash === '#records') {
  //         param.animation = false;
  //         //@ts-ignore
  //         animateScrollTo(0, 0, {
  //           cancelOnUserAction: false,
  //           speed: param.speed,
  //         });
  //       }
  //     }
  //     if (document.documentElement.scrollTop === 0) {
  //       param.animation = true;
  //     }
  //     if (
  //       document.documentElement.scrollTop ===
  //       document.documentElement.scrollHeight -
  //         document.documentElement.clientHeight
  //     ) {
  //       param.animation = true;
  //     }
  //     if (document.documentElement.scrollTop <= 0) {
  //       document.location.href = '#';
  //     } else if (
  //       document.documentElement.scrollHeight -
  //         document.documentElement.scrollTop -
  //         document.documentElement.clientHeight <=
  //       0
  //     ) {
  //       document.location.href = '#records';
  //     }
  //   } else if (param.action === 0) {
  //     param.action = 1;
  //   }
  // };

  // useEffect(() => {
  //   param.animation = true;
  //   document.addEventListener('scroll', scroll);
  //   return () => {
  //     document.removeEventListener('scroll', scroll);
  //   };
  // }, []);

  return (
    <Container margin="100px auto 0" height="calc(200vh - 200px)">
      <div style={{ height: 'calc(100% - 100px)' }}>
        <Container
          maxWidth="1600px"
          margin="0 auto"
          padding="100px 18px 0px"
          height="calc(100vh - 100px)"
        >
          {inAddiction ? <InAddiction /> : <OutAddiction />}
        </Container>

        <div id="records" style={{}}>
          <RecordsPage />
        </div>
      </div>
    </Container>
  );
};
