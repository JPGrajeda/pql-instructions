declare interface Player {
    id: number;
    name: string;
    age: number;
    position: string;
    team_id: number | null
}

declare interface Team{
    id: number;
    name: string, 
    slogan: string | null,
    players?: number[]
}