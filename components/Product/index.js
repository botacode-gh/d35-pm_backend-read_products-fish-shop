import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);

  console.log("data in Product:", data);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 ? (
        <div>
          <h3>Reviews</h3>
          {data.reviews.map((review) => (
            <div key={review._id}>
              <h4>{review.title}</h4>
              <p>{review.text}</p>
              <span>Rated {review.rating}/5</span>
            </div>
          ))}
        </div>
      ) : (
        <h3>No reviews yet!</h3>
      )}
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
    </ProductCard>
  );
}
