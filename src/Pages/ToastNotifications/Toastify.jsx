import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";

const useCustomToasts = () => {
  const showSuccessToast = (message, options) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#2F6C45",
        color: "#fff",
        fontFamily: `var(--fontFamily)`,
      },
      className: "custom-success-toast",
      progressClassName: "custom-progress-success",
      ...options,
    });
  };

  const showErrorToast = (message, options) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#8E0F07",
        color: "#fff",
        fontFamily: `var(--fontFamily)`,
      },
      className: "custom-error-toast",
      progressClassName: "custom-progress-error",
      ...options,
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
  };
};

export default useCustomToasts;
