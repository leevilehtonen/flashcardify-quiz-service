import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Quiz } from "./Quiz";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("smallint", { default: 0 })
  public rating: number;

  @Column("integer", { nullable: true })
  public rater: number;

  @ManyToOne(type => Quiz, quiz => quiz.ratings)
  public quiz: Quiz;
}
