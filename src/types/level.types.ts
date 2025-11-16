export type Level = {
    id: string;
    name: string;
    arName: string;
    enName: string;
    description: string;
};

export type Grade = {
    id: string;
    name: string;
    arName: string;
    enName: string;
    level: Level;
};

export type LevelResponse = Level & {
    grades: {
        id: string;
        name: string;
        arName: string;
        enName: string;
        levelId: string;
    }[];
};
