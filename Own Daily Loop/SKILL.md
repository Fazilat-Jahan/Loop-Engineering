# Documentation Freshness Inspection Skill

This skill inspects `docs/README.md` to determine if the documentation is up‑to‑date. It looks for a line starting with `Last updated:` and checks whether that date is within the last 30 days. The result is written to `output/docs-report.md`.
