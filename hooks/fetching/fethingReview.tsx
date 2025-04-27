// import { ErrorSchema } from "@/types/errorSchema";
// import { ReviewProps } from "@/types/review";
// import { ShopDetailReviewProps } from "@/types/shopDetail";
// import axios from "axios";

// interface fethcingDataReviewProps{
//     url:string;
//     searchParam:string;
// }

// interface ProductReviewResponse {
//   error_schema: ErrorSchema;
//   output_schema: {
//     content: ReviewProps[];
//   };
// }


// const fetchReview = async ({url, searchParam}: fethcingDataReviewProps) => {
    
//     try {
//         const reviewDetailRes = await axios.get<ProductReviewResponse | ShopDetailReviewProps>(
//           `${url}/${id}?${searchParam}`
//         );

//         setProductReview(reviewDetailRes.data.output_schema.content);
//         console.log("review Detail:", reviewDetailRes.data.output_schema);
//       } catch (error) {
//         console.error("Tidak ada review untuk produk: " + error);
//         setProductReviewError("Tidak Ada Ulasan Untuk Produk Ini");
//       } finally {
//         setLoading(false);
//       }

// };

// export default fetchReview;