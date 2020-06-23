import { Team } from '@manwaring-games/codenames-common'

export class GameDetails {
    isUserTurn: boolean
    isUserSpymaster: boolean
    canUserTakeAction: boolean
    canSpymasterTakeAction: boolean
    currentTeam: Team
    redTeamGuessed: number
    redTeamGoal: number
    blueTeamGuessed: number
    blueTeamGoal: number
}