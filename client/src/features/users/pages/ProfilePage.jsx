import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import UserSuggestCard from "../components/UserSuggestCard";
import Hashtag from "../../../shared/components/Hashtag";
import PostsFilterNav from "../components/PostsFilterNav";
import VerificationError from "../../../shared/components/VerificationError";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
import PostCard from "../components/PostCard";

const ProfilePage = () => {
  return (
    <div className="w-[dvw] h-auto flex  justify-center bg-gray-500/15 pt-8 px-10 ">
      <main className="flex flex-col w-[69dvw] rounded-lg mr-4 *:bg-white items-center *:mb-4 ">
        <section className="w-full rounded-t-lg">
          <div className="relative h-[30dvh] w-full overflow-hidden rounded-t-lg">
            <img
              src="images/feed-6.jpg"
              alt="Banner Image"
              className="w-full h-full object-cover object-center "
            />
          </div>
          <img
            src="images/profile-3.jpg"
            alt="Profile pic"
            className="absolute z-20 rounded-full ml-8 -mt-19 border-2 border-white "
          />
          <div className="flex justify-between">
            <div className="pt-24 ml-8 w-[36dvw] ">
              <h1 className="font-Poppins-ExtraBold text-2xl">Hosna Kazemi</h1>
              <span className="font-Poppins-Medium">@hosna</span>
              <p className="text-xl mt-6 mb-6 font-Poppins-Medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                iusto officiis nostrum tenetur nihil.
              </p>
              <span className="flex items-center text-neutral-700 mb-6">
                <BsGlobe2 />
                <a
                  href="https://sabzlearn.ir"
                  target="blank"
                  className="text-purple-800 text-lg font-Poppins-Medium ml-2"
                >
                  https://sabzlearn.ir
                </a>
              </span>
              <div className="flex *:mr-3 **:pr-1 mb-6">
                <div>
                  <span className="font-Poppins-Medium text-2xl">49</span>
                  <span className=" text-xl">Followers</span>
                </div>
                <div>
                  <span className="font-Poppins-Medium text-2xl">4</span>
                  <span className=" text-xl">Following</span>
                </div>
              </div>
            </div>
            <div className="flex *:border-2  *:p-3 *:px-5 *:rounded-full *:hover:cursor-pointer mr-4 items-center font-Poppins-SemiBold">
              <button className="border-purple-900 text-purple-800 mr-3 ">
                Manage
              </button>
              <FollowUnfollowBtn isFollowed />
            </div>
          </div>
          <VerificationError className="mx-6" />
        </section>
        <PostsFilterNav />

        <PostCard />
        <PostCard />
        <PostCard />
      </main>
      <aside className="flex flex-col w-[28dvw] *:mb-4 *:bg-white *:p-3 ">
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">People to follow</h3>
          <UserSuggestCard
            imageSrc="images/rad_front.jpg"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
          <UserSuggestCard
            imageSrc="images/cristiano.png"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
          <UserSuggestCard
            imageSrc="images/jadi.jpg"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
        </div>
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">Trending now</h3>
          <Hashtag name={"Developer👨‍💻"} />
          <Hashtag name={"Sabzlearn"} />
          <Hashtag name={"radiogeek"} />
          <Hashtag name={"master_freelance"} />
          <Hashtag name={"reactjs"} />
        </div>
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">What's happening</h3>
          <div className="flex flex-wrap justify-between *:w-28 *:h-28 *:m-1.5 *:object-cover *:rounded-sm">
            <img src="images/feed-1.jpg" alt="" />
            <img src="images/feed-2.jpg" alt="" />
            <img src="images/feed-3.jpg" alt="" />
            <img src="images/feed-4.jpg" alt="" />
            <img src="images/feed-5.jpg" alt="" />
            <img src="images/feed-6.jpg" alt="" />
            <img src="images/feed-7.jpg" alt="" />
            <img src="images/feed-8.jpg" alt="" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;
