import { JsonController, Param, Post } from "routing-controllers";
import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";
import { getQuizByQuizId } from "../service/QuizService";

@JsonController("/predict")
class PredictController {
  @Post("/start/:id")
  public async start(@Param("id") id: number) {
    const quiz = await getQuizByQuizId(id);
    const target = Object.assign({}, quiz, { tries: quiz.tries + 1 });
    return getRepository(Quiz).save(target);
  }

  @Post("/finish/:id")
  public async finish(@Param("id") id: number) {
    const quiz = await getQuizByQuizId(id);
    const target = Object.assign({}, quiz, { successes: quiz.successes + 1 });
    return getRepository(Quiz).save(target);
  }
}
export default PredictController;
