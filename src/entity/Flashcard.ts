import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Quiz } from "./Quiz";

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 1000 })
  public question: string;

  @Column("varchar", { length: 1000 })
  public answer: string;

  @Column("bool", { default: false })
  public exact: boolean;

  @ManyToOne(type => Quiz, quiz => quiz.flashcards)
  public quiz: Quiz;
}
