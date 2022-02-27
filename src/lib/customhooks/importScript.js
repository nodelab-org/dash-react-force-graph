// https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import { useEffect } from 'react';

const importScript = resourceUrl => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};
export default importScript;