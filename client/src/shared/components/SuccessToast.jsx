import { toast } from "sonner";

const SuccessToast = (message) => {
  toast.success(message, {
    style: { background: "green", color: "white" },
  });
};
export default SuccessToast;
