import { FC, Children, useState, createContext, useCallback, useMemo } from 'react'

const COMPONENT_UTIL = 'Route';

interface Props {
  children: Array<React.ReactElement<any>>;
}

interface NavigatorContext {
  navForward: (page: string) => void;
  navBackward: () => void;
}

export const NavigatorContext = createContext({} as NavigatorContext);

export const Router: FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('main');

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type as any;
    const isRoute = name === COMPONENT_UTIL;  
    console.log({ props, type });
    return isRoute ? props : null;
  });

  console.log(routesFromChildren)

  const Page = routesFromChildren.find(({ name }) => name === currentPage).Component;

  const navForward = useCallback((page: string) => {
    setCurrentPage(page);
  }, [setCurrentPage]);
  
  const navBackward = useCallback(() => {
    setCurrentPage('main');
  }, [setCurrentPage]);


  const value = useMemo(() => ({
    navForward,
    navBackward
  }), [])

  return (
    <NavigatorContext.Provider value={value}>
      { Page && Page }
    </NavigatorContext.Provider>
  )
}
