import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KlerosLiquid
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const klerosLiquidAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_pinakion', type: 'address' }],
    name: 'changePinakion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'RNBlock',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'disputesWithoutJurors',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'passPhase',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'governor',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'lastDelayedSetStake',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'disputeStatus',
    outputs: [{ name: 'status', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'passPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'maxDrawingTime',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'currentRuling',
    outputs: [{ name: 'ruling', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'courts',
    outputs: [
      { name: 'parent', type: 'uint96' },
      { name: 'hiddenVotes', type: 'bool' },
      { name: 'minStake', type: 'uint256' },
      { name: 'alpha', type: 'uint256' },
      { name: 'feeForJuror', type: 'uint256' },
      { name: 'jurorsForCourtJump', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_appeal', type: 'uint256' },
      { name: '_iterations', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'ALPHA_DIVISOR',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_voteIDs', type: 'uint256[]' },
      { name: '_choice', type: 'uint256' },
      { name: '_salt', type: 'uint256' },
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_minStake', type: 'uint256' },
    ],
    name: 'changeSubcourtMinStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_subcourtID', type: 'uint96' }],
    name: 'getSubcourt',
    outputs: [
      { name: 'children', type: 'uint256[]' },
      { name: 'timesPerPeriod', type: 'uint256[4]' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_extraData', type: 'bytes' },
    ],
    name: 'appeal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'onTransfer',
    outputs: [{ name: 'allowed', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'disputes',
    outputs: [
      { name: 'subcourtID', type: 'uint96' },
      { name: 'arbitrated', type: 'address' },
      { name: 'numberOfChoices', type: 'uint256' },
      { name: 'period', type: 'uint8' },
      { name: 'lastPeriodChange', type: 'uint256' },
      { name: 'drawsInRound', type: 'uint256' },
      { name: 'commitsInRound', type: 'uint256' },
      { name: 'ruled', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_timesPerPeriod', type: 'uint256[4]' },
    ],
    name: 'changeSubcourtTimesPerPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_feeForJuror', type: 'uint256' },
    ],
    name: 'changeSubcourtJurorFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_alpha', type: 'uint256' },
    ],
    name: 'changeSubcourtAlpha',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_voteIDs', type: 'uint256[]' },
      { name: '_commit', type: 'bytes32' },
    ],
    name: 'castCommit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'RN',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'RNGenerator',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_destination', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_data', type: 'bytes' },
    ],
    name: 'executeGovernorProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_minStakingTime', type: 'uint256' }],
    name: 'changeMinStakingTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'NON_PAYABLE_AMOUNT',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_stake', type: 'uint128' },
    ],
    name: 'setStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'executeRuling',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_appeal', type: 'uint256' },
      { name: '_voteID', type: 'uint256' },
    ],
    name: 'getVote',
    outputs: [
      { name: 'account', type: 'address' },
      { name: 'commit', type: 'bytes32' },
      { name: 'choice', type: 'uint256' },
      { name: 'voted', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_RNGenerator', type: 'address' }],
    name: 'changeRNGenerator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_iterations', type: 'uint256' }],
    name: 'executeDelayedSetStakes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_account', type: 'address' },
      { name: '_subcourtID', type: 'uint96' },
    ],
    name: 'stakeOf',
    outputs: [{ name: 'stake', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_subcourtID', type: 'uint96' },
      { name: '_jurorsForCourtJump', type: 'uint256' },
    ],
    name: 'changeSubcourtJurorsForJump',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'appealPeriod',
    outputs: [
      { name: 'start', type: 'uint256' },
      { name: 'end', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'phase',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'MAX_STAKE_PATHS',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'delayedSetStakes',
    outputs: [
      { name: 'account', type: 'address' },
      { name: 'subcourtID', type: 'uint96' },
      { name: 'stake', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'lastPhaseChange',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'minStakingTime',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'nextDelayedSetStake',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_numberOfChoices', type: 'uint256' },
      { name: '_extraData', type: 'bytes' },
    ],
    name: 'createDispute',
    outputs: [{ name: 'disputeID', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_iterations', type: 'uint256' },
    ],
    name: 'drawJurors',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_parent', type: 'uint96' },
      { name: '_hiddenVotes', type: 'bool' },
      { name: '_minStake', type: 'uint256' },
      { name: '_alpha', type: 'uint256' },
      { name: '_feeForJuror', type: 'uint256' },
      { name: '_jurorsForCourtJump', type: 'uint256' },
      { name: '_timesPerPeriod', type: 'uint256[4]' },
      { name: '_sortitionSumTreeK', type: 'uint256' },
    ],
    name: 'createSubcourt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_account', type: 'address' }],
    name: 'getJuror',
    outputs: [{ name: 'subcourtIDs', type: 'uint96[]' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'onApprove',
    outputs: [{ name: 'allowed', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'jurors',
    outputs: [
      { name: 'stakedTokens', type: 'uint256' },
      { name: 'lockedTokens', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_maxDrawingTime', type: 'uint256' }],
    name: 'changeMaxDrawingTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_disputeID', type: 'uint256' }],
    name: 'getDispute',
    outputs: [
      { name: 'votesLengths', type: 'uint256[]' },
      { name: 'tokensAtStakePerJuror', type: 'uint256[]' },
      { name: 'totalFeesForJurors', type: 'uint256[]' },
      { name: 'votesInEachRound', type: 'uint256[]' },
      { name: 'repartitionsInEachRound', type: 'uint256[]' },
      { name: 'penaltiesInEachRound', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_appeal', type: 'uint256' },
    ],
    name: 'getVoteCounter',
    outputs: [
      { name: 'winningChoice', type: 'uint256' },
      { name: 'counts', type: 'uint256[]' },
      { name: 'tied', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_governor', type: 'address' }],
    name: 'changeGovernor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'MIN_JURORS',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_extraData', type: 'bytes' },
    ],
    name: 'appealCost',
    outputs: [{ name: 'cost', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'proxyPayment',
    outputs: [{ name: 'allowed', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'lockInsolventTransfers',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_extraData', type: 'bytes' }],
    name: 'arbitrationCost',
    outputs: [{ name: 'cost', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'pinakion',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: '_governor', type: 'address' },
      { name: '_pinakion', type: 'address' },
      { name: '_RNGenerator', type: 'address' },
      { name: '_minStakingTime', type: 'uint256' },
      { name: '_maxDrawingTime', type: 'uint256' },
      { name: '_hiddenVotes', type: 'bool' },
      { name: '_minStake', type: 'uint256' },
      { name: '_alpha', type: 'uint256' },
      { name: '_feeForJuror', type: 'uint256' },
      { name: '_jurorsForCourtJump', type: 'uint256' },
      { name: '_timesPerPeriod', type: 'uint256[4]' },
      { name: '_sortitionSumTreeK', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_phase', type: 'uint8', indexed: false }],
    name: 'NewPhase',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_period', type: 'uint8', indexed: false },
    ],
    name: 'NewPeriod',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_address', type: 'address', indexed: true },
      { name: '_subcourtID', type: 'uint256', indexed: false },
      { name: '_stake', type: 'uint128', indexed: false },
      { name: '_newTotalStake', type: 'uint256', indexed: false },
    ],
    name: 'StakeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_address', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_appeal', type: 'uint256', indexed: false },
      { name: '_voteID', type: 'uint256', indexed: false },
    ],
    name: 'Draw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_address', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_tokenAmount', type: 'int256', indexed: false },
      { name: '_ETHAmount', type: 'int256', indexed: false },
    ],
    name: 'TokenAndETHShift',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_arbitrable', type: 'address', indexed: true },
    ],
    name: 'DisputeCreation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_arbitrable', type: 'address', indexed: true },
    ],
    name: 'AppealPossible',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_arbitrable', type: 'address', indexed: true },
    ],
    name: 'AppealDecision',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultipleArbitrableTokenTransaction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multipleArbitrableTokenTransactionAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'arbitratorExtraData',
    outputs: [{ name: '', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'disputeIDtoTransactionID',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_ruling', type: 'uint256' },
    ],
    name: 'rule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'timeOutByReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'arbitrator',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'payArbitrationFeeByReceiver',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'payArbitrationFeeBySender',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'appeal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'transactions',
    outputs: [
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'token', type: 'address' },
      { name: 'timeoutPayment', type: 'uint256' },
      { name: 'disputeId', type: 'uint256' },
      { name: 'senderFee', type: 'uint256' },
      { name: 'receiverFee', type: 'uint256' },
      { name: 'lastInteraction', type: 'uint256' },
      { name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'getCountTransactions',
    outputs: [{ name: 'countTransactions', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_evidence', type: 'string' },
    ],
    name: 'submitEvidence',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'feeTimeout',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: '_token', type: 'address' },
      { name: '_timeoutPayment', type: 'uint256' },
      { name: '_receiver', type: 'address' },
      { name: '_metaEvidence', type: 'string' },
    ],
    name: 'createTransaction',
    outputs: [{ name: 'transactionIndex', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'executeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'timeOutBySender',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_address', type: 'address' }],
    name: 'getTransactionIDsByAddress',
    outputs: [{ name: 'transactionIDs', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_amountReimbursed', type: 'uint256' },
    ],
    name: 'reimburse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: '_arbitrator', type: 'address' },
      { name: '_arbitratorExtraData', type: 'bytes' },
      { name: '_feeTimeout', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: true },
      { name: '_amount', type: 'uint256', indexed: false },
      { name: '_party', type: 'address', indexed: false },
    ],
    name: 'Payment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: true },
      { name: '_party', type: 'uint8', indexed: false },
    ],
    name: 'HasToPayFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_ruling', type: 'uint256', indexed: false },
    ],
    name: 'Ruling',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: false },
      { name: '_sender', type: 'address', indexed: true },
      { name: '_receiver', type: 'address', indexed: true },
      { name: '_token', type: 'address', indexed: false },
      { name: '_amount', type: 'uint256', indexed: false },
    ],
    name: 'TransactionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_metaEvidenceID', type: 'uint256', indexed: true },
      { name: '_evidence', type: 'string', indexed: false },
    ],
    name: 'MetaEvidence',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_metaEvidenceID', type: 'uint256', indexed: false },
      { name: '_evidenceGroupID', type: 'uint256', indexed: false },
    ],
    name: 'Dispute',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_evidenceGroupID', type: 'uint256', indexed: true },
      { name: '_party', type: 'address', indexed: true },
      { name: '_evidence', type: 'string', indexed: false },
    ],
    name: 'Evidence',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultipleArbitrableTransaction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multipleArbitrableTransactionAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'arbitratorExtraData',
    outputs: [{ name: '', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'disputeIDtoTransactionID',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_disputeID', type: 'uint256' },
      { name: '_ruling', type: 'uint256' },
    ],
    name: 'rule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'timeOutByReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'arbitrator',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'payArbitrationFeeByReceiver',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'payArbitrationFeeBySender',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'appeal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'transactions',
    outputs: [
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'timeoutPayment', type: 'uint256' },
      { name: 'disputeId', type: 'uint256' },
      { name: 'senderFee', type: 'uint256' },
      { name: 'receiverFee', type: 'uint256' },
      { name: 'lastInteraction', type: 'uint256' },
      { name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'getCountTransactions',
    outputs: [{ name: 'countTransactions', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_evidence', type: 'string' },
    ],
    name: 'submitEvidence',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'feeTimeout',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_timeoutPayment', type: 'uint256' },
      { name: '_receiver', type: 'address' },
      { name: '_metaEvidence', type: 'string' },
    ],
    name: 'createTransaction',
    outputs: [{ name: 'transactionID', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'executeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_transactionID', type: 'uint256' }],
    name: 'timeOutBySender',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_address', type: 'address' }],
    name: 'getTransactionIDsByAddress',
    outputs: [{ name: 'transactionIDs', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_transactionID', type: 'uint256' },
      { name: '_amountReimbursed', type: 'uint256' },
    ],
    name: 'reimburse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: '_arbitrator', type: 'address' },
      { name: '_arbitratorExtraData', type: 'bytes' },
      { name: '_feeTimeout', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: true },
      { name: '_amount', type: 'uint256', indexed: false },
      { name: '_party', type: 'address', indexed: false },
    ],
    name: 'Payment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: true },
      { name: '_party', type: 'uint8', indexed: false },
    ],
    name: 'HasToPayFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_ruling', type: 'uint256', indexed: false },
    ],
    name: 'Ruling',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_transactionID', type: 'uint256', indexed: false },
      { name: '_sender', type: 'address', indexed: true },
      { name: '_receiver', type: 'address', indexed: true },
      { name: '_amount', type: 'uint256', indexed: false },
    ],
    name: 'TransactionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_metaEvidenceID', type: 'uint256', indexed: true },
      { name: '_evidence', type: 'string', indexed: false },
    ],
    name: 'MetaEvidence',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_disputeID', type: 'uint256', indexed: true },
      { name: '_metaEvidenceID', type: 'uint256', indexed: false },
      { name: '_evidenceGroupID', type: 'uint256', indexed: false },
    ],
    name: 'Dispute',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_arbitrator', type: 'address', indexed: true },
      { name: '_evidenceGroupID', type: 'uint256', indexed: true },
      { name: '_party', type: 'address', indexed: true },
      { name: '_evidence', type: 'string', indexed: false },
    ],
    name: 'Evidence',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__
 */
export const useReadKlerosLiquid = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"RNBlock"`
 */
export const useReadKlerosLiquidRnBlock = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'RNBlock',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"disputesWithoutJurors"`
 */
export const useReadKlerosLiquidDisputesWithoutJurors =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'disputesWithoutJurors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"governor"`
 */
export const useReadKlerosLiquidGovernor = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'governor',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"lastDelayedSetStake"`
 */
export const useReadKlerosLiquidLastDelayedSetStake =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'lastDelayedSetStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"disputeStatus"`
 */
export const useReadKlerosLiquidDisputeStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'disputeStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"maxDrawingTime"`
 */
export const useReadKlerosLiquidMaxDrawingTime =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'maxDrawingTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"currentRuling"`
 */
export const useReadKlerosLiquidCurrentRuling =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'currentRuling',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"courts"`
 */
export const useReadKlerosLiquidCourts = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'courts',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"ALPHA_DIVISOR"`
 */
export const useReadKlerosLiquidAlphaDivisor =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'ALPHA_DIVISOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"getSubcourt"`
 */
export const useReadKlerosLiquidGetSubcourt =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'getSubcourt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"disputes"`
 */
export const useReadKlerosLiquidDisputes = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'disputes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"RN"`
 */
export const useReadKlerosLiquidRn = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'RN',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"RNGenerator"`
 */
export const useReadKlerosLiquidRnGenerator =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'RNGenerator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"NON_PAYABLE_AMOUNT"`
 */
export const useReadKlerosLiquidNonPayableAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'NON_PAYABLE_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"getVote"`
 */
export const useReadKlerosLiquidGetVote = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'getVote',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"stakeOf"`
 */
export const useReadKlerosLiquidStakeOf = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'stakeOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"appealPeriod"`
 */
export const useReadKlerosLiquidAppealPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'appealPeriod',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"phase"`
 */
export const useReadKlerosLiquidPhase = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'phase',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"MAX_STAKE_PATHS"`
 */
export const useReadKlerosLiquidMaxStakePaths =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'MAX_STAKE_PATHS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"delayedSetStakes"`
 */
export const useReadKlerosLiquidDelayedSetStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'delayedSetStakes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"lastPhaseChange"`
 */
export const useReadKlerosLiquidLastPhaseChange =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'lastPhaseChange',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"minStakingTime"`
 */
export const useReadKlerosLiquidMinStakingTime =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'minStakingTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"nextDelayedSetStake"`
 */
export const useReadKlerosLiquidNextDelayedSetStake =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'nextDelayedSetStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"getJuror"`
 */
export const useReadKlerosLiquidGetJuror = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'getJuror',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"jurors"`
 */
export const useReadKlerosLiquidJurors = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'jurors',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"getDispute"`
 */
export const useReadKlerosLiquidGetDispute =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'getDispute',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"getVoteCounter"`
 */
export const useReadKlerosLiquidGetVoteCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'getVoteCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"MIN_JURORS"`
 */
export const useReadKlerosLiquidMinJurors = /*#__PURE__*/ createUseReadContract(
  { abi: klerosLiquidAbi, functionName: 'MIN_JURORS' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"appealCost"`
 */
export const useReadKlerosLiquidAppealCost =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'appealCost',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"lockInsolventTransfers"`
 */
export const useReadKlerosLiquidLockInsolventTransfers =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'lockInsolventTransfers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"arbitrationCost"`
 */
export const useReadKlerosLiquidArbitrationCost =
  /*#__PURE__*/ createUseReadContract({
    abi: klerosLiquidAbi,
    functionName: 'arbitrationCost',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"pinakion"`
 */
export const useReadKlerosLiquidPinakion = /*#__PURE__*/ createUseReadContract({
  abi: klerosLiquidAbi,
  functionName: 'pinakion',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__
 */
export const useWriteKlerosLiquid = /*#__PURE__*/ createUseWriteContract({
  abi: klerosLiquidAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changePinakion"`
 */
export const useWriteKlerosLiquidChangePinakion =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changePinakion',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"passPhase"`
 */
export const useWriteKlerosLiquidPassPhase =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'passPhase',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"passPeriod"`
 */
export const useWriteKlerosLiquidPassPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'passPeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"execute"`
 */
export const useWriteKlerosLiquidExecute = /*#__PURE__*/ createUseWriteContract(
  { abi: klerosLiquidAbi, functionName: 'execute' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"castVote"`
 */
export const useWriteKlerosLiquidCastVote =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'castVote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtMinStake"`
 */
export const useWriteKlerosLiquidChangeSubcourtMinStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtMinStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"appeal"`
 */
export const useWriteKlerosLiquidAppeal = /*#__PURE__*/ createUseWriteContract({
  abi: klerosLiquidAbi,
  functionName: 'appeal',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"onTransfer"`
 */
export const useWriteKlerosLiquidOnTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'onTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtTimesPerPeriod"`
 */
export const useWriteKlerosLiquidChangeSubcourtTimesPerPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtTimesPerPeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtJurorFee"`
 */
export const useWriteKlerosLiquidChangeSubcourtJurorFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtJurorFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtAlpha"`
 */
export const useWriteKlerosLiquidChangeSubcourtAlpha =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtAlpha',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"castCommit"`
 */
export const useWriteKlerosLiquidCastCommit =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'castCommit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeGovernorProposal"`
 */
export const useWriteKlerosLiquidExecuteGovernorProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'executeGovernorProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeMinStakingTime"`
 */
export const useWriteKlerosLiquidChangeMinStakingTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeMinStakingTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"setStake"`
 */
export const useWriteKlerosLiquidSetStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'setStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeRuling"`
 */
export const useWriteKlerosLiquidExecuteRuling =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'executeRuling',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeRNGenerator"`
 */
export const useWriteKlerosLiquidChangeRnGenerator =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeRNGenerator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeDelayedSetStakes"`
 */
export const useWriteKlerosLiquidExecuteDelayedSetStakes =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'executeDelayedSetStakes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtJurorsForJump"`
 */
export const useWriteKlerosLiquidChangeSubcourtJurorsForJump =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtJurorsForJump',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"createDispute"`
 */
export const useWriteKlerosLiquidCreateDispute =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'createDispute',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"drawJurors"`
 */
export const useWriteKlerosLiquidDrawJurors =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'drawJurors',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"createSubcourt"`
 */
export const useWriteKlerosLiquidCreateSubcourt =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'createSubcourt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"onApprove"`
 */
export const useWriteKlerosLiquidOnApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'onApprove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeMaxDrawingTime"`
 */
export const useWriteKlerosLiquidChangeMaxDrawingTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeMaxDrawingTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeGovernor"`
 */
export const useWriteKlerosLiquidChangeGovernor =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'changeGovernor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"proxyPayment"`
 */
export const useWriteKlerosLiquidProxyPayment =
  /*#__PURE__*/ createUseWriteContract({
    abi: klerosLiquidAbi,
    functionName: 'proxyPayment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__
 */
export const useSimulateKlerosLiquid = /*#__PURE__*/ createUseSimulateContract({
  abi: klerosLiquidAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changePinakion"`
 */
export const useSimulateKlerosLiquidChangePinakion =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changePinakion',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"passPhase"`
 */
export const useSimulateKlerosLiquidPassPhase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'passPhase',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"passPeriod"`
 */
export const useSimulateKlerosLiquidPassPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'passPeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"execute"`
 */
export const useSimulateKlerosLiquidExecute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'execute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"castVote"`
 */
export const useSimulateKlerosLiquidCastVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'castVote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtMinStake"`
 */
export const useSimulateKlerosLiquidChangeSubcourtMinStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtMinStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"appeal"`
 */
export const useSimulateKlerosLiquidAppeal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'appeal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"onTransfer"`
 */
export const useSimulateKlerosLiquidOnTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'onTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtTimesPerPeriod"`
 */
export const useSimulateKlerosLiquidChangeSubcourtTimesPerPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtTimesPerPeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtJurorFee"`
 */
export const useSimulateKlerosLiquidChangeSubcourtJurorFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtJurorFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtAlpha"`
 */
export const useSimulateKlerosLiquidChangeSubcourtAlpha =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtAlpha',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"castCommit"`
 */
export const useSimulateKlerosLiquidCastCommit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'castCommit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeGovernorProposal"`
 */
export const useSimulateKlerosLiquidExecuteGovernorProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'executeGovernorProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeMinStakingTime"`
 */
export const useSimulateKlerosLiquidChangeMinStakingTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeMinStakingTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"setStake"`
 */
export const useSimulateKlerosLiquidSetStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'setStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeRuling"`
 */
export const useSimulateKlerosLiquidExecuteRuling =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'executeRuling',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeRNGenerator"`
 */
export const useSimulateKlerosLiquidChangeRnGenerator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeRNGenerator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"executeDelayedSetStakes"`
 */
export const useSimulateKlerosLiquidExecuteDelayedSetStakes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'executeDelayedSetStakes',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeSubcourtJurorsForJump"`
 */
export const useSimulateKlerosLiquidChangeSubcourtJurorsForJump =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeSubcourtJurorsForJump',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"createDispute"`
 */
export const useSimulateKlerosLiquidCreateDispute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'createDispute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"drawJurors"`
 */
export const useSimulateKlerosLiquidDrawJurors =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'drawJurors',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"createSubcourt"`
 */
export const useSimulateKlerosLiquidCreateSubcourt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'createSubcourt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"onApprove"`
 */
export const useSimulateKlerosLiquidOnApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'onApprove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeMaxDrawingTime"`
 */
export const useSimulateKlerosLiquidChangeMaxDrawingTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeMaxDrawingTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"changeGovernor"`
 */
export const useSimulateKlerosLiquidChangeGovernor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'changeGovernor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link klerosLiquidAbi}__ and `functionName` set to `"proxyPayment"`
 */
export const useSimulateKlerosLiquidProxyPayment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: klerosLiquidAbi,
    functionName: 'proxyPayment',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__
 */
export const useWatchKlerosLiquidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: klerosLiquidAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"NewPhase"`
 */
export const useWatchKlerosLiquidNewPhaseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'NewPhase',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"NewPeriod"`
 */
export const useWatchKlerosLiquidNewPeriodEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'NewPeriod',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"StakeSet"`
 */
export const useWatchKlerosLiquidStakeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'StakeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"Draw"`
 */
export const useWatchKlerosLiquidDrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'Draw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"TokenAndETHShift"`
 */
export const useWatchKlerosLiquidTokenAndEthShiftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'TokenAndETHShift',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"DisputeCreation"`
 */
export const useWatchKlerosLiquidDisputeCreationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'DisputeCreation',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"AppealPossible"`
 */
export const useWatchKlerosLiquidAppealPossibleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'AppealPossible',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link klerosLiquidAbi}__ and `eventName` set to `"AppealDecision"`
 */
export const useWatchKlerosLiquidAppealDecisionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: klerosLiquidAbi,
    eventName: 'AppealDecision',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__
 */
export const useReadMultipleArbitrableTokenTransaction =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"arbitratorExtraData"`
 */
export const useReadMultipleArbitrableTokenTransactionArbitratorExtraData =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'arbitratorExtraData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"disputeIDtoTransactionID"`
 */
export const useReadMultipleArbitrableTokenTransactionDisputeIDtoTransactionId =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'disputeIDtoTransactionID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"arbitrator"`
 */
export const useReadMultipleArbitrableTokenTransactionArbitrator =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'arbitrator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"transactions"`
 */
export const useReadMultipleArbitrableTokenTransactionTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'transactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"getCountTransactions"`
 */
export const useReadMultipleArbitrableTokenTransactionGetCountTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'getCountTransactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"feeTimeout"`
 */
export const useReadMultipleArbitrableTokenTransactionFeeTimeout =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'feeTimeout',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"getTransactionIDsByAddress"`
 */
export const useReadMultipleArbitrableTokenTransactionGetTransactionIDsByAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'getTransactionIDsByAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__
 */
export const useWriteMultipleArbitrableTokenTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"rule"`
 */
export const useWriteMultipleArbitrableTokenTransactionRule =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'rule',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"timeOutByReceiver"`
 */
export const useWriteMultipleArbitrableTokenTransactionTimeOutByReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'timeOutByReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"payArbitrationFeeByReceiver"`
 */
export const useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'payArbitrationFeeByReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"payArbitrationFeeBySender"`
 */
export const useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeBySender =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'payArbitrationFeeBySender',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"appeal"`
 */
export const useWriteMultipleArbitrableTokenTransactionAppeal =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'appeal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"submitEvidence"`
 */
export const useWriteMultipleArbitrableTokenTransactionSubmitEvidence =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'submitEvidence',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useWriteMultipleArbitrableTokenTransactionCreateTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useWriteMultipleArbitrableTokenTransactionExecuteTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"pay"`
 */
export const useWriteMultipleArbitrableTokenTransactionPay =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'pay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"timeOutBySender"`
 */
export const useWriteMultipleArbitrableTokenTransactionTimeOutBySender =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'timeOutBySender',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"reimburse"`
 */
export const useWriteMultipleArbitrableTokenTransactionReimburse =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'reimburse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__
 */
export const useSimulateMultipleArbitrableTokenTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"rule"`
 */
export const useSimulateMultipleArbitrableTokenTransactionRule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'rule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"timeOutByReceiver"`
 */
export const useSimulateMultipleArbitrableTokenTransactionTimeOutByReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'timeOutByReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"payArbitrationFeeByReceiver"`
 */
export const useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'payArbitrationFeeByReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"payArbitrationFeeBySender"`
 */
export const useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeBySender =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'payArbitrationFeeBySender',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"appeal"`
 */
export const useSimulateMultipleArbitrableTokenTransactionAppeal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'appeal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"submitEvidence"`
 */
export const useSimulateMultipleArbitrableTokenTransactionSubmitEvidence =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'submitEvidence',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useSimulateMultipleArbitrableTokenTransactionCreateTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useSimulateMultipleArbitrableTokenTransactionExecuteTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"pay"`
 */
export const useSimulateMultipleArbitrableTokenTransactionPay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'pay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"timeOutBySender"`
 */
export const useSimulateMultipleArbitrableTokenTransactionTimeOutBySender =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'timeOutBySender',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `functionName` set to `"reimburse"`
 */
export const useSimulateMultipleArbitrableTokenTransactionReimburse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTokenTransactionAbi,
    functionName: 'reimburse',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__
 */
export const useWatchMultipleArbitrableTokenTransactionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"Payment"`
 */
export const useWatchMultipleArbitrableTokenTransactionPaymentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'Payment',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"HasToPayFee"`
 */
export const useWatchMultipleArbitrableTokenTransactionHasToPayFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'HasToPayFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"Ruling"`
 */
export const useWatchMultipleArbitrableTokenTransactionRulingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'Ruling',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"TransactionCreated"`
 */
export const useWatchMultipleArbitrableTokenTransactionTransactionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'TransactionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"MetaEvidence"`
 */
export const useWatchMultipleArbitrableTokenTransactionMetaEvidenceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'MetaEvidence',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"Dispute"`
 */
export const useWatchMultipleArbitrableTokenTransactionDisputeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'Dispute',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTokenTransactionAbi}__ and `eventName` set to `"Evidence"`
 */
export const useWatchMultipleArbitrableTokenTransactionEvidenceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTokenTransactionAbi,
    eventName: 'Evidence',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__
 */
export const useReadMultipleArbitrableTransaction =
  /*#__PURE__*/ createUseReadContract({ abi: multipleArbitrableTransactionAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"arbitratorExtraData"`
 */
export const useReadMultipleArbitrableTransactionArbitratorExtraData =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'arbitratorExtraData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"disputeIDtoTransactionID"`
 */
export const useReadMultipleArbitrableTransactionDisputeIDtoTransactionId =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'disputeIDtoTransactionID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"arbitrator"`
 */
export const useReadMultipleArbitrableTransactionArbitrator =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'arbitrator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"transactions"`
 */
export const useReadMultipleArbitrableTransactionTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'transactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"getCountTransactions"`
 */
export const useReadMultipleArbitrableTransactionGetCountTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'getCountTransactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"feeTimeout"`
 */
export const useReadMultipleArbitrableTransactionFeeTimeout =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'feeTimeout',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"getTransactionIDsByAddress"`
 */
export const useReadMultipleArbitrableTransactionGetTransactionIDsByAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'getTransactionIDsByAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__
 */
export const useWriteMultipleArbitrableTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"rule"`
 */
export const useWriteMultipleArbitrableTransactionRule =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'rule',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"timeOutByReceiver"`
 */
export const useWriteMultipleArbitrableTransactionTimeOutByReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'timeOutByReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"payArbitrationFeeByReceiver"`
 */
export const useWriteMultipleArbitrableTransactionPayArbitrationFeeByReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'payArbitrationFeeByReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"payArbitrationFeeBySender"`
 */
export const useWriteMultipleArbitrableTransactionPayArbitrationFeeBySender =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'payArbitrationFeeBySender',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"appeal"`
 */
export const useWriteMultipleArbitrableTransactionAppeal =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'appeal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"submitEvidence"`
 */
export const useWriteMultipleArbitrableTransactionSubmitEvidence =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'submitEvidence',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useWriteMultipleArbitrableTransactionCreateTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useWriteMultipleArbitrableTransactionExecuteTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"pay"`
 */
export const useWriteMultipleArbitrableTransactionPay =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'pay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"timeOutBySender"`
 */
export const useWriteMultipleArbitrableTransactionTimeOutBySender =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'timeOutBySender',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"reimburse"`
 */
export const useWriteMultipleArbitrableTransactionReimburse =
  /*#__PURE__*/ createUseWriteContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'reimburse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__
 */
export const useSimulateMultipleArbitrableTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"rule"`
 */
export const useSimulateMultipleArbitrableTransactionRule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'rule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"timeOutByReceiver"`
 */
export const useSimulateMultipleArbitrableTransactionTimeOutByReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'timeOutByReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"payArbitrationFeeByReceiver"`
 */
export const useSimulateMultipleArbitrableTransactionPayArbitrationFeeByReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'payArbitrationFeeByReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"payArbitrationFeeBySender"`
 */
export const useSimulateMultipleArbitrableTransactionPayArbitrationFeeBySender =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'payArbitrationFeeBySender',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"appeal"`
 */
export const useSimulateMultipleArbitrableTransactionAppeal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'appeal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"submitEvidence"`
 */
export const useSimulateMultipleArbitrableTransactionSubmitEvidence =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'submitEvidence',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useSimulateMultipleArbitrableTransactionCreateTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useSimulateMultipleArbitrableTransactionExecuteTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"pay"`
 */
export const useSimulateMultipleArbitrableTransactionPay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'pay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"timeOutBySender"`
 */
export const useSimulateMultipleArbitrableTransactionTimeOutBySender =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'timeOutBySender',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `functionName` set to `"reimburse"`
 */
export const useSimulateMultipleArbitrableTransactionReimburse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multipleArbitrableTransactionAbi,
    functionName: 'reimburse',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__
 */
export const useWatchMultipleArbitrableTransactionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"Payment"`
 */
export const useWatchMultipleArbitrableTransactionPaymentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'Payment',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"HasToPayFee"`
 */
export const useWatchMultipleArbitrableTransactionHasToPayFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'HasToPayFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"Ruling"`
 */
export const useWatchMultipleArbitrableTransactionRulingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'Ruling',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"TransactionCreated"`
 */
export const useWatchMultipleArbitrableTransactionTransactionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'TransactionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"MetaEvidence"`
 */
export const useWatchMultipleArbitrableTransactionMetaEvidenceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'MetaEvidence',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"Dispute"`
 */
export const useWatchMultipleArbitrableTransactionDisputeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'Dispute',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multipleArbitrableTransactionAbi}__ and `eventName` set to `"Evidence"`
 */
export const useWatchMultipleArbitrableTransactionEvidenceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multipleArbitrableTransactionAbi,
    eventName: 'Evidence',
  })
