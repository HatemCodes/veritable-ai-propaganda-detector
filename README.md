# Veritable: AI Propaganda Detection System

## 🚀 Live Demo

👉 https://hatemcodes.github.io/veritable-ai-propaganda-detector/

---

## 🧠 Overview

**Veritable** is a full-stack prototype designed to detect propaganda-style patterns in political and news language.

Originally developed as a University of Calgary team concept, this project was independently extended into a **working web application with both frontend and backend components**, capable of analyzing text and generating an explainable **Propaganda Likelihood Score (0–100)**.

The system focuses not just on detection, but on **interpretability** — helping users understand *why* a statement may be misleading.

---

## ⚙️ Key Features

* 🔍 **Multi-indicator analysis**

  * Emotional manipulation
  * Cherry-picking
  * False equivalence
  * Authority appeal
  * Omission of context

* 📊 **Propaganda Likelihood Score (0–100)**
  Quantifies how strongly propaganda patterns are detected

* 🧾 **Explainable output**
  Identifies which linguistic triggers influenced the score

* 🌐 **Full-stack architecture**
  Frontend interface + backend API for analysis

---

## 🏗️ System Architecture

The system follows a simplified 4-layer architecture:

1. **Preprocessing Layer**
   Text normalization and tokenization

2. **Analysis Layer (NLP Logic)**
   Rule-based detection of propaganda patterns

3. **Backend Layer (Flask API)**
   Handles analysis requests and returns structured results

4. **Frontend Layer (React UI)**
   Displays scores and explanations interactively

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6)
* CSS

### Backend

* Python
* Flask
* Flask-CORS

---

## 📁 Project Structure

```
veritable-ai-propaganda-detector/
│
├── src/                # Frontend (React)
├── backend/            # Flask API
│   ├── app.py
│   └── requirements.txt
│
├── index.html
├── package.json
└── README.md
```

---

## 🧪 Example

**Input:**

> "Experts say this is the only way to save the country."

**Output:**

* Authority appeal detected
* Emotional framing detected
* Score: 65/100

---

## ▶️ Running Locally

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 📈 Future Improvements

* Integrate real NLP models (spaCy / transformers)
* Connect frontend to backend API
* Expand detection logic with ML
* Deploy backend service publicly
* Add dataset-driven evaluation

---

## 🤝 Acknowledgements

This project is based on a team concept developed at the University of Calgary.
This repository represents an **independent full-stack prototype implementation** expanding that concept.

---

## 👤 Author

**Hatem Chehade**
Computer Science Student @ University of Calgary

## 📸 Demo

<img width="747" height="354" alt="{E030287C-9821-40AC-A38B-0229287DC1EE}" src="https://github.com/user-attachments/assets/1b59cbec-519d-4660-a6d7-e1c4a78e22c9" />

