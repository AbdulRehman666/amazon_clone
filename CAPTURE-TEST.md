# Capture Test

## Tool and model

- **Tool:** Claude Code (Claude Agent SDK), running in the Claude desktop app's Code tab.
- **Model:** `claude-sonnet-5` (Sonnet 5) — same model plans and executes; no separate
  planner/executor split in this setup.

## Mechanism

Claude Code supports lifecycle hooks configured in `.claude/settings.json`, which the
harness (not the model) executes on its own:

- `UserPromptSubmit` — fires synchronously the moment a prompt is submitted, receiving
  the prompt text on stdin as JSON.
- `Stop` — fires at the end of every turn, receiving a path to the session's JSONL
  transcript on stdin.

Config changed: [`.claude/settings.json`](.claude/settings.json), wiring both events to
[`.claude/hooks/capture.js`](.claude/hooks/capture.js).

`capture.js`:
- On `UserPromptSubmit`, appends a `PROMPT` entry with the verbatim prompt text to a
  per-session state file, then regenerates that session's Markdown log in `.agent-logs/`.
- On `Stop`, parses the transcript JSONL, finds the last `assistant` message, extracts
  only its `text` content blocks (skipping tool calls, tool results, and thinking
  blocks), and appends that as the paired `RESPONSE` entry.
- State lives in `.agent-logs/.state/<session_id>.json` (gitignored) so frontmatter
  counts (`total_exchanges`, timestamps) stay accurate across multiple hook invocations
  without re-parsing the whole log each time.

## Log file path

`.agent-logs/2026-09-22_09-53-24_0e9e64ba-c14c-417c-baec-dfbafdacfa7c.md` — the canary
sent from a second, independent Claude Code session.

(The first canary, sent in the original session that built this hook, landed in
`.agent-logs/2026-09-22_09-47-58_a9b31e95-4012-4823-b354-4b22d3996baf.md`.)

## Canary entries (raw)

**Session 1** (`a9b31e95-4012-4823-b354-4b22d3996baf`):

```
[LOG_ENTRY type=PROMPT num=1 session=a9b31e95-4012-4823-b354-4b22d3996baf]
timestamp: 2026-09-22T09:47:58.268Z
model: claude-sonnet-5

CAPTURE TEST — 8x assignment, Ranakassavirtanen


[LOG_ENTRY type=RESPONSE num=1 session=a9b31e95-4012-4823-b354-4b22d3996baf]
timestamp: 2026-09-22T09:48:09.295Z
model: claude-sonnet-5

The prompt captured correctly. The `RESPONSE` entry gets appended by the `Stop` hook right when this turn ends, so I can't see it until you send me another message — please send anything (even "ok") so I can verify the response landed, then we'll do the second-session test.
```

**Session 2** (`0e9e64ba-c14c-417c-baec-dfbafdacfa7c`, a genuinely separate Claude Code
session):

```
[LOG_ENTRY type=PROMPT num=1 session=0e9e64ba-c14c-417c-baec-dfbafdacfa7c]
timestamp: 2026-09-22T09:53:24.344Z
model: claude-sonnet-5

CAPTURE TEST — 8x assignment, Ranakassavirtanen — session 2


[LOG_ENTRY type=RESPONSE num=1 session=0e9e64ba-c14c-417c-baec-dfbafdacfa7c]
timestamp: 2026-09-22T09:53:28.095Z
model: claude-sonnet-5

The working directory is now `C:\Projects\amazon-clone`. Let me know what you'd like to do here.
```

## What did not work first

- The first two attempts at a "second session" test actually re-sent the canary text
  into the *original* session's chat (as a normal message), not a new session — so it
  landed in `a9b31e95-...`'s log as additional prompt/response pairs instead of creating
  a second file. Fixed by explicitly opening a new session in the app.
- The first real second session was still rooted at `C:\Quiz` (a leftover, unrelated
  project directory from before this repo existed), not `C:\Projects\amazon-clone` — so
  it had no `.claude/settings.json` and the hook never fired
  (`.agent-logs/2026-09-22_09-52-21_bb3ba341-...md` shows prompts with no paired
  responses and `model: <synthetic>`, i.e. a session that never picked up this project's
  hooks at all). Confirmed via `pwd` + reading `.claude/settings.json` from inside that
  session, which showed `C:\Quiz` and no `settings.json` there. Fixed by redirecting
  that session's working directory to `C:\Projects\amazon-clone` before resending the
  canary — the retry (`0e9e64ba-...`) worked immediately with no code changes.
