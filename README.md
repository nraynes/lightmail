# Lightmail

Lightmail is a open email provider application. Currently under development, 
Lightmail designed to be a fully featured email application with a robust set of features 
like mailbox rules, advanced filtering, blacklisting, creating multiple unlimited 
mailboxes with their own address that you can send or receive mail from, etc.

## Installation

Clone the repository to your desired location, then cd into it in your terminal and run the following commands.

    bash init.sh

This will set up all the necessary dependencies and git hooks for the monorepo as well as all subprojects.

## Commits

The Conventional Commits standard is enforced via commitlint in the monorepo, so that all sub-projects follow the same commit standard. Semantic versioning for each project is handled separately by a package specific to that project. All sub-projects use Conventional Commits for semantic versioning.
