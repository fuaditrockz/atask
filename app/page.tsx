"use client";
import "react-loading-skeleton/dist/skeleton.css";
import { SearchInput } from "@/components/SearchInput";
import { useContext, useEffect, useState } from "react";
import { AtaskContext, GithubUsersProps } from "@/context";
import Lottie from "react-lottie";
import * as animationData from "../public/loadingbar.json";
import Image from "next/image";
import { Octokit } from "octokit";
import ResultCards from "./components/ResultCard";
import { dataSample, dataSampleProps } from "./context/dataSample";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
console.log("env", process.env.GITHUB_TOKEN);

export default function Home() {
  const { serverError, githubUsers, setGithubUsers } = useContext(AtaskContext);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { innerWidth: width, innerHeight: height } = window;

  const getUserData = async () => {
    setIsLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_ENV_IS_PRODUCTION === "true") {
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
      } else {
        setGithubUsers(dataSample);
      }
    } catch (error: any) {
      console.log("Error fetch api");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const renderCards = () => {
    return githubUsers.map(
      (user: GithubUsersProps | dataSampleProps, index: number) => {
        return (
          <li key={index} className="py-3 sm:py-4">
            <ResultCards key={index} userRawData={user} />
          </li>
        );
      }
    );
  };

  return (
    <main className="container mx-auto h-screen px-2 pt-2 lg:pt-5">
      <div className="w-full mb-5">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => getUserData()}
        />
      </div>
      {githubUsers.length > 0 ? (
        <div className="bg-gray w-full h-full mx-auto">
          <div className="mx-auto w-full lg:w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            {isLoading ? (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={width > 600 ? 400 : 100}
                width={width > 600 ? 400 : 100}
              />
            ) : serverError ? (
              <>
                <Image
                  src="/server-error.png"
                  width={200}
                  height={200}
                  alt="error"
                  className="w-[300px] h-[300px] mx-auto"
                />
                <h1 className="text-[30px] text-[#808080] font-bold text-center my-8">
                  Server Error
                </h1>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  {githubUsers.length > 0 && (
                    <h5 className="text-xl font-bold leading-none text-gray-900">
                      Total result of &apos;{searchValue}&apos;:{" "}
                      {githubUsers.length}
                    </h5>
                  )}
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {renderCards()}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full mt-20">
          <Image
            src="/landing.png"
            width={200}
            height={200}
            alt="error"
            className="w-[300px] h-[300px] mx-auto"
          />
          <h1 className="text-[30px] text-[#2960bf] font-bold text-center my-8">
            Search People Repositories in Github
          </h1>
        </div>
      )}
    </main>
  );
}
