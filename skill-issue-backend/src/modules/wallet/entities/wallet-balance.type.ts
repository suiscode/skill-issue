import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class WalletBalanceType {
  @Field(() => Int)
  availableCents: number;
  @Field(() => Int)
  escrowedCents: number;
  @Field()
  currency: string;
}
