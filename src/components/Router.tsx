import {
  FC,
  Children,
  useState,
  createContext,
  useCallback,
  useMemo,
  useRef,
  memo,
} from "react";

const COMPONENT_UTIL = "Route";

interface Props {
  children: Array<React.ReactElement<any>>;
}

interface NavigatorContext {
  navForward: (page: string) => void;
  navBackward: () => void;
  currentPage: string;
}

export const NavigatorContext = createContext({} as NavigatorContext);

interface PropPage {
  currentRoutes: any[];
  currentPage: string;
}

const Page = memo(function Page ({ currentRoutes, currentPage }: PropPage) {
  return currentRoutes.find(
    ({ name }) => name === currentPage
  ).Component;
})

export const Router: FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("main");

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type as any;
    const isRoute = name === COMPONENT_UTIL;
    return isRoute ? props : null;
  });

  const currentRoutes = useRef(routesFromChildren);

  console.log(routesFromChildren);

  const navForward = useCallback(
    (page: string) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const navBackward = useCallback(() => {
    setCurrentPage("main");
  }, [setCurrentPage]);

  const value = useMemo(
    () => ({
      navForward,
      navBackward,
      currentPage,
    }),
    [navForward, navBackward, currentPage]
  );

  return (
    <NavigatorContext.Provider value={value}>
      <Page currentPage={currentPage} currentRoutes={currentRoutes.current} />
    </NavigatorContext.Provider>
  );
};
