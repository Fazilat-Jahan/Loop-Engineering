export const meta = {
  name: 'parallel-maker-checker',
  description: 'Process three coding issues in parallel with isolated worktrees and independent verification',
  phases: [
    { title: 'Draft', detail: 'Makers draft fixes in parallel worktrees' },
    { title: 'Review', detail: 'Checkers verify each fix independently' },
  ],
}

// Schema for checker verdict
const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    result: {
      type: 'string',
      enum: ['PASS', 'FAIL'],
      description: 'Whether the fix passes all relevant tests'
    },
    summary: {
      type: 'string',
      description: 'Brief summary of verification outcome'
    },
    testOutput: {
      type: 'string',
      description: 'Relevant test execution output'
    },
    issuesFound: {
      type: 'array',
      items: { type: 'string' },
      description: 'Specific issues found (empty if PASS)'
    }
  },
  required: ['result', 'summary', 'testOutput', 'issuesFound']
}

// Three independent coding issues
const ISSUES = [
  {
    id: 'bug-1',
    title: 'Fix off-by-one error in getLastElement',
    description: 'The getLastElement function in utils.js returns undefined instead of the last element. It uses arr[arr.length] instead of arr[arr.length - 1].',
    targetFunction: 'getLastElement',
    testCommand: 'npm test'
  },
  {
    id: 'bug-2',
    title: 'Add null check to getUserEmail',
    description: 'The getUserEmail function in utils.js crashes when given null/undefined or when user.email is missing. Add proper null/undefined checks and handle missing email property.',
    targetFunction: 'getUserEmail',
    testCommand: 'npm test'
  },
  {
    id: 'bug-3',
    title: 'Fix average calculation in calculateAverage',
    description: 'The calculateAverage function in utils.js divides by (numbers.length + 1) instead of numbers.length, giving incorrect results.',
    targetFunction: 'calculateAverage',
    testCommand: 'npm test'
  }
]

log(`Starting parallel maker-checker workflow for ${ISSUES.length} issues`)

// Process all three issues in parallel through draft and review stages
const results = await pipeline(
  ISSUES,

  // Stage 1: Draft - Maker implements the fix in an isolated worktree
  async (issue) => {
    const makerPrompt = `You are the MAKER for: ${issue.title}

Issue Details:
${issue.description}

Your responsibilities:
1. Enter a new git worktree for isolated work (name it "${issue.id}")
2. Read utils.js to understand the current implementation
3. Fix ONLY the ${issue.targetFunction} function
4. Commit your changes with a clear message
5. DO NOT run tests - the checker will do that
6. Return a brief summary of what you fixed

Focus solely on implementing the fix. The checker will verify it independently.`

    const makerResult = await agent(makerPrompt, {
      label: `maker:${issue.id}`,
      phase: 'Draft',
      isolation: 'worktree'
    })

    return { issue, makerResult }
  },

  // Stage 2: Review - Checker verifies the fix by running tests
  async ({ issue, makerResult }) => {
    const checkerPrompt = `You are the CHECKER for: ${issue.title}

What was supposed to be fixed:
${issue.description}

The maker reported:
${makerResult}

Your responsibilities:
1. Find and enter the worktree created for "${issue.id}"
2. Read the actual code changes in utils.js
3. Run the test command: ${issue.testCommand}
4. Analyze the test output specifically for ${issue.targetFunction}
5. Return a structured PASS/FAIL verdict

Verification criteria:
- PASS: Tests related to ${issue.targetFunction} now pass
- FAIL: Tests still fail OR the fix is incorrect/incomplete

DO NOT modify any code. Your job is verification only.`

    const verdict = await agent(checkerPrompt, {
      label: `checker:${issue.id}`,
      phase: 'Review',
      schema: VERDICT_SCHEMA
    })

    return {
      issueId: issue.id,
      title: issue.title,
      verdict: verdict || { result: 'FAIL', summary: 'Checker did not return verdict', testOutput: '', issuesFound: ['Verification agent failed'] }
    }
  }
)

// Compile final report
const passCount = results.filter(r => r && r.verdict.result === 'PASS').length
const failCount = results.filter(r => r && r.verdict.result === 'FAIL').length

log(`Workflow complete: ${passCount} PASS, ${failCount} FAIL`)

return {
  summary: {
    total: ISSUES.length,
    passed: passCount,
    failed: failCount
  },
  results: results.filter(Boolean)
}
