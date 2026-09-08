# MentorMe chatbot knowledge audit

Version: 2026-09-03.3. 75 entries, 31 categories. The earlier 69 topics remain; this product update adds six dedicated topics. Questions and keywords are aliases; related_topics are actual text messages sent through the same engine. PublicRoute validates every action.

## Source inspection and authority

All current public route components and their content-bearing dependencies were reviewed: PublicSite; HomeJourneySections, LearningHero, CareerTransformation and LiveCommunity; all Career Tracks components; PricingData/PricingCard/FAQ; About data and story/overview/progress/team sections; Contact data/hero/form; Roadmap data/hero/checkpoints; Leaderboard data/experience; and the existing Sign Up/Sign In views.

The owner-approved [product update](product_updates.md) supplements public-page content for the course completion certificate, startup internship eligibility, staged mentor sessions and later live interview preparation. It is the authority for these new chatbot facts. It supplies no new price, plan entitlement, exact mentor/interview unlock level or personal account status.

Source priority is based on what the content governs:
- PricingData plus its rendered PricingCard govern prices, inclusions, exclusions and access duration.
- The featured Career Tracks cards govern the offered skill previews; planned directions come from CareerTracksAndCTA.
- Dedicated roadmapData governs checkpoint descriptions.
- About and Contact data govern team, mission, published channels and usual response times.
- Decorative hero copy, dashboard examples and generated leaderboard data do not establish additional live products, assignments or account facts.

Every knowledge entry has source paths. Tests check that those files exist and that suggested questions resolve. Developer provenance stays here; visitors receive concise answers.

## Confirmed facts and careful wording

| Area | Grounded answer |
| --- | --- |
| Free | ₹0, no card; direction, starter roadmap, foundation missions, basic assessment, progress tracking. No portfolio projects or all-90-level access. |
| Pro | From ₹2,000 per course, six months access, price varies by career track. All 90 guided levels, missions/assessments, 12+ projects, nine certificates and portfolio proof. Mentor/interview unlock availability depends on course and progress; no immediate access or new plan-specific entitlement is promised. |
| Career Accelerator | Coming soon; planned mentor groups, résumé/LinkedIn support, mock interviews, portfolio review and internship readiness. No published price or launch date. |
| Enterprise | Custom pricing, learner cohorts, dashboards/reporting and support. Team confirms rollout of the listed Career Accelerator access. |
| Tracks | Frontend available; Backend has a published preview and availability is confirmed with the team; UI/UX coming soon; Data Analyst planned. |
| AI and other names | No dedicated AI track is confirmed. Extra names in generated leaderboard rows or a navigation notice do not establish an offered catalog track. |
| Projects | Frontend shows a responsive dashboard example; Backend shows an API milestone; UI/UX shows a product case-study example. These are examples, not a promised assignment list. Exact track project assignments are not published. |
| Roadmap | 90 levels, 12+ projects and nine certificates; checkpoint data describes project, portfolio, assessment and career-toolkit stages. |
| Certificates | Nine Pro milestone certificates during the journey; a distinct Course Completion Certificate after successful full-course completion. Existing roadmap examples remain Level 15 (Foundation) and Level 30 (Practical skills). Do not invent an overall total or external accreditation. |
| Jobs/internships | Full course completion plus required milestones gives eligibility for MentorMe-supported startup internship opportunities. Availability and selection depend on requirements; no placement, internship selection, salary or employment guarantee. |
| Staged support | Mentor sessions unlock at appropriate stages; live interview preparation can unlock later toward career readiness. Sign Up / Sign In shows the personal journey; public chat cannot inspect it. |
| Account progress | Public FAQ says completed progress/milestones survive plan changes/cancellation, with paid content dependent on active access. The assistant cannot inspect an account. |
| Contact | Footer lists hello@mentorme.in, +91 98765 43210, Hyderabad, Telangana. Contact hero says usually 1–2 business days. No actual delivery or booking is implemented by this chatbot. |

## Conflicting source details

The Home/featured-track copy mentions five free levels, while the roadmap describes a ten-level free checkpoint. Pricing is the authority for plan entitlement and only promises foundation access. Visitor answers use that confirmed entitlement and offer to confirm exact starter levels. They do not display the internal discrepancy as product copy.

Backend is marked coming soon in FeaturedTrack and available in CareerTracksAndCTA. The chatbot describes its catalog preview and offers confirmation of current enrolment, without asserting immediate access or exposing internal implementation differences.

Enterprise lists Career Accelerator access while the individual plan is coming soon. The answer includes the package scope and asks the team to confirm cohort rollout details.

The public leaderboard/community use illustrative data. They support explanation of XP, streaks and badges, but not live numbers, personal ranks, completion state or additional catalog offerings.

## Maintenance

Keep short answers to a few sentences and up to four supporting bullets. Use detailed_answer/detail_bullets for deeper follow-ups. Every suggested label must resolve both as typed input and through the contextual engine; do not silently truncate important options.

Add source-backed aliases rather than weakening routing thresholds to fit unrelated words. For a new policy or track, update the source-backed entry and a meaningful regression test. Do not infer prices from billing-toggle captions or infer curricula from decorative code/hero examples.

## Product-update routing

New IDs: course_completion_certificate, course_completion, mentor_sessions, interview_preparation, career_readiness, journey_unlocks. Existing certificates, certificate_milestones and internships are enriched. General mentor/mock-interview aliases now reach the new staged-support topics; named Career Accelerator questions retain that plan. Certificates is a ninth initial choice. Contextual unlock questions stay with the current certificate/mentor/interview topic, while personal timing/status questions use the account routes.
