"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { type dataSampleProps } from "./dataSample";

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
  githubUsers: GithubUsersProps[] | dataSampleProps[];
  serverError: boolean;
  setGithubUsers: (data: GithubUsersProps[] | dataSampleProps[]) => void;
  setServerError: (status: boolean) => void;
}

export const AtaskContext = createContext<AtaskContextProps>({
  githubUsers: [],
  serverError: false,
  setGithubUsers: (data: GithubUsersProps[] | dataSampleProps[]) => {},
  setServerError: (status: boolean) => {},
});

const AtaskContextProvider = (props: { children: ReactNode }) => {
  const [githubUsers, setGithubUsers] = useState<
    GithubUsersProps[] | dataSampleProps[]
  >([]);
  const [serverError, setServerError] = useState<boolean>(false);

  return (
    <AtaskContext.Provider
      value={{
        serverError,
        githubUsers,
        setGithubUsers,
        setServerError,
      }}
    >
      {props.children}
    </AtaskContext.Provider>
  );
};

export default AtaskContextProvider;
