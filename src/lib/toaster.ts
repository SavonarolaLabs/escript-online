import toast from "svelte-french-toast";

export const showToast = (message: string, type = "success") => {
	if (type == "error") {
		toast.error(message, {
			duration: 4000,
			className: "mt-12",
			position: "top-right",
		});
	} else if (type == "loading") {
		toast.loading(message, {
			duration: 4000,
			className: "mt-12",
			position: "top-right",
		});
	} else {
		toast.success(message, {
			duration: 4000,
			className: "mt-12",
			position: "top-right",
		});
	}
};
