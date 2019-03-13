import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, BodyParam } from "routing-controllers";
import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";
import { getQuizAndFlashcardsByQuizId, getQuizByQuizId, getQuizzesByPage } from "../service/QuizService";
import { getRatingForQuiz } from "../service/RatingService";
import { Rating } from "../entity/Rating";

@JsonController("/rating")
class RatingController {
  @Get("/quiz/:id")
  public async getOne(@Param("id") id: number) {
    return getRepository(Rating).findOne(id);
  }

  @Post("/quiz/:id")
  public async post(@Param("id") id: number, @BodyParam("rating") value: number) {
    const rating = new Rating();
    rating.quiz = await getQuizByQuizId(id);
    rating.rating = value;
    return getRepository(Rating).save(rating);
  }
}
export default RatingController;
