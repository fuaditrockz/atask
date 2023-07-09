"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Emoji from "react-emoji-render";
import Skeleton from "react-loading-skeleton";
import { BiSolidBookBookmark } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineBranches } from "react-icons/ai";
import { AtaskContext } from "@/context";

type ReposCardProps = {
  isOpenDetails: boolean;
  reposUrl: string;
};

type RepoCardProps = {
  title: string;
  description: string;
  isPublic: boolean;
  language: string;
  totalStars: number;
  totalForks: number;
  url: string;
};

const RepoCard = ({
  title,
  description,
  isPublic,
  language,
  totalStars,
  totalForks,
  url,
}: RepoCardProps) => {
  const detectIsHaveEmoji = () => {
    const regex = /(:[^\s:]+(?:::skin-tone-[2-6])?:)/;

    const result = regex.test(description);
    return result;
  };

  return (
    <a
      href={url}
      target="_blank"
      className="bg-white w-full cursor-pointer h-auto rounded-md border border-slate-300 p-4"
    >
      <p className="text-[#2d3436] text-sm font-bold flex flex-row items-center gap-2 mb-2">
        <BiSolidBookBookmark /> {title}{" "}
        <span className="border border-slate-200 rounded-full font-medium text-xs px-2">
          {isPublic ? "Public" : "Private"}
        </span>
      </p>
      <p className="text-[#636e72] text-sm font-sm mb-5">
        {detectIsHaveEmoji() ? <Emoji>{description}</Emoji> : description}
      </p>
      <div className="flex flex-row gap-4">
        <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
          <BsCircleFill color="#fdcb6e" /> {language}
        </p>
        <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
          <AiFillStar color="#353b48" /> {totalStars}
        </p>
        <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
          <AiOutlineBranches color="#353b48" /> {totalForks}
        </p>
      </div>
    </a>
  );
};

const RepoCardLoading = () => {
  return (
    <div className="bg-white w-full h-[100px] rounded-md border border-slate-300 p-4">
      <Skeleton count={1} width={"40%"} />
      <Skeleton count={1} width={"80%"} />
      <Skeleton count={1} width={"30%"} />
    </div>
  );
};

const ReposCard = ({ isOpenDetails, reposUrl }: ReposCardProps) => {
  const { setServerError } = useContext(AtaskContext);
  const [repositories, setRepositories] = useState([]);
  const [firstShowRepositories, setFirstShowRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLess, setShowLess] = useState(true);

  const getRepositories = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      setServerError(true);
    } else {
      const data = await response.json();
      console.log("repositories", data);
      setFirstShowRepositories(data.slice(0, 6));
      setRepositories(data);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (isOpenDetails && reposUrl) {
      getRepositories(reposUrl);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isOpenDetails]);

  const renderReposCard = () => {
    const repos = showLess ? firstShowRepositories : repositories;
    return repos.map((repo: any, index) => {
      return (
        <RepoCard
          key={index}
          title={repo.name}
          description={repo.description}
          isPublic={!repo.private}
          language={repo.language}
          totalStars={repo.stargazers_count}
          totalForks={repo.forks}
          url={repo.svn_url}
        />
      );
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-5">
        <RepoCardLoading />
      </div>
    );
  } else {
    return repositories.length > 0 ? (
      <div className="container">
        <div className="grid grid-cols-2 gap-4 mt-5">{renderReposCard()}</div>
        <div className="w-[100%] mt-5 text-center">
          <button
            onClick={() => setShowLess(!showLess)}
            type="button"
            className="mx-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {showLess ? `Load More ${repositories.length} Repos` : "See Less"}
          </button>
        </div>
      </div>
    ) : (
      <div className="items-center">
        <Image
          src="/need-support.png"
          width={200}
          height={200}
          alt="error"
          className="w-[200px] h-[200px] mx-auto"
        />
        <h1 className="text-[20px] text-[#808080] font-bold text-center my-8">
          No Repositories Available
        </h1>
      </div>
    );
  }
};

export default ReposCard;
