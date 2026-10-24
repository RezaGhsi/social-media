import { useState } from "react";
import Modal from "./../../../shared/components/Modal";
import Btn from "../../../shared/components/Btn";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SuccessToast from "../../../shared/components/SuccessToast";

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
      <Btn
        color="red"
        onClick={() => setIsLogoutModalOpen(true)}
        value={"LogOut"}
      />
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
