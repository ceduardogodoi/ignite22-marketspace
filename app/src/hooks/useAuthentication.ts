import { useContext } from 'react';

import { AuthenticationContext } from '../contexts/Authentication';

export function useAuthentication() {
  return useContext(AuthenticationContext);
}