export const analyticsEvents = {
  resumeDownload: "resume_download",
  projectClick: "project_click",
  githubClick: "github_click",
  contactSubmission: "contact_submission",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];
