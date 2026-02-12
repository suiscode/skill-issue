import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { TeamSide } from '../../../common/constants/team-side.enum';
import { MatchStatus } from './match-status.enum';
@ObjectType()
export class MatchType {
  @Field(() => ID)
  id: string;
  @Field(() => ID)
  lobbyId: string;
  @Field(() => Int)
  betPerPlayerCents: number;
  @Field(() => MatchStatus)
  status: MatchStatus;
  @Field(() => TeamSide, { nullable: true })
  winnerTeamSide?: TeamSide;
  @Field({ nullable: true })
  resultEvidence?: string;
}
