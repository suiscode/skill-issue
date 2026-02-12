import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import type { AuthUser } from '../../common/types/auth-user.type';
import { CreateMatchInput } from './dto/create-match.input';
import { SubmitMatchResultInput } from './dto/submit-match-result.input';
import { MatchType } from './entities/match.type';
import { MatchService } from './match.service';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query(() => [MatchType])
  matches(): Promise<MatchType[]> {
    return this.matchService.listMatches();
  }

  @Query(() => MatchType)
  match(@Args('id', { type: () => ID }) id: string): Promise<MatchType> {
    return this.matchService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MatchType)
  createMatch(
    @Args('input') input: CreateMatchInput,
    @CurrentUser() user: AuthUser,
  ): Promise<MatchType> {
    void user;
    return this.matchService.createMatch(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MatchType)
  submitMatchResult(
    @Args('input') input: SubmitMatchResultInput,
    @CurrentUser() user: AuthUser,
  ): Promise<MatchType> {
    void user;
    return this.matchService.submitMatchResult(input);
  }
}
