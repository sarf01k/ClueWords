/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PlayedChallenges } from "@/types/models";

type CacheContextType = {
  cache: PlayedChallenges | null;
  refreshCache: () => void;
  loading: boolean;
};

const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<PlayedChallenges>(() => {
    const stored = localStorage.getItem("cache");

    if (stored) return JSON.parse(stored);

    const newCache = { playedChallenges: {} };
    localStorage.setItem("cache", JSON.stringify(newCache));
    return newCache;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stored = localStorage.getItem("cache");

    if (!stored) {
      const newCache: PlayedChallenges = { playedChallenges: {} };
      localStorage.setItem("cache", JSON.stringify(newCache));
      stored = JSON.stringify(newCache);
    }

    setCache(JSON.parse(stored));
    setLoading(false);
  }, []);

  const refreshCache = () => {
    setCache(
      JSON.parse(localStorage.getItem("cache") || '{"playedChallenges":{}}')
    );
  };

  return (
    <CacheContext.Provider
      value={{
        cache,
        refreshCache,
        loading,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  return useContext(CacheContext)!;
}
