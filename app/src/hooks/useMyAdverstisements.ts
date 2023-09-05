import { useEffect, useState } from 'react';

import { userProductsService } from '../services/UserProductsService';
import { Advertisement } from '../dtos/Product';

export function useMyAdvertisements() {
  const [activeAmount, setActiveAmount] = useState(0);
  const [, setAdvertisements] = useState<Advertisement[]>([]);

  async function fetchAdvertisements(): Promise<void> {
    const _advertisements = await userProductsService.getAll();

    setAdvertisements(_advertisements);

    const activeAmount = _advertisements
      .filter(advertisement => advertisement.is_active)
      .length;
    setActiveAmount(activeAmount);
  }

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return {
    activeAmount,
  };
}
