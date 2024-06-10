export default interface IResponseType<T = any> {
	status: boolean;
	data?: T;
	message?: {
		error?: string;
		warning?: string;
		message?: string;
	};
	pagination?: Paginator | ScrollPaginator;
}

export interface Paginator {
	totalDocs: number;
	currentPage: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface ScrollPaginator {
	totalDocs: number;
	skip: number;
	haveNext: boolean;
}

