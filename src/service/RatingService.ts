import { getRepository } from "typeorm";
import { Rating } from "../entity/Rating";

export const getRatingForQuiz = async (quizId: number) => {
  const result = await getRepository(Rating)
    .createQueryBuilder("rating")
    .select("AVG(rating.rating)", "rating")
    .addSelect("COUNT(rating.rating)", "ratings")
    .where("rating.quiz = :quiz", { quiz: quizId })
    .getRawOne();
  return {
    rating: Number(result.rating),
    ratings: Number(result.ratings),
  };
};
