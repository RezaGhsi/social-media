import { IoIosTrendingUp } from "react-icons/io";

const Hashtag = ({ name }) => {
  return (
    <div className="flex items-center ml-3 mb-6">
      <span className="mr-2 text-lg">
        <IoIosTrendingUp />
      </span>
      <a href={`/hashtag/${name}`} className="text-xl font-Poppins-SemiBold">
        #{name}
      </a>
    </div>
  );
};
export default Hashtag;
