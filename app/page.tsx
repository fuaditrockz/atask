"use client";
import { SearchInput } from "@/components/SearchInput";
import { useContext, useEffect, useState } from "react";
import { AtaskContext, GithubUsersProps } from "@/context";

import { Octokit } from "octokit";
import { oc } from "ts-optchain";
import ResultCards from "./components/ResultCard";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default function Home() {
  const { githubUsers, setGithubUsers } = useContext(AtaskContext);

  const [searchValue, setSearchValue] = useState("");

  const getUserData = async () => {
    try {
      if (searchValue !== "") {
        const { data } = await octokit.rest.search.users({
          q: searchValue,
          per_page: 5,
        });
        console.log(data.items);
        const { items } = data;
        setGithubUsers(items);
      } else {
        setGithubUsers([]);
      }
    } catch (error: any) {
      console.log("Error fetch api");
    }
  };

  console.log("TEST", githubUsers);

  const renderCards = () => {
    return githubUsers.map((user: GithubUsersProps, index: number) => {
      return (
        <li key={index} className="py-3 sm:py-4">
          <ResultCards key={index} userRawData={user} />
        </li>
      );
    });
  };

  return (
    <main className="container mx-auto h-screen pt-5">
      <div className="w-full mb-5">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => getUserData()}
        />
      </div>
      <div className="bg-gray w-full h-full mx-auto">
        <div className="mx-auto w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
          <div className="flex items-center justify-between mb-4">
            {githubUsers.length > 0 && (
              <h5 className="text-xl font-bold leading-none text-gray-900">
                Total result: {githubUsers.length}
              </h5>
            )}
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {renderCards()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
