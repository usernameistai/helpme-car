# 🏎️ helpme-car
> **Status:** `OPERATIONAL` | **Clearance:** `OPERATOR_LEVEL_1`

![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node_22-339933?logo=nodedotjs)
![Database](https://img.shields.io/badge/DB-MongoDB-47A248?logo=mongodb)
![Auth](https://img.shields.io/badge/Security-Clerk-6C47FF?logo=clerk)

A high-frequency diagnostic uplink for identifying mechanical anomalies and safety violations. Engineered with a zero-tolerance policy for user incompetence.

---

## 📑 OPERATIONAL DIRECTIVES

### 01. TARGET IDENTIFICATION (THE "NOT-A-JERK" PROTOCOL)
Identify a vehicle exhibiting critical mechanical anomalies or safety violations. 
> **Mission Requirement:** This stage requires you to look away from your own reflection for a minimum of five seconds. 
> **Warning:** If you are currently too self-involved to notice a wheel falling off the car in front of you, abort mission immediately.

### 02. DATA UPLINK (THE "INTUITION" PHASE)
Initialize the intercept by entering the target's registration plate into the primary HUD.
- **Process:** Enter Plate → Execute Scan → Review Intel.
- **Operator Note:** The interface has been engineered for maximum efficiency. If you cannot navigate this screen, you shouldn't be operating a motor vehicle.

### 03. MISSION TERMINATION
The objective is complete. Data has been logged to the satellite grid.
- **Final Command:** Disconnect.

---

## 🛠️ TECH SPECS
- **Core:** TypeScript, Vite, React 19
- **State Management:** Zustand & TanStack Query
- **Backend:** Express 5.2 (Running on Node 22)
- **Styling:** Tailwind CSS + Framer Motion (for that futuristic HUD feel)

## 🚀 DEPLOYMENT
To initialize the satellite link locally:

1. **Install dependencies:**
   ```bash
   npm install

2. **Configure Intel (Environment Variables):**
    Create a .env file in the root directory and input your Clerk and MongoDB credentials.

3. **Launch Dual-Stream (Frontend & Backend):**
    npm run dev


### 🛡️ One Quick Check: The .env File
Since this project uses **Clerk** and **MongoDB**, remember that those API keys are "Classified Information." 
* Ensure you have a `.gitignore` file in that folder.
* Make sure it includes `.env` so you don't accidentally push your secret keys to GitHub.