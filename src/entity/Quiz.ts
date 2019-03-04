import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Flashcard } from "./Flashacard";

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum Difficulty {
  TRIVIAL = "trivial",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  IMPOSSIBLE = "impossible",
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @Column("varchar", { length: 100 })
  public title: string;

  @Column("varchar", { length: 1000 })
  public description: string;

  @Column("enum", { enum: Visibility, default: Visibility.PRIVATE })
  public visibility: Visibility;

  @Column("bigint", { default: 0 })
  public tries: bigint;

  @Column("bigint", { default: 0 })
  public successes: bigint;

  @Column("decimal", { default: 0 })
  public rating: number;

  @Column("enum", { enum: Difficulty, default: Difficulty.MEDIUM })
  public difficulty: Difficulty;

  @OneToMany(type => Flashcard, flashcard => flashcard.quiz, { cascade: true })
  public flashcards: Flashcard[];
}
