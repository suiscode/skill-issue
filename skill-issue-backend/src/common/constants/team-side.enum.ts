import { registerEnumType } from '@nestjs/graphql';
export enum TeamSide {
  A = 'A',
  B = 'B',
}
registerEnumType(TeamSide, {
  name: 'TeamSide',
});
