export interface PageData<T> {
    items: T[];
    hasMore: boolean;
    lastPage: number;
    currentPage: number;
    totalCount?: number;
    perPage?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: {
        perPage: number;
        currentPage: number;
        lastPage: number;
        nextPageUrl: string | null;
        items: T[];
    };
}

export interface DataResponse<T> {
    success: boolean;
    message: string;
    data: T[];
}
