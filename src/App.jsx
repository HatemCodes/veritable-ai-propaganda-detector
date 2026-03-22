import React, { useMemo, useState } from 'react';

const DEFAULT_TEXT = 'Targeted strikes eliminate threats hiding among civilians.';

const indicatorDefinitions = {
  emotionalManipulation: {
    label: 'Emotional Manipulation',
    description: 'Triggers feeling over fact through fear, urgency, outrage, or moral panic.'
  },
  cherryPicking: {
    label: 'Cherry-Picking',
    description: 'Highlights selective evidence while ignoring missing context or alternative facts.'
  },
  falseEquivalence: {
    label: 'False Equivalence',
    description: 'Frames unlike actors, harms, or situations as morally or logically the same.'
  },
  authorityAppeal: {
    label: 'Authority Appeal',
    description: 'Uses institutional wording, certainty, or status language to sound unquestionably legitimate.'
  },
  omissionOfContext: {
    label: 'Omission of Context',
    description: 'Leaves out background, consequences, power imbalance, or human cost.'
  }
};

const keywordRules = {
  emotionalManipulation: {
    weight: 22,
    terms: ['threat', 'threats', 'fear', 'danger', 'evil', 'crisis', 'urgent', 'terror', 'survival', 'protect', 'enemy', 'eliminate']
  },
  cherryPicking: {
    weight: 18,
    terms: ['only', 'just', 'clearly', 'obviously', 'proof', 'everyone knows', 'statistics show', 'facts show']
  },
  falseEquivalence: {
    weight: 18,
    terms: ['both sides', 'equally', 'same as', 'no different', 'just like']
  },
  authorityAppeal: {
    weight: 20,
    terms: ['official', 'experts', 'authorities', 'security sources', 'verified', 'targeted strikes', 'intelligence', 'credible']
  },
  omissionOfContext: {
    weight: 22,
    terms: ['collateral', 'necessary', 'unavoidable', 'order restored', 'neutralized', 'stability', 'precision']
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function countMatches(text, terms) {
  const lower = text.toLowerCase();
  return terms.reduce((count, term) => count + (lower.includes(term.toLowerCase()) ? 1 : 0), 0);
}

function buildExplanation(indicatorKey, score, matches) {
  const { label, description } = indicatorDefinitions[indicatorKey];
  if (matches.length === 0) {
    return `${label}: low signal detected. ${description}`;
  }
  return `${label}: moderate-to-high signal. Trigger words/phrases detected: ${matches.join(', ')}. ${description}`;
}

function analyzeText(text) {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      totalScore: 0,
      verdict: 'No input',
      summary: 'Enter text to generate a prototype propaganda analysis.',
      indicators: []
    };
  }

  const lower = cleanText.toLowerCase();
  const exclamations = (cleanText.match(/!/g) || []).length;
  const allCapsWords = (cleanText.match(/\b[A-Z]{3,}\b/g) || []).length;

  let total = 0;
  const indicators = Object.entries(keywordRules).map(([key, rule]) => {
    const matches = rule.terms.filter(term => lower.includes(term.toLowerCase()));
    let score = matches.length * Math.ceil(rule.weight / 3);

    if (key === 'emotionalManipulation') {
      score += exclamations * 4 + allCapsWords * 3;
    }

    if (key === 'omissionOfContext' && !lower.includes('because') && !lower.includes('however')) {
      score += 6;
    }

    score = clamp(score, 0, rule.weight);
    total += score;

    return {
      key,
      label: indicatorDefinitions[key].label,
      score,
      weight: rule.weight,
      matches,
      explanation: buildExplanation(key, score, matches)
    };
  });

  const totalScore = clamp(Math.round((total / 100) * 100), 0, 100);

  let verdict = 'Low propaganda risk';
  if (totalScore >= 75) verdict = 'High propaganda risk';
  else if (totalScore >= 45) verdict = 'Moderate propaganda risk';

  const strongest = [...indicators].sort((a, b) => b.score - a.score).slice(0, 2).map(i => i.label);
  const summary = strongest.length
    ? `Prototype analysis suggests the statement relies most heavily on ${strongest.join(' and ')}.`
    : 'Prototype analysis found limited manipulative signals.';

  return { totalScore, verdict, summary, indicators };
}

function ScoreBar({ value }) {
  return (
    <div className="scorebar">
      <div className="scorebar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const result = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Veritable Prototype</p>
          <h1>AI Propaganda Detection Demo</h1>
          <p className="lede">
            A prototype web app inspired by the Veritable course project: it analyzes text for five propaganda
            indicators and returns a transparent Propaganda Likelihood Score.
          </p>
        </div>
      </header>

      <main className="grid">
        <section className="card input-card">
          <h2>Analyze a statement</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a headline, quote, or political statement..."
            rows={8}
          />

          <div className="button-row">
            <button onClick={() => setText(DEFAULT_TEXT)}>Load sample</button>
            <button className="secondary" onClick={() => setText('')}>Clear</button>
          </div>

          <div className="samples">
            <p>Try these examples:</p>
            <ul>
              <li onClick={() => setText('Targeted strikes eliminate threats hiding among civilians.')}>Targeted strikes eliminate threats hiding among civilians.</li>
              <li onClick={() => setText('Both sides are equally guilty, and authorities have confirmed that order must be restored.')}>Both sides are equally guilty, and authorities have confirmed that order must be restored.</li>
              <li onClick={() => setText('Experts say this is the only way to protect our future from dangerous outsiders!')}>Experts say this is the only way to protect our future from dangerous outsiders!</li>
            </ul>
          </div>
        </section>

        <section className="card results-card">
          <h2>Analysis results</h2>
          <div className="score-pill">{result.totalScore}/100</div>
          <p className="verdict">{result.verdict}</p>
          <ScoreBar value={result.totalScore} />
          <p className="summary">{result.summary}</p>

          <div className="indicator-list">
            {result.indicators.map((indicator) => (
              <article key={indicator.key} className="indicator-item">
                <div className="indicator-topline">
                  <strong>{indicator.label}</strong>
                  <span>{indicator.score}/{indicator.weight}</span>
                </div>
                <ScoreBar value={(indicator.score / indicator.weight) * 100} />
                <p>{indicator.explanation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card architecture-card">
          <h2>4-layer concept architecture</h2>
          <ol>
            <li><strong>Input & Preprocessing:</strong> normalize text, tokenize, remove noise.</li>
            <li><strong>AI Analysis Layer:</strong> detect emotion, exaggeration, vague sourcing, and framing patterns.</li>
            <li><strong>Backend Framework:</strong> store results, run analysis services, support APIs.</li>
            <li><strong>Visualization Layer:</strong> show scores, indicators, and human-readable explanations.</li>
          </ol>
        </section>

        <section className="card notes-card">
          <h2>Important note</h2>
          <p>
            This is a rules-based prototype for portfolio purposes. It does not determine truth and should not be used
            for censorship or moderation decisions. It is meant to demonstrate explainable interface design around the
            Veritable idea.
          </p>
        </section>
      </main>
    </div>
  );
}
