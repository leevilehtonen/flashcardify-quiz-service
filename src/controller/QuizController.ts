import { JsonController, Get, Post, Put, Delete, Body, Param } from "routing-controllers";
import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";
import { Flashcard } from "../entity/Flashacard";

@JsonController("/quizzes")
class QuizController {
  @Get("/")
  public async getAll() {
    return getRepository(Quiz).find();
  }

  @Get("/:id")
  public async getOne(@Param("id") id: number) {
    return getRepository(Quiz).findOne(id, { relations: ["flashcards"] });
  }

  @Post()
  public async post(@Body() quiz: Quiz) {
    return getRepository(Quiz).save(quiz);
  }

  @Put("/:id")
  public async put(@Param("id") id: number, @Body() quiz: Quiz) {
    const target = await getRepository(Quiz).findOne(id);
    Object.assign(target, quiz);
    return getRepository(Quiz).save(target);
  }

  @Delete("/:id")
  public async remove(@Param("id") id: number) {
    return getRepository(Quiz).delete(id);
  }
}
export default QuizController;
