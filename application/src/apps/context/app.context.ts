import { createContext } from 'react';

export const AppContext = createContext<{ dragable: boolean }>({ dragable: true });
