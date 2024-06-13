import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useHttpPublic from "./useHttpPublic";
import { useNavigate } from "react-router-dom";

const useHttp = () => {
	const navigate = useNavigate();
	const refresh = useRefreshToken();
	const http = useHttpPublic();

	useEffect(() => {
		const request_interceptor = http.interceptors.request.use(
			async (request) => {
				request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken") ?? ""}`;
				return request;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		const response_interceptor = http.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error.config;
				if (error.response && error.response.status === 401 && !prevRequest.send) {
					prevRequest.send = true;
					const accessToken = await refresh();
					console.log("axss", typeof accessToken, accessToken);
					localStorage.setItem("accessToken", accessToken as string);
					prevRequest.headers["accessToken"] = `Bearer ${accessToken}`;
					return http(prevRequest);
				} else if (error.response && error.response.status === 403) {
					localStorage.removeItem("accessToken");
					sessionStorage.removeItem("accessToken");
					navigate("/login");
				}
				return Promise.reject(error);
			}
		);

		return () => {
			http.interceptors.request.eject(request_interceptor);
			http.interceptors.response.eject(response_interceptor);
		};
	}, [refresh, http, navigate]);

	return http;
};

export default useHttp;

