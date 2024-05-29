// This file is auto-generated by @hey-api/openapi-ts

export type Input = {
    readonly id: number;
    username: string;
};

export type OngoingContestRetrieve = {
    id: number;
    slug: string;
};

export type SocialLogin = {
    accessToken?: string;
    code?: string;
    idToken?: string;
};

export type TokenRefresh = {
    readonly access: string;
    refresh: string;
};

export type User = {
    readonly id: number;
    username: string;
};

export type contests_ContestListOutput = {
    limit: number;
    offset: number;
    count: number;
    next: string;
    previous: string;
    results: Array<contests_ContestListResultsOutput>;
};

export type contests_ContestListResultsOutput = {
    id: number;
    name: string;
    slug: string;
    startDate: string;
    endDate: string;
};

export type contests_RoundSessionWithSolvesListContestOutput = {
    id: number;
};

export type contests_RoundSessionWithSolvesListDisciplineOutput = {
    id: number;
};

export type contests_RoundSessionWithSolvesListOutput = {
    limit: number;
    offset: number;
    count: number;
    next: string;
    previous: string;
    results: Array<contests_RoundSessionWithSolvesListResultOutput>;
};

export type contests_RoundSessionWithSolvesListResultOutput = {
    id: number;
    avgMs: number;
    isDnf: boolean;
    isFinished: boolean;
    createdAt: string;
    updatedAt: string;
    user: contests_RoundSessionWithSolvesListUserOutput;
    contest: contests_RoundSessionWithSolvesListContestOutput;
    discipline: contests_RoundSessionWithSolvesListDisciplineOutput;
    solveSet: Array<contests_RoundSessionWithSolvesListSolveSetOutput>;
};

export type contests_RoundSessionWithSolvesListSolveSetOutput = {
    id: number;
    isDnf: boolean;
    submissionState: string;
    extraId: number;
};

export type contests_RoundSessionWithSolvesListUserOutput = {
    id: number;
    username: string;
};

export type contests_SingleResultLeaderboardOutput = {
    limit: number;
    offset: number;
    count: number;
    next: string;
    previous: string;
    results: Array<contests_SingleResultLeaderboardResultsOutput>;
};

export type contests_SingleResultLeaderboardResultsContestOutput = {
    id: number;
};

export type contests_SingleResultLeaderboardResultsDisciplineOutput = {
    id: number;
    slug: string;
};

export type contests_SingleResultLeaderboardResultsOutput = {
    solve: inline_serializer;
};

export type contests_SingleResultLeaderboardResultsRoundSessionOutput = {
    id: number;
};

export type contests_SingleResultLeaderboardResultsScrambleOutput = {
    id: number;
};

export type contests_SingleResultLeaderboardResultsUserOutput = {
    id: number;
    username: string;
};

export type contests_SolveRetrieveContest = {
    id: number;
};

export type contests_SolveRetrieveDiscipline = {
    id: number;
};

export type contests_SolveRetrieveOutput = {
    id: number;
    timeMs: number;
    isDnf: boolean;
    submissionState: string;
    reconstruction: string;
    scramble: contests_SolveRetrieveScramble;
    user: contests_SolveRetrieveUser;
    discipline: contests_SolveRetrieveDiscipline;
    roundSession: contests_SolveRetrieveRoundSession;
    contest: contests_SolveRetrieveContest;
};

export type contests_SolveRetrieveRoundSession = {
    id: number;
};

export type contests_SolveRetrieveScramble = {
    id: number;
};

export type contests_SolveRetrieveUser = {
    id: number;
};

export type inline_serializer = {
    id: number;
    timeMs: number;
    isDnf: boolean;
    submissionState: string;
    reconstruction: string;
    scramble: contests_SingleResultLeaderboardResultsScrambleOutput;
    user: contests_SingleResultLeaderboardResultsUserOutput;
    discipline: contests_SingleResultLeaderboardResultsDisciplineOutput;
    roundSession: contests_SingleResultLeaderboardResultsRoundSessionOutput;
    contest: contests_SingleResultLeaderboardResultsContestOutput;
};

export type AccountsChangeUsernameUpdateData = {
    formData: Input;
};

export type AccountsChangeUsernameUpdateResponse = User;

export type AccountsCurrentUserRetrieveResponse = unknown;

export type AccountsGoogleLoginCreateData = {
    formData?: SocialLogin;
};

export type AccountsGoogleLoginCreateResponse = SocialLogin;

export type AccountsTokenRefreshCreateData = {
    formData: TokenRefresh;
};

export type AccountsTokenRefreshCreateResponse = TokenRefresh;

export type ContestsContestsRetrieveData = {
    /**
     * count of contest to be returned
     */
    limit?: number;
    /**
     * offset
     */
    offset?: number;
    /**
     * order by something
     */
    orderBy?: '-created_at' | 'created_at';
};

export type ContestsContestsRetrieveResponse = contests_ContestListOutput;

export type ContestsContestsLeaderboardRetrieveData = {
    contestSlug: string;
    /**
     * discipline slug
     */
    disciplineSlug: string;
    /**
     * order by something
     */
    orderBy?: '-avg_ms' | 'avg_ms';
};

export type ContestsContestsLeaderboardRetrieveResponse = contests_RoundSessionWithSolvesListOutput;

export type ContestsOngoingContestRetrieveRetrieveResponse = OngoingContestRetrieve;

export type ContestsSolvesRetrieveRetrieveData = {
    id: number;
};

export type ContestsSolvesRetrieveRetrieveResponse = contests_SolveRetrieveOutput;

export type ContestsSolvesSingleResultLeaderboardRetrieveData = {
    /**
     * count of contest to be returned
     */
    limit?: number;
    /**
     * offset
     */
    offset?: number;
};

export type ContestsSolvesSingleResultLeaderboardRetrieveResponse = contests_SingleResultLeaderboardOutput;

export type $OpenApiTs = {
    '/api/accounts/change-username/': {
        put: {
            req: AccountsChangeUsernameUpdateData;
            res: {
                200: User;
            };
        };
    };
    '/api/accounts/current-user/': {
        get: {
            res: {
                /**
                 * No response body
                 */
                200: unknown;
            };
        };
    };
    '/api/accounts/google/login/': {
        post: {
            req: AccountsGoogleLoginCreateData;
            res: {
                200: SocialLogin;
            };
        };
    };
    '/api/accounts/token/refresh/': {
        post: {
            req: AccountsTokenRefreshCreateData;
            res: {
                200: TokenRefresh;
            };
        };
    };
    '/api/contests/contests/': {
        get: {
            req: ContestsContestsRetrieveData;
            res: {
                200: contests_ContestListOutput;
            };
        };
    };
    '/api/contests/contests/{contestSlug}/leaderboard/': {
        get: {
            req: ContestsContestsLeaderboardRetrieveData;
            res: {
                200: contests_RoundSessionWithSolvesListOutput;
            };
        };
    };
    '/api/contests/ongoing-contest/retrieve/': {
        get: {
            res: {
                200: OngoingContestRetrieve;
            };
        };
    };
    '/api/contests/solves/{id}/retrieve/': {
        get: {
            req: ContestsSolvesRetrieveRetrieveData;
            res: {
                200: contests_SolveRetrieveOutput;
            };
        };
    };
    '/api/contests/solves/single-result-leaderboard': {
        get: {
            req: ContestsSolvesSingleResultLeaderboardRetrieveData;
            res: {
                200: contests_SingleResultLeaderboardOutput;
            };
        };
    };
};