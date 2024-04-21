import Swal from 'sweetalert2';

const CommonFunctions = () => {

  function truncateDescription(description) {
    const maxCharacters = 100;
    if (description && description.length > maxCharacters) {
      return description.slice(0, maxCharacters) + '...'
    } else {
      return description
    }
  }

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
    truncateDescription,
  };
};

export default CommonFunctions;