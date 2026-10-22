# Contributing

Thanks for helping keep this list accurate and useful.

## Add a resource

Open an issue or pull request containing:

- Original title and canonical URL
- Publication/event/release date and how it was verified
- Resource type: architecture, evaluation, talk, open-source/public-source, research, or living documentation
- Two or three sentences covering the problem, mechanism, evidence boundary, and reusable takeaway
- Language and useful tags
- Any caveat: vendor-reported result, internal benchmark, agenda only, early/EAP, archived project, or unclear license

Please update both `README.md` and `resources.json`. Keep entries concise and use your own summary rather than copying source text.

## What is likely to be accepted

- First-party engineering write-ups with architecture or operational detail
- Reproducible implementations, datasets, evaluators, workshops, and reference architectures
- Papers or talks that materially advance Data Agent design or evaluation
- Corrections to dates, status, licensing, links, or over-broad claims

## What is usually out of scope

- Generic agent tutorials or vendor landing pages with no Data Agent detail
- SEO roundups and unattributed reposts
- A chat UI around one Text-to-SQL prompt with no planning, execution, verification, or governance layer
- Projects with fabricated activity, copied code, unclear provenance, or unsafe credential examples
- Star-count promotion without a technical reason for inclusion
- Curated link lists whose main contribution is pointing to other lists rather than an original technical artifact

## Writing style

- Preserve the source's original title.
- Write annotations in concise Chinese; English additions are welcome when they improve accessibility.
- State what the resource demonstrates, not that it is “best” or “leading.”
- Separate your synthesis from the source's own claim; make the evidence boundary explicit.
- Attribute internal metrics to the publisher and avoid cross-vendor leaderboard claims.
- Use `公开源码` rather than `开源` when no project-level license exists.

## Pull-request checks

- Every new link opens to the claimed primary source.
- Dates and status match the source.
- `resources.json` is valid JSON.
- The README does not imply that an agenda page is a recording or completed talk.
- License labels are specific and current.

