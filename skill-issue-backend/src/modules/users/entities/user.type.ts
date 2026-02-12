import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field(() => Int)
  mmr: number;
  @Field()
  region: string;
}
