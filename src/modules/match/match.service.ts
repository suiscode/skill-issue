import { Inject, Injectable } from '@nestjs/common';
import { CreateMatchInput } from './dto/create-match.input';
import { SubmitMatchResultInput } from './dto/submit-match-result.input';
import { MatchType } from './entities/match.type';
import { MATCH_REPOSITORY } from './match.repository';
import type { MatchRepository } from './match.repository';

@Injectable()
export class MatchService {
  constructor(
    @Inject(MATCH_REPOSITORY)
    private readonly matchRepository: MatchRepository,
  ) {}

  createMatch(input: CreateMatchInput): Promise<MatchType> {
    return this.matchRepository.create(input);
  }

  submitMatchResult(input: SubmitMatchResultInput): Promise<MatchType> {
    return this.matchRepository.submitResult(input);
  }

  findById(id: string): Promise<MatchType> {
    return this.matchRepository.findById(id);
  }

  listMatches(): Promise<MatchType[]> {
    return this.matchRepository.list();
  }
}
