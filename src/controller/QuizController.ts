import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam } from "routing-controllers";
import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";
import { getQuizAndFlashcardsByQuizId, getQuizByQuizId, getQuizzesByPage } from "../service/QuizService";
import { getRatingForQuiz } from "../service/RatingService";

@JsonController("/quizzes")
class QuizController {
  @Get("/")
  public async getAll(
    @QueryParam("page") page: number = 0,
    @QueryParam("quizzesPerPage") quizzesPerPage: number = 15,
    @QueryParam("order") order: string = "updated",
    @QueryParam("direction") direction: string = "DESC",
  ) {
    const [quizzes, count] = await getQuizzesByPage(page, quizzesPerPage, order, direction);
    return { quizzes, count };
  }

  @Get("/:id")
  public async getOne(@Param("id") id: number, @QueryParam("flashcards") withFlashcards: boolean = false) {
    const quiz = withFlashcards ? await getQuizAndFlashcardsByQuizId(id) : await getQuizByQuizId(id);
    const rating = await getRatingForQuiz(id);
    Object.assign(quiz, rating);
    return quiz;
  }

  @Post()
  public async post(@Body() quiz: Quiz) {
    return getRepository(Quiz).save(quiz);
  }

  @Put("/:id")
  public async put(@Param("id") id: number, @Body() quiz: Quiz) {
    const target = await getQuizAndFlashcardsByQuizId(id);
    Object.assign(target, quiz);
    return getRepository(Quiz).save(target);
  }

  @Delete("/:id")
  public async remove(@Param("id") id: number) {
    return getRepository(Quiz).delete(id);
  }
}
export default QuizController;
