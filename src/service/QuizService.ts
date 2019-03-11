import { getRepository } from "typeorm";
import { Quiz } from "../entity/Quiz";

export const getQuizByQuizId = async (id: number) => getRepository(Quiz).findOne(id);

export const getQuizAndFlashcardsByQuizId = async (id: number) =>
  getRepository(Quiz).findOne(id, {
    relations: ["flashcards"],
  });

export const getQuizzesByPage = async (page: number, quizzesPerPage: number, order: string, direction: string) =>
  getRepository(Quiz).findAndCount({
    skip: page * quizzesPerPage,
    take: quizzesPerPage,
    order: { [order]: direction },
  });
