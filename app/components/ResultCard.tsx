"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "react-lottie";
import Skeleton from "react-loading-skeleton";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { BiSolidBookBookmark } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineBranches } from "react-icons/ai";

import { GithubUsersProps } from "@/context";
import { AtaskContext } from "@/context";

import * as animationData from "../../public/avatars.json";
import { type dataSampleProps } from "../context/dataSample";

interface Card {
  name: string;
  username: string;
  avatar: string;
  followers: number;
}

const ResultCard = ({
  userRawData,
}: {
  userRawData: GithubUsersProps | dataSampleProps;
}) => {
  const { setServerError } = useContext(AtaskContext);
  const [presentedData, setPresentedData] = useState<Card>({
    name: "",
    username: "",
    avatar: "",
    followers: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const getActualData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      setIsError(true);
      setServerError(true);
      /* throw new Error("Failed to fetch data"); */
    } else {
      const data = await response.json();
      console.log(data);
      setPresentedData({
        name: data.name,
        username: data.login,
        avatar: data.avatar_url,
        followers: data.followers,
      });
    }
  };

  const getSampleData = (data: dataSampleProps) => {
    setPresentedData({
      name: data.name,
      username: data.login,
      avatar: data.avatar_url,
      followers: data.followers,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (userRawData) {
      if (process.env.NEXT_PUBLIC_ENV_IS_PRODUCTION) {
        getActualData(userRawData.url);
      } else {
        getSampleData(userRawData as dataSampleProps);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userRawData]);

  const renderLoadingComponent = () => {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={45}
            width={45}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Skeleton count={1} width={"20%"} />
          <Skeleton count={1} width={"17%"} />
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <Skeleton count={1} width={"10%"} />
        </div>
      </div>
    );
  };

  const renderRepositories = () => {
    return [1, 2, 3, 4].map((repo, index) => {
      return (
        <div
          key={index}
          className="bg-white w-full h-auto rounded-md border border-slate-300 p-4"
        >
          <p className="text-[#2d3436] text-sm font-bold flex flex-row items-center gap-2">
            <BiSolidBookBookmark /> Repository Title{" "}
            <span className="border border-slate-200 rounded-full font-medium text-xs px-2">
              Public
            </span>
          </p>
          <p className="text-[#636e72] text-sm font-sm mb-5">
            Some description here ya guys
          </p>
          <div className="flex flex-row gap-4">
            <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
              <BsCircleFill color="#fdcb6e" /> Javascript
            </p>
            <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
              <AiFillStar color="#353b48" /> 38
            </p>
            <p className="text-[#353b48] text-sm font-medium flex flex-row gap-2 items-center">
              <AiOutlineBranches color="#353b48" /> 11
            </p>
          </div>
        </div>
      );
    });
  };

  return isLoading ? (
    renderLoadingComponent()
  ) : isError ? null : (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-[45px] w-[45px] flex items-center">
            <Image
              className="w-8 h-8 rounded-full mx-auto"
              src={presentedData.avatar ? presentedData.avatar : "/locked.png"}
              alt={`${presentedData.username} image`}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {presentedData.name ?? "No name"}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {presentedData.username}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <a
            onClick={() => setIsOpenDetails(!isOpenDetails)}
            className="cursor-pointer text-blue-600 duration-500 hover:text-blue-400"
          >
            {isOpenDetails ? (
              <IoIosArrowDropupCircle size={18} />
            ) : (
              <IoIosArrowDropdownCircle size={18} />
            )}
          </a>
        </div>
      </div>
      {isOpenDetails && (
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderRepositories()}
        </div>
      )}
    </>
  );
};

export default ResultCard;
