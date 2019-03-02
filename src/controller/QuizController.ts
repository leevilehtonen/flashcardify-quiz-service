import { JsonController, Get, Delete, Param } from "routing-controllers";

@JsonController("/quizzes")
class QuizController {
  @Get("/")
  public getAll() {
    return "getAll";
  }

  @Get("/:id")
  public getOne(@Param("id") id: number) {
    return "getOne" + id;
  }
  /* 
  @Post()
  public post(@Body() user: User) {
    return "Hello World";
  }

  @Put("/:id")
  public put(@Param("id") id: number, @Body() user: User) {
    return "Hello World";
  }

  */

  @Delete("/:id")
  public remove(@Param("id") id: number) {
    return "Hello World";
  }
}
export default QuizController;
