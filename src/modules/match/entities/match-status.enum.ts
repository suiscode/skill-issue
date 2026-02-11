import { registerEnumType } from '@nestjs/graphql';
export enum MatchStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  LIVE = 'LIVE',
  RESULT_PENDING = 'RESULT_PENDING',
  SETTLED = 'SETTLED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}
registerEnumType(MatchStatus, {
  name: 'MatchStatus',
});
