import { toast } from "sonner";

const ErrorToast = (message) => {
  toast.error(message, {
    style: { background: "red", color: "white" },
  });
};
export default ErrorToast;
