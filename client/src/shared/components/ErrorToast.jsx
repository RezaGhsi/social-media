import { toast } from "sonner";

const ErrorToast = (message) => {
  toast.error(message || "Something Went Wrong", {
    style: { background: "red", color: "white" },
  });
};
export default ErrorToast;
