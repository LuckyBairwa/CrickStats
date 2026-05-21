// src/utils/matchEngine.ts 😎🔥

export interface PlayerStats {
  _id?: string;
  name: string;

  runs: number;
  balls: number;

  fours: number;
  sixes: number;

  strikeRate: number;

  isStriker: boolean;

  status?: string;

  battingStyle?: string;
}

export interface BowlerStats {
  _id?: string;

  name: string;

  overs: string;

  balls: number;

  runsGiven: number;

  wickets: number;

  economy: number;

  dotBalls: number;

  bowlingStyle?: string;
}

export interface Partnership {
  runs: number;
  balls: number;
}

export interface OverHistoryItem {
  overNumber: number;

  bowlerName: string;

  balls: string[];

  runsThisOver: number;

  totalRuns: number;

  totalWickets: number;

  striker: {
    name: string;
    runs: number;
    balls: number;
  };

  nonStriker: {
    name: string;
    runs: number;
    balls: number;
  };

  runRate: number;

  wicketInfo?: {
    playerName: string;
    runs: number;
    balls: number;
  };
}

export interface InningState {
  totalRuns: number;
  wickets: number;

  oversPlayed: string;

  legalBalls: number;

  battingTeam?: any;

  currentRunRate: number;

  projectedScore: number;

  target: number;

  requiredRunRate: number;

  thisOver: string[];

  overHistory: OverHistoryItem[];

  usedBatters: string[];

  striker: PlayerStats | null;
  nonStriker: PlayerStats | null;

  bowler: BowlerStats | null;

  partnership: Partnership;

  history: InningState[];
  redoStack: InningState[];

  lastWicket?: any;
}

export const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));

export const formatOvers = (balls: number) => {
  const overs = Math.floor(balls / 6);
  const remBalls = balls % 6;

  return `${overs}.${remBalls}`;
};

export const swapStrike = (inning: InningState) => {
  if (!inning.striker || !inning.nonStriker) {
    return;
  }

  const temp = inning.striker;

  inning.striker = inning.nonStriker;
  inning.nonStriker = temp;

  inning.striker.isStriker = true;
  inning.nonStriker.isStriker = false;
};

export const updateStrikeRate = (player: PlayerStats) => {
  player.strikeRate =
    player.balls > 0
      ? Number(((player.runs / player.balls) * 100).toFixed(2))
      : 0;
};

export const updateEconomy = (bowler: BowlerStats) => {
  const overs = bowler.balls / 6;

  bowler.economy =
    overs > 0 ? Number((bowler.runsGiven / overs).toFixed(2)) : 0;
};

export const updateMatchStats = (inning: InningState, totalOvers: number) => {
  inning.oversPlayed = formatOvers(inning.legalBalls);

  const overs = inning.legalBalls / 6;

  inning.currentRunRate =
    overs > 0 ? Number((inning.totalRuns / overs).toFixed(2)) : 0;

  inning.projectedScore = Math.round(inning.currentRunRate * totalOvers);

  if (inning.target > 0) {
    const runsLeft = inning.target - inning.totalRuns;

    const ballsLeft = totalOvers * 6 - inning.legalBalls;

    inning.requiredRunRate =
      ballsLeft > 0 ? Number(((runsLeft * 6) / ballsLeft).toFixed(2)) : 0;
  }
};

export const saveHistory = (prev: InningState, updated: InningState) => {
  updated.history = [
    ...prev.history,
    clone({
      ...prev,
      history: [],
      redoStack: [],
    }),
  ];

  updated.redoStack = [];
};

const saveOverHistory = (inning: InningState, wicketData?: any) => {
  if (!inning.bowler) {
    return;
  }

  const overNumber = Math.ceil(inning.legalBalls / 6);

  inning.overHistory.push({
    overNumber,
    bowlerName: inning.bowler.name,
    balls: [...inning.thisOver],
    runsThisOver: inning.thisOver.reduce((acc, item) => {
      if (item === 'WD' || item === 'NB') return acc + 1;
      if (item === 'W') return acc;
      if (item === 'B' || item === 'LB') return acc + 1;
      return acc + Number(item || 0);
    }, 0),
    totalRuns: inning.totalRuns,
    totalWickets: inning.wickets,
    striker: {
      name: inning.striker?.name || '',
      runs: inning.striker?.runs || 0,
      balls: inning.striker?.balls || 0,
    },
    nonStriker: {
      name: inning.nonStriker?.name || '',
      runs: inning.nonStriker?.runs || 0,
      balls: inning.nonStriker?.balls || 0,
    },
    runRate: inning.currentRunRate,
    wicketInfo: wicketData
      ? {
          playerName:
            wicketData?.outPlayer === 'nonStriker'
              ? inning.nonStriker?.name || ''
              : inning.striker?.name || '',
          runs: wicketData?.runsCompleted || 0,
          balls:
            wicketData?.outPlayer === 'nonStriker'
              ? inning.nonStriker?.balls || 0
              : inning.striker?.balls || 0,
        }
      : undefined,
  });

  inning.thisOver = [];
};

const completeOverIfNeeded = (
  inning: InningState,
  shouldSwapStrike: boolean = true,
  wicketData?: any,
) => {
  if (inning.legalBalls > 0 && inning.legalBalls % 6 === 0) {
    saveOverHistory(inning, wicketData);

    if (shouldSwapStrike) {
      swapStrike(inning);
    }
  }
};

export const handleBallEvent = (
  prev: InningState,
  type: string,
  totalOvers: number,
  wicketData?: any,
): InningState => {
  const updated: InningState = clone(prev);

  saveHistory(prev, updated);

  // =====================================================
  // 😎 NORMAL RUNS
  // =====================================================

  if (!isNaN(Number(type))) {
    const runs = Number(type);

    updated.totalRuns += runs;

    updated.striker!.runs += runs;
    updated.striker!.balls += 1;

    updated.legalBalls += 1;

    updated.partnership.runs += runs;
    updated.partnership.balls += 1;

    updated.thisOver.push(`${runs}`);

    updated.bowler!.runsGiven += runs;
    updated.bowler!.balls += 1;

    if (runs === 4) updated.striker!.fours += 1;

    if (runs === 6) updated.striker!.sixes += 1;

    if (runs === 0) updated.bowler!.dotBalls += 1;

    const singleBatterMode = updated.wickets >= updated.usedBatters.length - 1;

    if (runs % 2 !== 0 && !singleBatterMode) {
      swapStrike(updated);
    }

    completeOverIfNeeded(updated, !singleBatterMode);

    updated.bowler!.overs = formatOvers(updated.bowler!.balls);

    updateStrikeRate(updated.striker!);
    updateStrikeRate(updated.nonStriker!);

    updateEconomy(updated.bowler!);

    updateMatchStats(updated, totalOvers);

    return updated;
  }

  // =====================================================
  // 😎 WIDE
  // =====================================================

  if (type === 'WD') {
    updated.totalRuns += 1;

    updated.partnership.runs += 1;

    updated.bowler!.runsGiven += 1;

    updated.thisOver.push('WD');

    updateEconomy(updated.bowler!);

    updateMatchStats(updated, totalOvers);

    return updated;
  }

  // =====================================================
  // 😎 NO BALL
  // =====================================================

  if (type === 'NB') {
    updated.totalRuns += 1;

    updated.partnership.runs += 1;

    updated.bowler!.runsGiven += 1;

    updated.thisOver.push('NB');

    updateEconomy(updated.bowler!);

    updateMatchStats(updated, totalOvers);

    return updated;
  }

  // =====================================================
  // 😎 BYE / LEG BYE
  // =====================================================

  if (type === 'B' || type === 'LB') {
    updated.totalRuns += 1;

    updated.legalBalls += 1;

    updated.partnership.runs += 1;
    updated.partnership.balls += 1;

    updated.bowler!.balls += 1;

    updated.thisOver.push(type);

    completeOverIfNeeded(updated, true);

    updated.bowler!.overs = formatOvers(updated.bowler!.balls);

    updateEconomy(updated.bowler!);

    updateMatchStats(updated, totalOvers);

    return updated;
  }

  // =====================================================
  // 😎 WICKET
  // =====================================================

  if (type === 'WKT') {
    const outPlayer = wicketData?.outPlayer || 'striker';

    const runsCompleted = wicketData?.runsCompleted || 0;

    updated.wickets += 1;

    updated.totalRuns += runsCompleted;

    updated.legalBalls += 1;

    updated.partnership.runs += runsCompleted;
    updated.partnership.balls += 1;

    updated.thisOver.push('W');

    updated.bowler!.wickets += 1;
    updated.bowler!.balls += 1;
    updated.bowler!.runsGiven += runsCompleted;

    const outBatter =
      outPlayer === 'striker' ? updated.striker : updated.nonStriker;

    outBatter!.balls += 1;
    outBatter!.status = 'Out';

    const singleBatterMode = updated.wickets >= updated.usedBatters.length - 1;

    if (runsCompleted % 2 !== 0 && !singleBatterMode) {
      swapStrike(updated);
    }

    completeOverIfNeeded(updated, !singleBatterMode, wicketData);

    updated.bowler!.overs = formatOvers(updated.bowler!.balls);

    updated.lastWicket = wicketData;

    updateStrikeRate(updated.striker!);
    updateStrikeRate(updated.nonStriker!);

    updateEconomy(updated.bowler!);

    updateMatchStats(updated, totalOvers);

    return updated;
  }

  return updated;
};

export const undoBall = (inning: InningState): InningState => {
  if (inning.history.length === 0) {
    return inning;
  }

  const history = [...inning.history];

  const previous = history.pop();

  if (!previous) return inning;

  const currentSnapshot = clone({
    ...inning,
    history: [],
    redoStack: [],
  });

  previous.redoStack = [currentSnapshot, ...inning.redoStack];

  previous.history = history;

  return previous;
};

export const redoBall = (inning: InningState): InningState => {
  if (inning.redoStack.length === 0) {
    return inning;
  }

  const redo = [...inning.redoStack];

  const next = redo.shift();

  if (!next) return inning;

  const currentSnapshot = clone({
    ...inning,
    history: [],
    redoStack: [],
  });

  next.history = [...inning.history, currentSnapshot];

  next.redoStack = redo;

  return next;
};
