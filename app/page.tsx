"use client";
import { SearchInput } from "@/components/SearchInput";
import { useContext, useEffect } from "react";
import { AtaskContext } from "./context";

import { Octokit } from "octokit";
import { oc } from "ts-optchain";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default function Home() {
  const { githubUsers, setGithubUsers } = useContext(AtaskContext);

  const getUserData = async () => {
    try {
      const { data } = await octokit.rest.search.users({
        q: "fuaditrockz",
        per_page: 5,
      });
      console.log(data.items);
      const { items } = data;
      setGithubUsers(items);
    } catch (error) {
      console.log("Error fetch api");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log("TEST", githubUsers);

  return (
    <main className="container mx-auto h-screen pt-5">
      <div className="w-full mb-5">
        <SearchInput />
      </div>
      <div className="bg-gray h-full w-1/2 mx-auto">
        <div className="block max-w-lg p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </main>
  );
}
