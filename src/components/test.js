'use client'
import React, { useState } from 'react';
import {
    FpjsProvider
  } from '@fingerprintjs/fingerprintjs-pro-react';

const App = () => {
  const [fingerprint, setFingerprint] = useState('');

  const generateFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setFingerprint(result.visitorId);
  };

  return (
    <div>
      <FpjsProvider
      loadOptions={{
        apiKey: "fThfgt3OpltbRA9R8ibc",
        region: "ap"
      }}
    > Hello {fingerprint && fingerprint}</FpjsProvider>
    </div>
  );
};

export default App;