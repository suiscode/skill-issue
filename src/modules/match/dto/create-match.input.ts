import { Field, ID, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateMatchInput {
  @Field(() => ID)
  lobbyId: string;
  @Field(() => Int)
  betPerPlayerCents: number;
}
