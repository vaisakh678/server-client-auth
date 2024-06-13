import IResponseType from "@repo/interfaces/responseType";
import useHttpPublic from "./useHttpPublic";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

const useRefreshToken = () => {
	const httpPublic = useHttpPublic();

	const refresh = async () => {
		if (!isRefreshing) {
			isRefreshing = true;
			try {
				const resp = (await httpPublic.get("/auth/refresh", { withCredentials: true })).data as IResponseType;
				const accessToken = resp.data.accessToken;
				onTokenRefreshed(accessToken);
				isRefreshing = false;
				return accessToken;
			} catch (error) {
				isRefreshing = false;
				return Promise.reject(error);
			}
		} else {
			return new Promise((resolve) => {
				addRefreshSubscriber((token: string) => {
					resolve(token);
				});
			});
		}
	};

	return refresh;
};

export default useRefreshToken;

