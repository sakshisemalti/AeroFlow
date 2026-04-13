# AeroFlow: Anti-Gravity Stadium Logistics

A project designed to reimagine large-scale stadium logistics using anti-gravity and levitation transport technology. Rather than traditional walking paths and staircases, **AeroFlow** simulates how a central orchestration grid might manage floating attendees and anti-gravity "Grav-Lifts" to seamlessly solve human congestion dynamically.

![Cloud Run Deployment](https://img.shields.io/badge/Deployed_on-Google_Cloud_Run-blue?logo=googlecloud&logoColor=white) 

---

## 🔗 Live Demo
The application is containerized and live at:
**[AeroFlow Live App 🌍](https://aeroflow-402900939650.us-central1.run.app)**

---

## 🏗️ Hackathon Specifics

### 1. Chosen Vertical
**Smart Infrastructure & Crowd Management** 
We chose this vertical because large-scale stadiums constantly suffer from bottlenecking, surging wait times, and poor spatial logistics during peak load. Applying a sci-fi constraint—anti-gravity—forced us to completely rethink 3D spatial routing without the limits of traditional stairwells or ground transit.

### 2. Approach and Logic
Our approach was to build a visually engaging **Dynamic Command Center**. Logically, the system treats attendees as "particles" flowing through a network graph (the stadium). We built routing algorithms designed to calculate transit metrics entirely based on real-time node capacitance. If a levitation shaft exceeds an 80% saturation rate, the logic strictly redirects incoming levitating passengers through alternative ring-struts, drastically normalizing wait times.

### 3. How the Solution Works
- **The Engine**: Uses pure Vanilla ES6 Javascript to manipulate live SVG rendering. Every attendee is animated natively utilizing high-performance rendering frames.
- **Dynamic Routing**: The `/routing.js` module calculates optimal hover-tube pathways. We prioritize the vertical structures (Grav 1, Grav 2, Freight) that have the highest available capacity.
- **The Deployment**: Wrapped in an optimized Nginx Docker container and deployed via Google Cloud Run, allowing seamless, highly-available metrics monitoring.

### 4. Assumptions Made
- **Ubiquitous Levitation Devices**: The solution assumes all users have personal or pod-based levitation devices synced directly to the AeroFlow Stadium Network.
- **Three-Dimensional Freedom**: Corridors don't require solid floors; attendees can float at varying Z-axes.
- **Perfect Telemetry Data**: The dashboard assumes 100% active connection uptime tracking the precise coordinates of every individual attendee.

---

## 🚀 Features

1. **Intelligent Grav-Map Dashboard**
   A dynamic SVG-based network monitoring tool representing the "anti-gravity nodes". It actively tracks and illustrates congestion constraints.
2. **Predictive Attendee Pass**
   Simulates passenger transit queues rendering their optimal hover-tube pathways depending on real-time crowd metrics.
3. **Lift Synchronization Monitor**
   Dashboard metrics updating lift status constraints directly.

## 🛠 Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3, & ES6 JavaScript. No heavy frontend frameworks to prioritize performance.
- **Micro-Animations**: Pure CSS properties leveraging custom Keyframes, bezier curves, and SVG stroke manipulation.
- **Deployment & Cloud**: `Docker` using lightweight `nginx:alpine` and deployed on Google Cloud Run (Containerized Serverless).

## 💻 Local Development

Because the project relies on native Vanilla standards with zero build-step bloat, you don't even need Node.js!

1. Clone this repository: `git clone <repo-url>`
2. Simply double-click on `index.html` within your finder/file explorer.
3. Or for a local port: `npx serve .` / `python3 -m http.server 8000`

## ☁️ Deployment Scripts

This repository contains automated pipelines to deploy easily to GCP.
1. Authenticate with `gcloud auth login`
2. Prompt Deploy on Cloud Run Project id - #example
