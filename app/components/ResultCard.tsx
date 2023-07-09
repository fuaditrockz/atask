"use client";
import Image from "next/image";
import { GithubUsersProps } from "@/context";
import { useEffect, useState } from "react";

interface Card {
  name: string;
  username: string;
  avatar: string;
  followers: number;
}

const ResultCard = ({ userRawData }: { userRawData: GithubUsersProps }) => {
  const [presentedData, setPresentedData] = useState<Card>({
    name: "",
    username: "",
    avatar: "",
    followers: 0,
  });

  const getActualData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
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

  useEffect(() => {
    if (userRawData) {
      getActualData(userRawData.url);
    }
  }, [userRawData]);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Image
          className="w-8 h-8 rounded-full"
          src={presentedData.avatar ?? "/locked.png"}
          alt="Neil image"
          width={100}
          height={100}
        />
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
