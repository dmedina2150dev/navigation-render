import React, { FC, Children, useState, createContext, useCallback, useMemo, lazy, Suspense } from 'react';

const COMPONENT_UTIL = 'Route';

interface Props {
  children: Array<React.ReactElement<any>>;
}

interface NavigatorContext {
  navForward: (page: string) => void;
  navBackward: () => void;
}

export const NavigatorContext = createContext({} as NavigatorContext);

export const Navigation: FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('main');
  const [componentCache, setComponentCache] = useState<Record<string, React.LazyExoticComponent<any>>>({});

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type as any;
    const isRoute = name === COMPONENT_UTIL;
    return isRoute ? props : null;
  });

  // Lazy load components and cache them
  const getComponent = (name: string) => {
    if (!componentCache[name]) {
      const route = routesFromChildren.find((route) => route.name === name);
      if (route) {
        const LazyComponent = lazy(route.Component);
        setComponentCache((prevCache) => ({
          ...prevCache,
          [name]: LazyComponent,
        }));
      }
    }
    return componentCache[name];
  };

  const Page = getComponent(currentPage);

  const navForward = useCallback((page: string) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const navBackward = useCallback(() => {
    setCurrentPage('main');
  }, [setCurrentPage]);

  const value = useMemo(() => ({
    navForward,
    navBackward,
  }), [navForward, navBackward]);

  return (
    <NavigatorContext.Provider value={value}>
      <Suspense fallback={<div>Loading...</div>}>
        {Page && <Page />}
      </Suspense>
    </NavigatorContext.Provider>
  );
};