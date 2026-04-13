# AeroFlow: Anti-Gravity Stadium Logistics Overview

A Project designed to reimagine large-scale stadium logistics using anti-gravity and levitation transport technology. Rather than traditional walking paths and staircases, **AeroFlow** simulates how a central orchestration grid might manage floating attendees and anti-gravity "Grav-Lifts" to seamlessly solve human congestion dynamically.

![Cloud Run Deployment](https://img.shields.io/badge/Deployed_on-Google_Cloud_Run-blue?logo=googlecloud&logoColor=white) 

---

## 🔗 Live Demo
The application is containerized and live at:
**[AeroFlow Live App 🌍](https://aeroflow-402900939650.us-central1.run.app)**

## 🚀 Features

1. **Intelligent Grav-Map Dashboard**
   A dynamic SVG-based network monitoring tool representing the "anti-gravity nodes". It actively tracks and illustrates congestion constraints across vertical levels (Lower Bowl, Sky-Lounges).
2. **Predictive Attendee Pass**
   Simulates passenger transit queues rendering their optimal hover-tube pathways depending on real-time crowd metrics.
3. **Lift Synchronization Monitor**
   Dashboard metrics updating lift status constraints directly.
4. **Premium Aesthetics**
   Constructed with deep-space glassmorphism and modern `<lucide-icons>`, focusing on visual excellence using exclusively Vanilla capabilities.

## 🛠 Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3, & ES6 JavaScript. No heavy frontend frameworks included to prioritize performance.
- **Micro-Animations**: Pure CSS properties leveraging custom Keyframes, bezier curves, and SVG stroke manipulation.
- **Deployment & Cloud**:
  - `Docker` using lightweight `nginx:alpine`.
  - Google Cloud Run (Containerized Serverless).

## 💻 Local Development

Because the project relies on native Vanilla standards with zero build-step bloat, you don't even need Node.js!

1. Clone this repository: `git clone <repo-url>`
2. Simply double-click on `index.html` within your finder/file explorer.
3. Or for a local port: `npx serve .` / `python3 -m http.server 8000`

## ☁️ Deployment Scripts

This repository contains automated pipelines to deploy easily to GCP.
1. Authenticate with `gcloud auth login`
2. Prompt Deploy on Cloud Run Project id - #example

