import { useState, useEffect } from 'react';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';

const connection = new PriceServiceConnection('https://hermes-beta.pyth.network');

function usePythPrice(priceId: string): number | null {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const updatePrice = (priceFeed: any) => {
      const price = priceFeed.getPriceNoOlderThan(60);
      if (price) {
        setPrice(price.price);
      }
    };

    connection.subscribePriceFeedUpdates(priceId, updatePrice);

    return () => {
      connection.unsubscribePriceFeedUpdates(priceId, updatePrice);
    };
  }, [priceId]);

  return price;
}

export { usePythPrice };
