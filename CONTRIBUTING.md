# Contributing

Thanks for helping keep this list accurate and useful.

中文和英文都欢迎。推荐资料或报告错误可以直接提交 Issue，不需要先修改 JSON。

## Choose a contribution path

- **Suggest a resource:** use the [resource suggestion form](https://github.com/Pyramiding/awesome-data-agents/issues/new?template=resource.yml). An issue needs source evidence and a short explanation, not a repository edit.
- **Correct an entry:** use the [correction form](https://github.com/Pyramiding/awesome-data-agents/issues/new?template=correction.yml) for a broken link, incorrect date, changed license, archive status, or overstated claim.
- **Submit a ready edit:** open a pull request using the checks below. Small, focused corrections are welcome.

Before adding a resource, search `README.md`, `resources.json`, and existing issues for its title or canonical URL. A new version of an existing project normally updates the same resource ID rather than creating another project entry. See [METHODOLOGY.md](METHODOLOGY.md).

## Add a resource

Open an issue or pull request containing:

- Original title and canonical URL
- Publication/event/release date and how it was verified
- Resource type: architecture, evaluation, talk, open-source/public-source, research, or living documentation
- Two or three sentences covering the problem, mechanism, evidence boundary, and reusable takeaway
- Language and useful tags
- Any caveat: vendor-reported result, internal benchmark, agenda only, early/EAP, archived project, or unclear license

For pull requests that add or change resource records, update both `README.md` and `resources.json` where applicable. Pure navigation or wording fixes do not need unrelated JSON changes. Keep entries concise and use your own summary rather than copying source text.

For new machine-readable entries, include `summary`, `date_evidence`, and `evidence_url`. For implementations, also specify the component type, license, technical documentation, and maintenance status. Update `PROJECT_GUIDE.md` when a project adds a useful implementation path.

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

## Validate a pull request locally

From the repository root, run the dependency-free structural and unit checks with Node.js 22+:

```sh
npm run check
npm test
```

These checks validate required fields, unique IDs and canonical URLs, allowed facets, real calendar dates, nested evidence URLs, paired license/date sources, release timestamps, refresh-history references and totals, README counts and cutoff, and local site assets. Negative fixtures verify that malformed data is rejected. They do not verify remote availability, source accuracy, actual licenses of dependencies, or production readiness.

For a source review, record `last_verified` only for checks actually performed. Use `verification_scope` to distinguish release, license and documentation review from running the project. Pin sources to a commit when possible, keep release and documentation revisions separate, and label beta releases using the publisher’s wording even if an API marks them otherwise.

When adding or removing records, keep README totals and section counts consistent with `resources.json`. Do not advance the snapshot date for a navigation-only change. For substantive resource refreshes, follow the incremental review rules in [METHODOLOGY.md](METHODOLOGY.md) and record the changes in [UPDATES.md](UPDATES.md).

The [web browser](https://pyramiding.github.io/awesome-data-agents/) reads this same index and reuses existing README annotations. For changes to the site or its data handling, also install locked development dependencies with `npm ci`, install Chromium with `npx playwright install chromium`, then run `npm run test:browser`. See [WEB.md](WEB.md) for preview and publishing details. GitHub Actions runs structural, unit and desktop/mobile Chromium checks on pushes and pull requests.

## Contribution license

By submitting original content for inclusion in this repository, you agree to make that contribution available under [CC BY 4.0](LICENSE), to the extent you hold the relevant copyright and similar rights. You retain ownership of your contribution.

Submit only material you created or have sufficient permission to contribute under these terms. Clearly identify any third-party material and preserve its attribution and license notices. Linking to a resource does not relicense it, and public availability alone does not grant permission to copy it. See the [repository license scope](README.md#许可--license).
