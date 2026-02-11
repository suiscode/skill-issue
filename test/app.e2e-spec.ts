import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GraphQL (e2e)', () => {
  let app: INestApplication;
  let authToken = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / should still return hello world', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('signUp should create a user and return token', async () => {
    const mutation = `
      mutation {
        signUp(input: { email: "e2e@example.com", username: "e2e_user", password: "secret" }) {
          accessToken
          user { id email username }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })
      .expect(200);

    const payload = response.body.data.signUp;
    expect(payload.user.email).toBe('e2e@example.com');
    expect(payload.accessToken).toContain('mock-token-');
    authToken = payload.accessToken as string;
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

    const unauthorized = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(unauthorized.body.errors?.[0]?.message).toContain('Missing or invalid token');

    const authorized = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query })
      .expect(200);

    expect(authorized.body.data.walletBalance.currency).toBe('USD');
  });

  it('createLobby, joinLobby, createMatch, and submitMatchResult should work', async () => {
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

    const createLobbyResponse = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: createLobbyMutation })
      .expect(200);

    const lobbyId = createLobbyResponse.body.data.createLobby.id as string;
    expect(createLobbyResponse.body.data.createLobby.teamAUserIds.length).toBe(1);

    const joinLobbyMutation = `
      mutation {
        joinLobby(input: { lobbyId: "${lobbyId}", teamSide: B }) {
          id
          teamBUserIds
        }
      }
    `;

    const joinLobbyResponse = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer mock-token-u2')
      .send({ query: joinLobbyMutation })
      .expect(200);

    expect(joinLobbyResponse.body.data.joinLobby.teamBUserIds).toContain('u2');

    const createMatchMutation = `
      mutation {
        createMatch(input: { lobbyId: "${lobbyId}", betPerPlayerCents: 500 }) {
          id
          status
        }
      }
    `;

    const createMatchResponse = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: createMatchMutation })
      .expect(200);

    const matchId = createMatchResponse.body.data.createMatch.id as string;
    expect(createMatchResponse.body.data.createMatch.status).toBe('OPEN');

    const submitResultMutation = `
      mutation {
        submitMatchResult(input: { matchId: "${matchId}", winnerTeamSide: A, resultEvidence: "signed_provider_payload" }) {
          id
          status
          winnerTeamSide
        }
      }
    `;

    const submitResultResponse = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: submitResultMutation })
      .expect(200);

    expect(submitResultResponse.body.data.submitMatchResult.status).toBe('RESULT_PENDING');
    expect(submitResultResponse.body.data.submitMatchResult.winnerTeamSide).toBe('A');
  });
});
