export type TierResult = {
  discount: string;
  rank: string;
  tagline: string;
};

export function computeResult(saved: number): TierResult {
  if (saved >= 85)
    return { discount: "50% off", rank: "top 3%", tagline: "legendary save" };
  if (saved >= 70)
    return {
      discount: "40% off",
      rank: "top 10%",
      tagline: "caught it just in time",
    };
  if (saved >= 50)
    return {
      discount: "30% off",
      rank: "top 22%",
      tagline: "caught it before it melted",
    };
  if (saved >= 30)
    return {
      discount: "20% off",
      rank: "top 45%",
      tagline: "a little drippy",
    };
  if (saved >= 15)
    return { discount: "10% off", rank: "top 70%", tagline: "mostly melted" };
  if (saved >= 5)
    return {
      discount: "5% off",
      rank: "bottom 20%",
      tagline: "a puddle, basically",
    };
  return {
    discount: "no discount",
    rank: "melted",
    tagline: "you let it melt completely",
  };
}
