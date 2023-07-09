"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface GithubUsersProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

interface AtaskContextProps {
  githubUsers: GithubUsersProps[];
  setGithubUsers: (data: GithubUsersProps[]) => void;
}

export const AtaskContext = createContext<AtaskContextProps>({
  githubUsers: [],
  setGithubUsers: (data: GithubUsersProps[]) => {},
});

const AtaskContextProvider = (props: { children: ReactNode }) => {
  const [githubUsers, setGithubUsers] = useState<GithubUsersProps[]>([]);

  return (
    <AtaskContext.Provider
      value={{
        githubUsers,
        setGithubUsers,
      }}
    >
      {props.children}
    </AtaskContext.Provider>
  );
};

export default AtaskContextProvider;
