// This file is auto-generated by @hey-api/openapi-ts

export const $Input = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        username: {
            type: 'string',
            pattern: '^[a-zA-Z0-9_]*$',
            maxLength: 20,
            minLength: 3
        }
    },
    required: ['id', 'username']
} as const;

export const $OngoingContestRetrieve = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        slug: {
            type: 'string'
        }
    },
    required: ['id', 'slug']
} as const;

export const $SocialLogin = {
    type: 'object',
    properties: {
        accessToken: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        idToken: {
            type: 'string'
        }
    }
} as const;

export const $TokenRefresh = {
    type: 'object',
    properties: {
        access: {
            type: 'string',
            readOnly: true
        },
        refresh: {
            type: 'string',
            writeOnly: true
        }
    },
    required: ['access', 'refresh']
} as const;

export const $User = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        username: {
            type: 'string',
            pattern: '^[a-zA-Z0-9_]*$',
            maxLength: 20,
            minLength: 3
        }
    },
    required: ['id', 'username']
} as const;

export const $contests_ContestListOutput = {
    type: 'object',
    properties: {
        limit: {
            type: 'integer'
        },
        offset: {
            type: 'integer'
        },
        count: {
            type: 'integer'
        },
        next: {
            type: 'string'
        },
        previous: {
            type: 'string'
        },
        results: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/contests.ContestListResultsOutput'
            }
        }
    },
    required: ['count', 'limit', 'next', 'offset', 'previous', 'results']
} as const;

export const $contests_ContestListResultsOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        name: {
            type: 'string'
        },
        slug: {
            type: 'string'
        },
        startDate: {
            type: 'string',
            format: 'date-time'
        },
        endDate: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['endDate', 'id', 'name', 'slug', 'startDate']
} as const;

export const $contests_RoundSessionWithSolvesListContestOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_RoundSessionWithSolvesListDisciplineOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_RoundSessionWithSolvesListOutput = {
    type: 'object',
    properties: {
        limit: {
            type: 'integer'
        },
        offset: {
            type: 'integer'
        },
        count: {
            type: 'integer'
        },
        next: {
            type: 'string'
        },
        previous: {
            type: 'string'
        },
        results: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/contests.RoundSessionWithSolvesListResultOutput'
            }
        }
    },
    required: ['count', 'limit', 'next', 'offset', 'previous', 'results']
} as const;

export const $contests_RoundSessionWithSolvesListResultOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        avgMs: {
            type: 'integer'
        },
        isDnf: {
            type: 'boolean'
        },
        isFinished: {
            type: 'boolean'
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
        user: {
            '$ref': '#/components/schemas/contests.RoundSessionWithSolvesListUserOutput'
        },
        contest: {
            '$ref': '#/components/schemas/contests.RoundSessionWithSolvesListContestOutput'
        },
        discipline: {
            '$ref': '#/components/schemas/contests.RoundSessionWithSolvesListDisciplineOutput'
        },
        solveSet: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/contests.RoundSessionWithSolvesListSolveSetOutput'
            }
        }
    },
    required: ['avgMs', 'contest', 'createdAt', 'discipline', 'id', 'isDnf', 'isFinished', 'solveSet', 'updatedAt', 'user']
} as const;

export const $contests_RoundSessionWithSolvesListSolveSetOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        isDnf: {
            type: 'boolean'
        },
        submissionState: {
            type: 'string'
        },
        extraId: {
            type: 'integer'
        }
    },
    required: ['extraId', 'id', 'isDnf', 'submissionState']
} as const;

export const $contests_RoundSessionWithSolvesListUserOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        username: {
            type: 'string'
        }
    },
    required: ['id', 'username']
} as const;

export const $contests_SingleResultLeaderboardOutput = {
    type: 'object',
    properties: {
        limit: {
            type: 'integer'
        },
        offset: {
            type: 'integer'
        },
        count: {
            type: 'integer'
        },
        next: {
            type: 'string'
        },
        previous: {
            type: 'string'
        },
        results: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsOutput'
            }
        }
    },
    required: ['count', 'limit', 'next', 'offset', 'previous', 'results']
} as const;

export const $contests_SingleResultLeaderboardResultsContestOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SingleResultLeaderboardResultsDisciplineOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        slug: {
            type: 'string'
        }
    },
    required: ['id', 'slug']
} as const;

export const $contests_SingleResultLeaderboardResultsOutput = {
    type: 'object',
    properties: {
        solve: {
            '$ref': '#/components/schemas/inline_serializer'
        }
    },
    required: ['solve']
} as const;

export const $contests_SingleResultLeaderboardResultsRoundSessionOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SingleResultLeaderboardResultsScrambleOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SingleResultLeaderboardResultsUserOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        username: {
            type: 'string'
        }
    },
    required: ['id', 'username']
} as const;

export const $contests_SolveRetrieveContest = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SolveRetrieveDiscipline = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SolveRetrieveOutput = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        timeMs: {
            type: 'integer'
        },
        isDnf: {
            type: 'boolean'
        },
        submissionState: {
            type: 'string'
        },
        reconstruction: {
            type: 'string'
        },
        scramble: {
            '$ref': '#/components/schemas/contests.SolveRetrieveScramble'
        },
        user: {
            '$ref': '#/components/schemas/contests.SolveRetrieveUser'
        },
        discipline: {
            '$ref': '#/components/schemas/contests.SolveRetrieveDiscipline'
        },
        roundSession: {
            '$ref': '#/components/schemas/contests.SolveRetrieveRoundSession'
        },
        contest: {
            '$ref': '#/components/schemas/contests.SolveRetrieveContest'
        }
    },
    required: ['contest', 'discipline', 'id', 'isDnf', 'reconstruction', 'roundSession', 'scramble', 'submissionState', 'timeMs', 'user']
} as const;

export const $contests_SolveRetrieveRoundSession = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SolveRetrieveScramble = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $contests_SolveRetrieveUser = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $inline_serializer = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        timeMs: {
            type: 'integer'
        },
        isDnf: {
            type: 'boolean'
        },
        submissionState: {
            type: 'string'
        },
        reconstruction: {
            type: 'string'
        },
        scramble: {
            '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsScrambleOutput'
        },
        user: {
            '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsUserOutput'
        },
        discipline: {
            '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsDisciplineOutput'
        },
        roundSession: {
            '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsRoundSessionOutput'
        },
        contest: {
            '$ref': '#/components/schemas/contests.SingleResultLeaderboardResultsContestOutput'
        }
    },
    required: ['contest', 'discipline', 'id', 'isDnf', 'reconstruction', 'roundSession', 'scramble', 'submissionState', 'timeMs', 'user']
} as const;