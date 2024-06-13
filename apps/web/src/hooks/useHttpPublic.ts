import { API } from "@repo/common/config";
import axios from "axios";

const httpPublic = axios.create({
	baseURL: API,
});

const useHttpPublic = () => {
	return httpPublic;
};

export default useHttpPublic;

