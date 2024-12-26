import React, { useEffect } from 'react';
import { getPelerins } from '../services/api';

const TestPage = () => {
  useEffect(() => {
    const testApi = async () => {
      try {
        const { data } = await getPelerins(1, 10);
        console.log('Données récupérées :', data);
      } catch (error) {
        console.error('Erreur API :', error);
      }
    };

    testApi();
  }, []);

  return <div>Test Page</div>;
};

export default TestPage;
