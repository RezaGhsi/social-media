import { useState } from "react";
import Modal from "../../../shared/components/Modal";
import Btn from "../../../shared/components/Btn";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SuccessToast from "../../../shared/components/SuccessToast";
import { LogOut } from "lucide-react";

const LogoutBtn = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    SuccessToast("Log Out Successful");
    navigate("/");
  };
  return (
    <>
      <button
        onClick={() => setIsLogoutModalOpen(true)}
        className="flex px-5 bg-red-500/20 lg:py-0 py-4 rounded-xl justify-center items-center gap-2 cursor-pointer hover:bg-red-500/25 transition-colors active:bg-red-500/30 text-red-800/80 font-Poppins-SemiBold"
      >
        <LogOut size={22} />
        Log out</button>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title={"LogOut"}
      >
        <div className="flex w-130 flex-col items-center rounded-b-xl bg-white p-3 px-6 pt-10 pb-6">
          <h2 className="font-Poppins-Medium text-lg">
            Are You Sure You Want to
            <span className="font-Poppins-SemiBold text-red-500"> LogOut </span>
            of Your Account ?
          </h2>
          <div className="mt-10 flex w-full justify-between px-2">
            <Btn
              color="gray"
              onClick={() => setIsLogoutModalOpen(false)}
              value={"Cancel"}
            />

            <Btn onClick={handleLogout} color="red" value={"LogOut"} />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default LogoutBtn;
