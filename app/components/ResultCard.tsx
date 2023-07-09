"use client";
import Image from "next/image";
import { GithubUsersProps } from "@/context";
import { useContext, useEffect, useState } from "react";
import { AtaskContext } from "@/context";
import Lottie from "react-lottie";
import * as animationData from "../../public/avatars.json";
import Skeleton from "react-loading-skeleton";
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

  const getActualData = async (url: string) => {
    setIsLoading(true);
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
    setIsLoading(false);
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
    if (userRawData) {
      if (process.env.NEXT_PUBLIC_ENV_IS_PRODUCTION) {
        getActualData(userRawData.url);
      } else {
        getSampleData(userRawData as dataSampleProps);
      }
    }
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

  return isLoading ? (
    renderLoadingComponent()
  ) : isError ? null : (
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
        {presentedData.followers}
      </div>
    </div>
  );
};

export default ResultCard;
