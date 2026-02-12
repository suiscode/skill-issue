import { Field, ID, InputType } from '@nestjs/graphql';
import { TeamSide } from '../../../common/constants/team-side.enum';
@InputType()
export class SubmitMatchResultInput {
  @Field(() => ID)
  matchId: string;
  @Field(() => TeamSide)
  winnerTeamSide: TeamSide;
  @Field()
  resultEvidence: string;
}
