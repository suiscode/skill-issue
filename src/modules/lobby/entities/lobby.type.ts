import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class LobbyType {
  @Field(() => ID)
  id: string;
  @Field()
  game: string;
  @Field()
  region: string;
  @Field(() => Int)
  stakePerPlayerCents: number;
  @Field(() => [String])
  teamAUserIds: string[];
  @Field(() => [String])
  teamBUserIds: string[];
  @Field()
  status: string;
}
