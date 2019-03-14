import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam } from "routing-controllers";
import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";
import { Rating } from "../entity/Rating";
import { getRatingStatsForQuiz } from "../service/QueryService";
import { Flashcard } from "../entity/Flashcard";

@JsonController("/quizzes")
class QuizController {
  @Get("/")
  public async getAllQuizzes(
    @QueryParam("page") page: number = 0,
    @QueryParam("sort") sort: string = "updated_desc",
    @QueryParam("perPage") perPage: number = 15,
  ) {
    return getRepository(Quiz).findAndCount({
      skip: page * perPage,
      take: perPage,
      order: { [sort.split("_")[0]]: sort.split("_")[1].toUpperCase() },
    });
  }

  @Get("/:quizId")
  public async getOneQuiz(@Param("quizId") quizId: number) {
    return getRepository(Quiz).findOne(quizId);
  }

  @Post("/")
  public async createQuiz(@Body() quiz: Quiz) {
    return getRepository(Quiz).save(quiz);
  }

  @Put("/:quizId")
  public async updateQuiz(@Param("quizId") quizId: number, @Body() newQuiz: Quiz) {
    return getRepository(Quiz).save({ id: quizId, ...newQuiz });
  }

  @Delete("/:quizId")
  public async removeQuiz(@Param("quizId") quizId: number) {
    return getRepository(Quiz).delete(quizId);
  }

  @Get("/:quizId/flashcards")
  public async getFlashcardsForQuiz(@Param("quizId") quizId: number) {
    return getRepository(Flashcard).find({ quiz: { id: quizId } });
  }

  @Post("/:quizId/tries")
  public async updateQuizTries(@Param("quizId") quizId: number) {
    return getRepository(Quiz).increment({ id: quizId }, "tries", 1);
  }

  @Post("/:quizId/successes")
  public async updateQuizSuccesses(@Param("quizId") quizId: number) {
    return getRepository(Quiz).increment({ id: quizId }, "successes", 1);
  }

  @Get("/:quizId/ratings")
  public async getRatingsForQuiz(@Param("quizId") quizId: number) {
    return getRepository(Rating).find({ quiz: { id: quizId } });
  }

  @Get("/:quizId/ratings/stats")
  public async getRatingStatsForQuiz(@Param("quizId") quizId: number, @QueryParam("aggregate") aggregate: string) {
    return getRatingStatsForQuiz(quizId, aggregate);
  }

  @Get("/:quizId/ratings/:ratingId")
  public async getOneRatingForQuiz(@Param("quizId") quizId: number) {
    return getRepository(Rating).findOne(quizId);
  }

  @Post("/:quizId/ratings")
  public async createRatingForQuiz(@Param("quizId") quizId: number, @Body() rating: Rating) {
    return getRepository(Rating).save({ quiz: { id: quizId }, ...rating });
  }
}
export default QuizController;
