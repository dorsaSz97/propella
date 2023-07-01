import { ReactNode } from 'react';

const TabsItem = ({ children }: { children: ReactNode }) => {
  return <li className="px-4 py-2 rounded-xl bg-whiteDark">{children}</li>;
};

export default TabsItem;
