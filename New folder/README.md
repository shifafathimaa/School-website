# 🏫 Azeeziya English Medium School — Official Website

A complete, production-ready school website with a Node.js + Express backend and a fully responsive HTML/CSS/JS frontend.

---

## 📁 Project Structure

```
azeezia-school/
├── server.js                    ← Express server (entry point)
├── package.json
├── .gitignore
├── routes/
│   ├── admission.js             ← POST /api/admission/submit
│   ├── contact.js               ← POST /api/contact/submit
│   └── career.js                ← POST /api/career/apply
├── data/                        ← Auto-created JSON data storage
│   ├── admissions.json
│   ├── contacts.json
│   └── careers.json
└── public/
    ├── index.html               ← Home page
    ├── about.html               ← About Us
    ├── academics.html           ← Academics (tabbed)
    ├── admission-procedure.html ← Admission Procedure
    ├── online-admission.html    ← Online Admission Form (3-step)
    ├── events.html              ← Events & Announcements
    ├── career.html              ← Career / Job Openings
    ├── contact.html             ← Contact Us
    ├── images/
    │   └── logo.png             ← School logo
    ├── css/
    │   └── style.css            ← Full responsive stylesheet
    └── js/
        ├── components.js        ← Shared header & footer (injected)
        └── main.js              ← All interactive JS
```

---

## 🚀 How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

**1. Install dependencies**
```bash
cd azeezia-school
npm install
```

**2. Start the server**
```bash
# Production
npm start

# Development (auto-reload on file changes)
npm run dev
```

**3. Open in browser**
```
http://localhost:3000
```

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, welcome, why us, principal msg, events preview |
| About Us | `/about` | School intro, vision & mission, management |
| Academics | `/academics` | Infrastructure, global exposure, fees (tabbed) |
| Admission Procedure | `/admission-procedure` | Criteria, process timeline, documents, fees |
| Online Admission | `/online-admission` | 3-step form: Student → Guardian → Academic |
| Events | `/events` | Filterable event cards + academic calendar |
| Career | `/career` | Job listings + online application form |
| Contact | `/contact` | Contact info, map, contact form |

---

## 🗄️ Backend API

All form data is saved as JSON in the `data/` folder.

| Endpoint | Method | Saves to |
|----------|--------|----------|
| `/api/admission/submit` | POST | `data/admissions.json` |
| `/api/contact/submit` | POST | `data/contacts.json` |
| `/api/career/apply` | POST | `data/careers.json` |

---

## 🖼️ Adding Real Images

Replace placeholders by adding images to `public/images/`:

| File | Used for |
|------|----------|
| `public/images/logo.png` | ✅ Already included (your logo) |
| `public/images/banner.jpg` | Hero banner (1920×900px recommended) |
| `public/images/school-building.jpg` | Welcome section, About page |
| `public/images/principal.jpg` | Principal message section |

Then update the relevant `<img>` tags or background CSS.

---

## 🎨 Customisation

### Change school details
Edit `public/js/components.js` — the header and footer are injected from here:
- Phone numbers, email, address
- Social media links
- CBSE affiliation number

### Change colour scheme
Edit `public/css/style.css` — CSS variables at the top:
```css
:root {
  --green:      #1b5e3f;   /* Primary green */
  --gold:       #c8973a;   /* Accent gold   */
  --ivory:      #faf8f3;   /* Background    */
}
```

### Change port
```bash
PORT=8080 npm start
```
Or set `PORT` in a `.env` file.

---

## 🔒 Upgrading to a Database

Currently stores data in JSON files. To upgrade to MongoDB:
```bash
npm install mongoose
```
Then update `routes/admission.js`, `routes/contact.js`, and `routes/career.js` to use Mongoose models.

---

## 📦 Deployment

For deployment on any VPS or cloud platform:
1. Upload the project folder
2. Run `npm install --production`
3. Use a process manager: `npm install -g pm2 && pm2 start server.js`
4. Point your domain via Nginx/Apache reverse proxy to `localhost:3000`

---

*Built for Azeeziya English Medium School, Chithari, Kanhangad, Kerala – 671316.*
