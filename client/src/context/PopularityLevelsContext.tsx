import { createContext, ReactNode, useState } from "react";

export enum PopularityLevels {
  Any,
  Low,
  Medium,
  High,
}

interface PopularityLevelsContextValue {
  popularityFilter: PopularityLevels;
  setPopularityFilter: React.Dispatch<React.SetStateAction<PopularityLevels>>;
}

interface PopularityFilterProviderProps {
  children: ReactNode;
}

export const PopularityLevelsContext = createContext<
  PopularityLevelsContextValue | undefined
>(undefined);

export const PopularityFilterProvider: React.FC<
  PopularityFilterProviderProps
> = ({ children }) => {
  const [popularityFilter, setPopularityFilter] = useState<PopularityLevels>(
    PopularityLevels.Any
  );

  return (
    <PopularityLevelsContext
      value={{
        popularityFilter,
        setPopularityFilter,
      }}
    >
      {children}
    </PopularityLevelsContext>
  );
};
