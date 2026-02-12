import { CreateMatchInput } from './dto/create-match.input';
import { SubmitMatchResultInput } from './dto/submit-match-result.input';
import { MatchType } from './entities/match.type';

export const MATCH_REPOSITORY = Symbol('MATCH_REPOSITORY');

export interface MatchRepository {
  create(input: CreateMatchInput): Promise<MatchType>;
  submitResult(input: SubmitMatchResultInput): Promise<MatchType>;
  findById(id: string): Promise<MatchType>;
  list(): Promise<MatchType[]>;
}
