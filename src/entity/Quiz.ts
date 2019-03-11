import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Flashcard } from "./Flashcard";
import { Rating } from "./Rating";

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum Difficulty {
  TRIVIAL = "Trivial",
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  IMPOSSIBLE = "Impossible",
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @Column("integer", { nullable: true })
  public creator: number;

  @Column("varchar", { length: 100 })
  public title: string;

  @Column("varchar", { length: 1000 })
  public description: string;

  @Column("bool", { default: false })
  public isPublic: boolean;

  @Column("integer", { default: 0 })
  public tries: bigint;

  @Column("integer", { default: 0 })
  public successes: bigint;

  @Column("enum", { enum: Difficulty, default: Difficulty.MEDIUM })
  public difficulty: Difficulty;

  @OneToMany(type => Flashcard, flashcard => flashcard.quiz, { cascade: true })
  public flashcards: Flashcard[];

  @OneToMany(type => Rating, rating => rating.quiz, { cascade: true })
  public ratings: Rating[];
}
