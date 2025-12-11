# Budgeter

This is a web app for users to manage their monthly bills and track if they've been paid.

## Tech Stack

- Django
- HTMX
- Web Awesome

## Code style

The frontend uses as little client-side javascript as possible. Whenever possible, rely on HTMX
and creating new endpoints liberally.

## Notes

- We have a custom build of Web Awesome. The ./frontend dir is just for cherrypicking WA components
  and creating a frontend build to copy into Django static dirs.
