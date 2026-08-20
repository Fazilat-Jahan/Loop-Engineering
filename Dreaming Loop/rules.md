# Execution Rules

- **RetryOnRateLimit**: On encountering `API rate limit exceeded`, retry up to 3 times with exponential backoff.
- **ValidateUserInput**: Enforce strict validation of all user inputs before processing.
- **ObsoleteEmailSummary**: Send email notifications for daily summaries. *(Obsolete: daily summaries are now logged only.)*
- **LogAllErrors**: Log all error events to the monitoring system.
