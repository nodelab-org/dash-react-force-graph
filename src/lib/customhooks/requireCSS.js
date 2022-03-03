// https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import { useEffect } from 'react';

const requireCSS = resourcePath => {
  useEffect(() => {
    require(resourcePath)
  }, [resourcePath]);
};
export default requireCSS;