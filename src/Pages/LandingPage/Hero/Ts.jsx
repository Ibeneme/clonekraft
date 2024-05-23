import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterComponent = ({ options }) => {
  useEffect(() => {
    if (options && options.strings && options.strings.length > 0) {
      const typewriter = new Typewriter(null, options);
      typewriter.start();

      return () => {
        typewriter.stop();
      };
    }
  }, [options]);

  return null;
};

export default TypewriterComponent;
