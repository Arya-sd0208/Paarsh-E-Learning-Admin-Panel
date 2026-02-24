export interface EntranceOption {
    text: string;
    isCorrect: boolean;
}

export interface EntranceQuestion {
    _id: string;
    question: string;
    options: EntranceOption[];
    correctAnswer?: string;
    category?: string;
    explanation?: string;
    selectedAnswer: number;
    timeSpent: number;
}

export interface EntranceTestInfo {
    session: {
        sessionId: string;
        startTime: string;
        duration: number;
        status: string;
    };
    testDetails: any;
    questions?: EntranceQuestion[];
    hasExpiry: boolean;
    startTime: string;
    endTime: string;
}
