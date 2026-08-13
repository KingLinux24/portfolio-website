# Israel David — AI Security & SOC Engineering Portfolio

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Azure AZ-500](https://img.shields.io/badge/Azure-AZ--500_Certified-0089D6?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/)
[![Wazuh SIEM](https://img.shields.io/badge/Wazuh-SIEM_Lab-0099FF?style=for-the-badge&logo=wazuh&logoColor=white)](https://wazuh.com/)

A high-performance, dark-themed portfolio website for **Israel David**, an AI Security Engineer, SOC Specialist, and Backend Engineer. Built with Vanilla HTML5, modern CSS3, ES6+ JavaScript, and Vite, featuring smooth scroll-driven image sequence animations, interactive project filter archives, and a searchable technical skill matrix.

---

## 🌟 Key Features

- **Cinematic Canvas Animation Hero**: Scroll-driven high-DPI image frame sequence rendered on HTML5 `<canvas>` via requestAnimationFrame lerp interpolation and smooth scroll physics (powered by Lenis).
- **Cinematic Ambient Radial Glow**: Background styling featuring a central crimson/magenta glow (`#a1124d` center glow, `#120610` mid-transition, `#050206` outer edges) mirroring subject lighting.
- **Dedicated About Page (`/about.html`)**: Complete zero-trust backend engineering & cybersecurity profile, highlighting AZ-500 Azure certification, School of AI internship experience, multi-cloud defense, and Linux system hardening.
- **Featured Repositories & Filter Archive (`/projects.html`)**: Showcase of open-source security engineering labs across Backend AI, AI Security, Cloud eBPF Runtime Defense, and SOC/SIEM labs (Wazuh, Sysmon, Atomic Red Team, Splunk BOTS).
- **Interactive Skill Matrix (`/skills.html`)**: Searchable and filterable technical matrix covering 7 domain categories (Multi-Cloud, AI Security, Backend, Blue Team, Red Team, GRC, Linux Systems).

---

## 🛠️ Tech Stack & Architecture

- **Core Logic**: HTML5, Vanilla JavaScript (ES6+ Modules)
- **Styling**: Modern CSS3 (Custom Design Tokens, Ambient Gradients, Glassmorphism Cards)
- **Animation & Physics**: HTML5 2D Canvas, Lenis Smooth Scroll
- **Bundler & Build Pipeline**: Vite (Multi-Page Application Rollup pipeline)

---

## 📂 Project Structure

```text
Portofolio Website/
├── index.html          # Homepage with Canvas Scroll Sequence & Contact Form
├── about.html          # Dedicated Bio & Technical Profile Page
├── projects.html       # Open-Source Security Repositories & Filter Archive
├── skills.html         # Searchable Technical Skills & Certifications Matrix
├── style.css           # Global Design Tokens, Radial Gradients & Utilities
├── main.js            # Canvas Frame Renderer, Image Preloader & Scroll Loop
├── vite.config.js      # Vite Multi-Page Build Configuration
├── phot/               # High-DPI Frame Sequence (300 JPEG Frames)
└── public/             # Project Thumbnails & SVG Domain Graphics
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+ recommended) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KingLinux24/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production build will be generated in the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 👨‍💻 About the Author

**Israel David** — Backend Engineering Intern & Cybersecurity Engineer (B.Tech Computer Science Engineering - Cybersecurity).

- **GitHub**: [@KingLinux24](https://github.com/KingLinux24)
- **LinkedIn**: [Israel Mbiyavanga David](https://linkedin.com/in/israel-mbiyavanga-david-b037a1255)
- **YouTube**: [@i_amHacker45](https://www.youtube.com/@i_amHacker45)
- **Instagram**: [@i_amhacker45](https://instagram.com/i_amhacker45)

---

## 📜 License

This repository is open source and available under the [MIT License](LICENSE).
