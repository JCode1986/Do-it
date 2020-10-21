import React, { useState } from 'react';
import Loading from './Loading';

const LoadFunction = () => {
    const [loading, setLoading] = useState(false);
    return [
        loading ? <Loading /> : null,
        () => setLoading(true),
        () => setLoading(false)
      ]
}

export default LoadFunction;