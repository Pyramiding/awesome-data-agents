# Curatorial methodology

## Snapshot

- Snapshot date: **2026-11-05 (Asia/Shanghai)**
- Latest incremental review: **2026-11-03–2026-11-05**, after the 2026-11-02 snapshot
- Scope: Data Agents for analytics, data science, data engineering, data management, and data governance
- Default evidence: the author, project, vendor, paper, or conference's own page
- Working language: Chinese annotations with original-language titles and links

This is a curated snapshot, not an exhaustive crawl and not a ranking. The goal is to make each link useful to someone designing or evaluating a Data Agent in production.

## Inclusion rules

A resource must satisfy all of the following:

1. It exposes a concrete architecture, implementation, evaluation method, benchmark, talk outline, or reproducible artifact.
2. Its publication, formal appearance, repository creation, or material 2026 update can be verified.
3. It relates directly to agents that discover, understand, transform, query, analyze, visualize, govern, or act on data.
4. A primary source is available, except for a small number of clearly labeled event recaps whose details are not available on the original site.

We normally exclude generic AI-agent explainers, SEO roundups, undated product pages, pure Text-to-SQL demos with no agent loop, and announcements that contain no technical or operational detail.

## Date policy

The `date` field in `resources.json` is interpreted together with `date_basis`:

- `published`: the page or paper's stated publication date.
- `event`: the conference or talk date; it does not prove that a recording or deck is public.
- `updated`: the date of a material documentation or project update.
- `repo_created`: GitHub repository creation time, used only when no clearer release date exists.
- `released`: a release or public launch date.

Month-only dates use `YYYY-MM`. Event ranges use `YYYY-MM-DD/YYYY-MM-DD`.

## Status policy

- `published`: the linked article, paper, video, deck, code, or benchmark is public.
- `living-doc`: product or architecture documentation that can change after the snapshot date.
- `agenda`: an official session outline is public, but a readable completed talk, deck, or recording has not been verified. The event may already have taken place; elapsed time or a generic deck portal does not upgrade the status.
- `active-project`: an older project with a material 2026 release or update.
- `early`: public but explicitly experimental, EAP, or otherwise not presented as production-ready.
- `archived`: a read-only, archived implementation retained for architectural study; it is not counted or recommended as actively maintained.

Implementation entries distinguish complete agents, agent frameworks, tool servers, Skills, semantic layers, workspaces, and evaluation harnesses. A useful component is not automatically a complete Data Agent.

## Machine-readable fields and counting

`resources.json` schema 1.1 retains the original required fields and adds optional evidence and reading fields. Newly researched entries include `summary`, `date_evidence`, and `evidence_url`. Project entries also record `license`, `license_url`, `component_type`, `technical_material_url`, and practical usage notes when available. These fields support verification; release dates do not by themselves prove that a project is production-ready.

The headline total counts resource records, not companies, websites, or unique products. An engineering article, implementation, and separately maintained tutorial for the same project can be distinct records. Supporting release, license, and documentation links inside a project record do not increase the count. The open-source/public-source section count includes explicitly marked archived cases; active and archived status remain separate.

## Incremental refreshes

- [UPDATES.md](UPDATES.md) records each review window, genuinely added records, material changes to existing records, and unresolved material-access checks. A refresh is a curated search, not a claim of exhaustive coverage.
- The latest review uses original publication dates, dated release notes, or specific material documentation updates after the previous cutoff. Search-engine crawl dates, newly discovered old pages, cosmetic edits, and ordinary repository pushes are not treated as new releases.
- A new version of an existing implementation updates the same resource ID and does not increase the project count. Release notes and the previous snapshot preserve the historical context.
- Optional `added_on`, `last_verified`, `related_materials`, and `material_review` fields preserve discovery and access-check history separately from the source's `date`. The top-level `refresh_history` records added, materially updated, and corrected IDs separately; agenda reviews are listed only when performed in that review.
- A localized document can materially differ from its other language versions. On November 2, the DataWorks Chinese page was dated October 29 while the English page still showed October 9. The November 5 review found the English page now dated October 29 and containing the eight-layer architecture. This corrects the language-version state without counting the older material as a new November publication.
- Release dates follow the source's UTC `published_at` date, with the full timestamp retained. For example, Altimate Code v0.12.9 was published at 2026-11-04T23:16:13Z, already November 5 in Asia/Shanghai. A changelog heading is recorded separately when it differs from the public release timestamp.
- A public conference recap can be a published resource without its full slides or video being open. Such entries explicitly identify the available material and any request/QR gate.

## Evidence and claims

- Performance and adoption figures from vendor or project posts are summarized as publisher claims, not independent comparisons.
- Internal benchmarks are not compared across organizations because tasks, data, models, prompts, and graders differ.
- Paper numbers follow the cited version. If an arXiv paper changed materially, the README calls out the preferred version.
- Repository license checks refer to each entry's `last_verified` date when present; advancing the collection cutoff does not imply that every old license was rechecked. “Public source” is used when a repository has no project-level license; this does not grant reuse rights.
- A GitHub repository's creation date is not treated as the project's release date unless the project gives no stronger signal.

## Taxonomy

Each resource has one primary `section`:

- `architecture`: production architecture, implementation, or engineering practice
- `evaluation`: evaluation infrastructure, benchmark methodology, or observability
- `talk`: conference talk, video, or public deck
- `open-source`: open-source or public-source implementation
- `research`: paper or academic benchmark
- `living-doc`: continuously updated product or reference architecture documentation

Tags provide a second axis such as `semantic-layer`, `context`, `mcp`, `multi-agent`, `sandbox`, `governance`, `memory`, `benchmark`, or `text-to-sql`.

## Editorial lens and independence

Every annotation is edited around four questions:

1. **Problem:** What concrete data task or production constraint is addressed?
2. **Mechanism:** Which context, planning, execution, verification, or governance mechanism does the resource expose?
3. **Evidence boundary:** Is the evidence a reproducible artifact, a paper result, an internal benchmark, a vendor claim, or only an event outline?
4. **Transferability:** What can another team reuse, and what still depends on proprietary data, infrastructure, or organizational process?

This repository is independently edited and is not affiliated with the linked organizations. Inclusion means the resource contributes a useful technical signal; it is not an endorsement, ranking, or claim that results are comparable across organizations.

## Maintenance checklist

When refreshing the list:

1. Re-open the original source and confirm the URL, date, and status.
2. Prefer the canonical URL and remove tracking parameters.
3. Check whether an agenda item now has a deck, recording, or transcript.
4. Re-check repository archive state and license.
5. Update the cutoff in `README.md`, this file, and `resources.json` together.
6. Run `python3 -m json.tool resources.json >/dev/null` and a link checker before merging.

