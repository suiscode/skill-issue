import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLobbyInput {
  @Field()
  game: string;

  @Field()
  region: string;

  @Field(() => Int)
  stakePerPlayerCents: number;
}
