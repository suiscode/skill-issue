import {
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { GqlAuthGuard } from '../src/common/guards/gql-auth.guard';
import { SupabaseAuthService } from '../src/modules/auth/supabase-auth.service';

type GraphQLErrorPayload = {
  message?: string;
};

type GraphQLResponseBody<TData> = {
  data?: TData;
  errors?: GraphQLErrorPayload[];
};

type SignUpMutationData = {
  signUp: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  };
};

type SignInMutationData = {
  signIn: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  };
};

type WalletBalanceQueryData = {
  walletBalance: {
    availableCents: number;
    escrowedCents: number;
    currency: string;
  };
};

type CreateLobbyMutationData = {
  createLobby: {
    id: string;
    game: string;
    status: string;
    teamAUserIds: string[];
  };
};

type JoinLobbyMutationData = {
  joinLobby: {
    id: string;
    teamBUserIds: string[];
  };
};

type CreateMatchMutationData = {
  createMatch: {
    id: string;
    status: string;
  };
};

type SubmitMatchResultMutationData = {
  submitMatchResult: {
    id: string;
    status: string;
    winnerTeamSide: string;
  };
};

type TestUser = {
  id: string;
  email: string;
  username: string;
  password: string;
};

type SignUpInput = {
  email: string;
  password: string;
  options?: {
    data?: {
      username?: string;
    };
  };
};

type SignInInput = {
  email: string;
  password: string;
};

type SupabaseAuthUser = {
  id: string;
  email_confirmed_at: string;
};

type MockAuthService = {
  publicClient: {
    auth: {
      signUp: (input: SignUpInput) => Promise<{
        data: { user: SupabaseAuthUser | null };
        error: { message: string } | null;
      }>;
      signInWithPassword: (input: SignInInput) => Promise<{
        data: {
          user: SupabaseAuthUser | null;
          session: { access_token: string } | null;
        };
        error: { message: string } | null;
      }>;
    };
  };
  adminClient: {
    auth: {
      admin: {
        deleteUser: (id: string) => Promise<void>;
      };
    };
  };
};

function readGraphQLBody<TData>(body: unknown): GraphQLResponseBody<TData> {
  return body as GraphQLResponseBody<TData>;
}

function createMockAuthService(): MockAuthService {
  const usersByEmail = new Map<string, TestUser>();
  const usersById = new Map<string, TestUser>();
  let userCounter = 0;

  return {
    publicClient: {
      auth: {
        signUp: (input: SignUpInput) => {
          if (usersByEmail.has(input.email)) {
            return Promise.resolve({
              data: { user: null },
              error: { message: 'Email already exists' },
            });
          }

          userCounter += 1;
          const id = `u${userCounter}`;
          const user: TestUser = {
            id,
            email: input.email,
            password: input.password,
            username: input.options?.data?.username ?? `user_${id}`,
          };
          usersByEmail.set(user.email, user);
          usersById.set(user.id, user);

          return Promise.resolve({
            data: {
              user: {
                id: user.id,
                email_confirmed_at: new Date().toISOString(),
              },
            },
            error: null,
          });
        },
        signInWithPassword: (input: SignInInput) => {
          const user = usersByEmail.get(input.email);
          if (!user || user.password !== input.password) {
            return Promise.resolve({
              data: { user: null, session: null },
              error: { message: 'Invalid credentials' },
            });
          }

          return Promise.resolve({
            data: {
              user: {
                id: user.id,
                email_confirmed_at: new Date().toISOString(),
              },
              session: {
                access_token: `mock-token-${user.id}`,
              },
            },
            error: null,
          });
        },
      },
    },
    adminClient: {
      auth: {
        admin: {
          deleteUser: (id: string) => {
            const user = usersById.get(id);
            if (!user) {
              return Promise.resolve();
            }
            usersById.delete(id);
            usersByEmail.delete(user.email);
            return Promise.resolve();
          },
        },
      },
    },
  };
}

describe('GraphQL (e2e)', () => {
  let app: INestApplication;
  let authToken = '';
  let secondUserToken = '';
  const getHttpServer = (): Parameters<typeof request>[0] =>
    app.getHttpServer() as Parameters<typeof request>[0];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GqlAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext): boolean => {
          if (context.getType<string>() !== 'graphql') {
            return true;
          }

          const gqlContext = GqlExecutionContext.create(context);
          const requestContext = gqlContext.getContext<{
            req?: {
              body?: { query?: string };
              headers?: Record<string, string | string[] | undefined>;
              user?: { userId: string };
            };
          }>().req;

          const query = requestContext?.body?.query ?? '';
          if (query.includes('signUp') || query.includes('signIn')) {
            return true;
          }

          const authorizationHeader = requestContext?.headers?.authorization;
          const authorization = Array.isArray(authorizationHeader)
            ? authorizationHeader[0]
            : authorizationHeader;
          const token = authorization?.startsWith('Bearer ')
            ? authorization.slice(7)
            : undefined;

          if (!token || !token.startsWith('mock-token-')) {
            throw new UnauthorizedException('Missing or invalid token');
          }

          const userId = token.slice('mock-token-'.length);
          if (!userId) {
            throw new UnauthorizedException('Missing or invalid token');
          }

          if (requestContext) {
            requestContext.user = { userId };
          }

          return true;
        },
      })
      .overrideProvider(SupabaseAuthService)
      .useValue(createMockAuthService())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  async function signUpAndSignIn(
    email: string,
    username: string,
    password: string,
  ): Promise<{ accessToken: string; userId: string }> {
    const signUpMutation = `
      mutation {
        signUp(input: { email: "${email}", username: "${username}", password: "${password}" }) {
          accessToken
          user { id email username }
        }
      }
    `;

    const signUpResponse = await request(getHttpServer())
      .post('/graphql')
      .send({ query: signUpMutation })
      .expect(200);
    const signUpBody = readGraphQLBody<SignUpMutationData>(signUpResponse.body);

    expect(signUpBody.data?.signUp.user.email).toBe(email);
    expect(signUpBody.errors).toBeUndefined();

    const signInMutation = `
      mutation {
        signIn(input: { email: "${email}", password: "${password}" }) {
          accessToken
          user { id email username }
        }
      }
    `;

    const signInResponse = await request(getHttpServer())
      .post('/graphql')
      .send({ query: signInMutation })
      .expect(200);
    const signInBody = readGraphQLBody<SignInMutationData>(signInResponse.body);
    const payload = signInBody.data?.signIn;

    expect(payload).toBeDefined();
    expect(payload?.accessToken).toContain('mock-token-');
    if (!payload) {
      throw new Error('Expected signIn payload');
    }

    return { accessToken: payload.accessToken, userId: payload.user.id };
  }

  it('GET / should still return hello world', async () => {
    await request(getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('signUp should create a user and return token', async () => {
    const suffix = `${Date.now()}`;
    const result = await signUpAndSignIn(
      `e2e_${suffix}@example.com`,
      `e2e_user_${suffix}`,
      'secret',
    );

    authToken = result.accessToken;
    expect(authToken).toContain('mock-token-');
  });

  it('walletBalance should require auth and return the current user wallet', async () => {
    const query = `
      query {
        walletBalance {
          availableCents
          escrowedCents
          currency
        }
      }
    `;

    const unauthorized = await request(getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const unauthorizedBody = readGraphQLBody<WalletBalanceQueryData>(
      unauthorized.body,
    );
    expect(unauthorizedBody.errors?.[0]?.message).toContain(
      'Missing or invalid token',
    );

    const authorized = await request(getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query })
      .expect(200);

    const authorizedBody = readGraphQLBody<WalletBalanceQueryData>(
      authorized.body,
    );
    expect(authorizedBody.data?.walletBalance.currency).toBe('USD');
  });

  it('createLobby, joinLobby, createMatch, and submitMatchResult should work', async () => {
    const suffix = `${Date.now()}_u2`;
    const secondUser = await signUpAndSignIn(
      `e2e_${suffix}@example.com`,
      `e2e_user_${suffix}`,
      'secret',
    );
    secondUserToken = secondUser.accessToken;

    const createLobbyMutation = `
      mutation {
        createLobby(input: { game: "VALORANT", region: "NA", stakePerPlayerCents: 500 }) {
          id
          game
          status
          teamAUserIds
        }
      }
    `;

    const createLobbyResponse = await request(getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: createLobbyMutation })
      .expect(200);

    const createLobbyBody = readGraphQLBody<CreateLobbyMutationData>(
      createLobbyResponse.body,
    );
    const lobbyId = createLobbyBody.data?.createLobby.id;
    expect(lobbyId).toBeDefined();
    expect(createLobbyBody.data?.createLobby.teamAUserIds.length).toBe(1);
    if (!lobbyId) {
      throw new Error('Expected createLobby id');
    }

    const joinLobbyMutation = `
      mutation {
        joinLobby(input: { lobbyId: "${lobbyId}", teamSide: B }) {
          id
          teamBUserIds
        }
      }
    `;

    const joinLobbyResponse = await request(getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${secondUserToken}`)
      .send({ query: joinLobbyMutation })
      .expect(200);

    const joinLobbyBody = readGraphQLBody<JoinLobbyMutationData>(
      joinLobbyResponse.body,
    );
    expect(joinLobbyBody.data?.joinLobby.teamBUserIds.length).toBe(1);

    const createMatchMutation = `
      mutation {
        createMatch(input: { lobbyId: "${lobbyId}", betPerPlayerCents: 500 }) {
          id
          status
        }
      }
    `;

    const createMatchResponse = await request(getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: createMatchMutation })
      .expect(200);

    const createMatchBody = readGraphQLBody<CreateMatchMutationData>(
      createMatchResponse.body,
    );
    const matchId = createMatchBody.data?.createMatch.id;
    expect(matchId).toBeDefined();
    expect(createMatchBody.data?.createMatch.status).toBe('OPEN');
    if (!matchId) {
      throw new Error('Expected createMatch id');
    }

    const submitResultMutation = `
      mutation {
        submitMatchResult(input: { matchId: "${matchId}", winnerTeamSide: A, resultEvidence: "signed_provider_payload" }) {
          id
          status
          winnerTeamSide
        }
      }
    `;

    const submitResultResponse = await request(getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: submitResultMutation })
      .expect(200);

    const submitResultBody = readGraphQLBody<SubmitMatchResultMutationData>(
      submitResultResponse.body,
    );
    expect(submitResultBody.data?.submitMatchResult.status).toBe(
      'RESULT_PENDING',
    );
    expect(submitResultBody.data?.submitMatchResult.winnerTeamSide).toBe('A');
  });
});
