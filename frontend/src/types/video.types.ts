/* ----------------------------- */
/* Video Owner                   */
/* ----------------------------- */

export interface VideoOwner {
	_id: string;
	fullName: string;
	username: string;
	avatar: string;
	isVerified?: boolean;
}

export interface VideoCardData {
	_id: string;
	title: string;
	thumbnail: string;
	duration: number;
	views: number;
	createdAt: string;
	owner: VideoOwner;
}

/* ----------------------------- */
/* Video                         */
/* ----------------------------- */

export interface Video {
	_id: string;

	title: string;
	description: string;

	videoFile: string;
	videoPublicId: string;

	thumbnail: string;
	thumbnailPublicId: string;

	owner: VideoOwner;

	duration: number;

	views: number;

	isPublished: boolean;

	createdAt: string;
	updatedAt: string;
}

/* ----------------------------- */
/* Pagination                    */
/* ----------------------------- */

export interface PaginationMeta {
	totalDocs: number;

	limit: number;

	page: number;

	totalPages: number;

	pagingCounter: number;

	hasPrevPage: boolean;

	hasNextPage: boolean;

	prevPage: number | null;

	nextPage: number | null;
}

/* ----------------------------- */
/* Get All Videos Response        */
/* ----------------------------- */

export interface GetVideosResponse extends PaginationMeta {
	docs: Video[];
}

/* ----------------------------- */
/* Generic API Response           */
/* ----------------------------- */

export interface ApiResponse<T> {
	statusCode: number;

	data: T;

	message: string;

	success: boolean;
}
