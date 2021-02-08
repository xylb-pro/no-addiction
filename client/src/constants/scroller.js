const [param, setParam] =
  useState <
  IParam >
  {
    down: 0,
    scrollHeight: 0,
    scrollTop: 0,
    clientHeight: 0,
    direction: 0,
  };

useEffect(() => {
  setParam({
    down:
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight,
    scrollHeight: document.documentElement.scrollHeight,
    scrollTop: document.documentElement.scrollTop,
    clientHeight: document.documentElement.clientHeight,
    direction: 0,
  });
  console.log('component did mount');
  document.addEventListener('scroll', setParamOnScroll);
  return () => {
    document.removeEventListener('scroll', setParamOnScroll);
  };
}, []);

useEffect(() => {
  if (param.direction !== 0)
    if (param.scrollTop <= 0) {
      document.location.href = '#';
    } else if (param.down <= 0) {
      document.location.href = '#records';
    }

  if (param.direction > 0) {
    window.scroll(0, param.scrollTop - param.scrollHeight / 50); // scroll up
  } else if (param.direction < 0) {
    window.scroll(0, param.scrollTop + param.scrollHeight / 50); // scroll down
  }
  // else window.scrollBy(0, 0);
});

const setParamOnScroll = () => {
  setParam((prev) => {
    return {
      down:
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight,
      scrollHeight: document.documentElement.scrollHeight,
      scrollTop: document.documentElement.scrollTop,
      clientHeight: document.documentElement.clientHeight,
      direction:
        prev.scrollTop - document.documentElement.scrollTop === 0
          ? prev.direction
          : prev.scrollTop - document.documentElement.scrollTop,
    };
  });
};

//==================================================

const scroll = useCallback(() => {
  console.log('qq');

  // if (document.documentElement.scrollTop <= 0) {
  //   document.location.href = '#';
  // } else if (
  //   document.documentElement.scrollHeight -
  //     document.documentElement.scrollTop -
  //     document.documentElement.clientHeight <=
  //   0
  // ) {
  //   document.location.href = '#records';
  // }

  if (document.location.href === 'http://localhost:3001/#records') {
    //@ts-ignore
    animateScrollTo(document.querySelector('#records'), {
      cancelOnUserAction: false,
    });
  } else {
    //@ts-ignore
    animateScrollTo(document.querySelector(''), {
      cancelOnUserAction: false,
    });
  }
}, []);

useEffect(() => {
  console.log('component did mount');
  document.addEventListener('mousewheel', scroll);
  return () => {
    document.removeEventListener('mousewheel', scroll);
  };
}, []);
