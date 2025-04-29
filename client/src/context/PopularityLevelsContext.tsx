import { createContext, useContext, ReactNode, useState } from "react";

export enum PopularityLevels {
  Any,
  Low,
  Medium,
  High,
}

interface PopularityFilterContextValue {
  popularityFilter: PopularityLevels;
  setPopularityFilter: React.Dispatch<React.SetStateAction<PopularityLevels>>;
}

interface PopularityFilterProviderProps {
  children: ReactNode;
}

export const PopularityFilterContext = createContext<
  PopularityFilterContextValue | undefined
>(undefined);

export const PopularityFilterProvider: React.FC<
  PopularityFilterProviderProps
> = ({ children }) => {
  const [popularityFilter, setPopularityFilter] = useState<PopularityLevels>(
    PopularityLevels.Any
  );

  return (
    <PopularityFilterContext.Provider
      value={{
        popularityFilter,
        setPopularityFilter,
      }}
    >
      {children}
    </PopularityFilterContext.Provider>
  );
};
