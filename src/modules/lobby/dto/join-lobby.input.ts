import { Field, ID, InputType } from '@nestjs/graphql';
import { TeamSide } from '../../../common/constants/team-side.enum';

@InputType()
export class JoinLobbyInput {
  @Field(() => ID)
  lobbyId: string;

  @Field(() => TeamSide)
  teamSide: TeamSide;
}
