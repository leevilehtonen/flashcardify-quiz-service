import { getRepository } from "typeorm";
import { Rating } from "../entity/Rating";

export const getRatingStatsForQuiz = async (quizId: number, aggregate: string) => {
  return getRepository(Rating)
    .createQueryBuilder("rating")
    .select(`${aggregate.toUpperCase()}(rating.rating)`, "value")
    .where("rating.quiz = :quiz", { quiz: quizId })
    .getRawOne();
};
