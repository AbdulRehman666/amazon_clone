#!/usr/bin/env node
// 8x assignment — agent capture hook.
// Invoked by Claude Code as: node .claude/hooks/capture.js <prompt|stop>
// Reads the hook JSON payload from stdin, appends a PROMPT or RESPONSE
// entry to .agent-logs/<date>_<session_id>.md, and regenerates that file's
// frontmatter from a per-session state file so counts stay accurate.

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const LOG_DIR = path.join(PROJECT_ROOT, ".agent-logs");
const STATE_DIR = path.join(LOG_DIR, ".state");
const AUTHOR = process.env.CAPTURE_AUTHOR || "Ranakassavirtanen";
const TOOL = "claude-code";
const PROJECT = "amazon-clone";
const DEFAULT_MODEL = process.env.CAPTURE_MODEL || "claude-sonnet-5";

function readStdin() {
  try {
    const data = fs.readFileSync(0, "utf8");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

function ensureDirs() {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.mkdirSync(STATE_DIR, { recursive: true });
}

function statePath(sessionId) {
  return path.join(STATE_DIR, `${sessionId}.json`);
}

function loadState(sessionId) {
  const p = statePath(sessionId);
  if (fs.existsSync(p)) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  return {
    session_id: sessionId,
    author: AUTHOR,
    tool: TOOL,
    project: PROJECT,
    model: DEFAULT_MODEL,
    filename: null,
    first_prompt_time: null,
    last_prompt_time: null,
    entries: [],
  };
}

function saveState(state) {
  fs.writeFileSync(statePath(state.session_id), JSON.stringify(state, null, 2));
}

function extractModelFromTranscript(transcriptPath) {
  try {
    const lines = fs.readFileSync(transcriptPath, "utf8").trim().split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const entry = JSON.parse(lines[i]);
        const model = entry?.message?.model;
        if (model) return model;
      } catch (e) {
        /* skip malformed line */
      }
    }
  } catch (e) {
    /* transcript not readable yet */
  }
  return null;
}

function extractFinalResponseText(transcriptPath) {
  try {
    const lines = fs.readFileSync(transcriptPath, "utf8").trim().split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      let entry;
      try {
        entry = JSON.parse(lines[i]);
      } catch (e) {
        continue;
      }
      if (entry.type === "assistant" && entry.message?.content) {
        const textBlocks = entry.message.content
          .filter((b) => b.type === "text" && typeof b.text === "string")
          .map((b) => b.text.trim())
          .filter(Boolean);
        if (textBlocks.length) return textBlocks.join("\n\n");
      }
    }
  } catch (e) {
    /* transcript not readable */
  }
  return "(no final text response captured)";
}

function renderMarkdown(state) {
  const lines = [];
  lines.push("---");
  lines.push(`session_id: ${state.session_id}`);
  lines.push(`date: ${(state.first_prompt_time || new Date().toISOString()).slice(0, 10)}`);
  lines.push(`author: ${state.author}`);
  lines.push(`model: ${state.model}`);
  lines.push(`tool: ${state.tool}`);
  lines.push(`project: ${state.project}`);
  lines.push(`total_exchanges: ${state.entries.filter((e) => e.type === "PROMPT").length}`);
  lines.push(`first_prompt_time: ${state.first_prompt_time || ""}`);
  lines.push(`last_prompt_time: ${state.last_prompt_time || ""}`);
  lines.push("---");
  lines.push("");
  lines.push(`# Session Log - ${(state.first_prompt_time || "").slice(0, 10)}`);
  lines.push("");
  lines.push(`Session: \`${state.session_id}\` | Project: \`${state.project}\` | Author: \`${state.author}\``);
  lines.push("");
  lines.push("---");
  lines.push("");
  for (const e of state.entries) {
    lines.push(`[LOG_ENTRY type=${e.type} num=${e.num} session=${state.session_id}]`);
    lines.push(`timestamp: ${e.timestamp}`);
    lines.push(`model: ${e.model}`);
    lines.push("");
    lines.push(e.text);
    lines.push("");
    lines.push("");
  }
  return lines.join("\n");
}

function writeMarkdown(state) {
  if (!state.filename) {
    const dateStr = state.first_prompt_time.replace(/:/g, "-").replace("T", "_").slice(0, 19);
    state.filename = `${dateStr}_${state.session_id}.md`;
  }
  fs.writeFileSync(path.join(LOG_DIR, state.filename), renderMarkdown(state));
}

function handlePrompt() {
  const input = readStdin();
  const sessionId = input.session_id || "unknown-session";
  const prompt = input.prompt || "";
  ensureDirs();
  const state = loadState(sessionId);
  const now = new Date().toISOString();
  if (!state.first_prompt_time) state.first_prompt_time = now;
  state.last_prompt_time = now;
  const modelFromTranscript = input.transcript_path
    ? extractModelFromTranscript(input.transcript_path)
    : null;
  if (modelFromTranscript) state.model = modelFromTranscript;
  const num = state.entries.filter((e) => e.type === "PROMPT").length + 1;
  state.entries.push({ type: "PROMPT", num, timestamp: now, model: state.model, text: prompt });
  saveState(state);
  writeMarkdown(state);
}

function handleStop() {
  const input = readStdin();
  const sessionId = input.session_id || "unknown-session";
  ensureDirs();
  const state = loadState(sessionId);
  if (!state.entries.length) return; // no matching prompt captured, nothing to pair
  const lastPromptEntry = [...state.entries].reverse().find((e) => e.type === "PROMPT");
  const alreadyResponded = state.entries.some(
    (e) => e.type === "RESPONSE" && e.num === lastPromptEntry.num
  );
  if (alreadyResponded) return;
  const now = new Date().toISOString();
  const modelFromTranscript = input.transcript_path
    ? extractModelFromTranscript(input.transcript_path)
    : null;
  if (modelFromTranscript) state.model = modelFromTranscript;
  const responseText = input.transcript_path
    ? extractFinalResponseText(input.transcript_path)
    : "(no transcript_path provided)";
  state.entries.push({
    type: "RESPONSE",
    num: lastPromptEntry.num,
    timestamp: now,
    model: state.model,
    text: responseText,
  });
  saveState(state);
  writeMarkdown(state);
}

const mode = process.argv[2];
if (mode === "prompt") handlePrompt();
else if (mode === "stop") handleStop();
