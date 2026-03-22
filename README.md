# Veritable: AI Propaganda Detection System

A portfolio prototype inspired by a University of Calgary team presentation project. This repository turns the original system concept into a small working web demo that analyzes a statement for five propaganda indicators and returns a transparent **Propaganda Likelihood Score (0-100)**.

## Project Background

The original Veritable concept focused on detecting propaganda patterns in news and political language through five major indicators:

- Emotional Manipulation
- Cherry-Picking
- False Equivalence
- Authority Appeal
- Omission of Context

The presentation also proposed a 4-layer architecture:

1. Input & Preprocessing
2. AI Analysis Layer
3. Backend Framework
4. Visualization Layer

This repository is **not** the original course submission codebase. It is a portfolio prototype I built afterward to demonstrate how the Veritable concept could be represented as a simple interactive web application.

## Features

- Paste in a sentence, claim, or headline
- Receive a prototype propaganda score from 0-100
- View breakdowns across five propaganda indicators
- Read human-readable explanations for triggered signals
- Explore the project architecture in a lightweight UI

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## How It Works

This prototype uses a transparent **rules-based heuristic engine** rather than a trained ML model.

It looks for linguistic patterns associated with:

- emotional urgency
- selective framing
- vague authority language
- flattening of moral differences
- missing context

The result is intended for **explainability and demonstration**, not factual adjudication.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Future Improvements

- Replace keyword heuristics with a trained NLP classifier
- Add confidence intervals and calibration testing
- Support article-length input instead of short statements
- Add dataset documentation and annotation guidelines
- Build a backend API with persistent analysis history

## Disclaimer

This tool does **not** determine objective truth and should not be used for censorship, moderation enforcement, or legal decisions. It is a student portfolio prototype for demonstrating explainable system design.
