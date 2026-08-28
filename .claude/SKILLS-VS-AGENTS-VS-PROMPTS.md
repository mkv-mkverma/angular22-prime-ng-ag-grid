# Skills vs Agents vs Prompts (simple guide)

## Prompt
Just typing a message/instruction to Claude, once. Nothing is saved.

- **What it is:** a one-off ask, like "add a button here" or "explain this function."
- **When to use:** anything you'll only need once, or a quick question.
- **Downside:** if you need the same thing next month, you retype the whole thing from scratch.

## Skill
A saved, reusable "recipe" — a markdown file with step-by-step instructions that Claude
follows whenever you invoke it (by name, e.g. `/new-prime-ag-project`, or automatically
when your request matches its description).

- **What it is:** a file at `.claude/skills/<name>/SKILL.md`.
- **When to use:** a multi-step task you'll repeat — scaffolding a new project, a code
  review checklist, a deploy routine. Write it once, run it consistently every time.
- **Example in this repo:** [.claude/skills/new-prime-ag-project/SKILL.md](skills/new-prime-ag-project/SKILL.md)
  — the Angular + PrimeNG + AG Grid setup steps, saved so you don't retype them for the
  next project.

## Agent (subagent)
A separate helper Claude spins up to do a chunk of work on its own — with its own fresh
context window — and then reports back a summary.

- **What it is:** launched via the `Agent` tool, runs independently (often in the
  background), comes back with results only.
- **When to use:** work that's big, independent, or would clutter the main
  conversation — e.g. "search the whole codebase for X," "research this open-ended
  question," or running several unrelated investigations at once.
- **Downside:** it starts cold (doesn't know what's already been discussed), so it's
  wasteful for small tasks you could just do directly.

## Quick decision guide

| Situation | Use |
|---|---|
| One-off question or small edit | **Prompt** |
| Same multi-step task you'll repeat across sessions/projects | **Skill** |
| Big/independent research or search task, or several to run in parallel | **Agent** |

Rule of thumb: **prompt** = do it now, **skill** = do it the same way every time,
**agent** = hand it off so it doesn't eat your main conversation's context.
