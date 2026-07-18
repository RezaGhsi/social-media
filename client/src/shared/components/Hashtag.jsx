import { IoIosTrendingUp } from "react-icons/io";

const Hashtag = ({ name }) => {
  return (
    <div className="mb-6 ml-3 flex items-center">
      <span className="mr-2 text-lg">
        <IoIosTrendingUp />
      </span>
      <a href={`/hashtag/${name}`} className="font-Poppins-SemiBold text-xl">
        #{name}
      </a>
    </div>
  );
};
export default Hashtag;
