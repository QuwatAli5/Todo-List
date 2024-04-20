import Swal from 'sweetalert2';

const CommonFunctions = () => {

  function fireToaster(title = "Success!", type = "success") {
    // ['success', 'error', 'warning', 'info', 'question']
    Swal.fire({
      icon: type,
      html: title,
      customClass: {
        container: "z-index-9-9s",
        confirmButton: `my-btn px-3 py-0 rounded-pill`,
        cancelButton: `my-btn px-3 py-0 transparent-bg`,
      },
      toast: true,
      position: "bottom-end",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  return {
    fireToaster,
  };
};

export default CommonFunctions;