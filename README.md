# DeepDive KI: Das Skelett - Grundlagen der künstlichen Intelligenz verstehen

Willkommen zu unserem Schulprojekt, das künstliche Intelligenz (KI) für alle verständlich macht! Diese interaktive Präsentation erklärt in einfachen Begriffen, wie KI funktioniert, mit visuellen Beispielen und praktischen Demonstrationen.

## 🎯 Projektübersicht

Dieses Projekt ist ein Bildungswerkzeug, das entwickelt wurde, um Schülern die Grundlagen der künstlichen Intelligenz näherzubringen. Statt nur abstrakt über KI zu sprechen, haben wir eine interaktive Website erstellt, die visuell zeigt, wie KI-Systeme intern arbeiten.

### Was du lernen wirst:
- Wie KI "denkt" und Entscheidungen trifft
- Aus welchen Bausteinen neuronale Netze bestehen
- Wie KI aus Daten lernt
- Gängige KI-Konzepte wie Bias und Training
- Reale Beispiele für KI in der Anwendung

## 🏗️ Hauptkomponenten

### 1. Interaktive Visualisierungen
- **Neuronales Netzwerk-Baukasten**: Sehen, wie KI-Neuronen verbunden sind und Informationen verarbeiten
- **Bias-Demonstrator**: Verstehen, wie KI durch Trainingsdaten Vorurteile entwickeln kann
- **Trainingssimulator**: Beobachten, wie KI durch wiederholtes Lernen besser wird

### 2. KI-unterstützte Erklärungen
- Unser System verwendet eine echte KI, um Fragen zu KI-Konzepten zu beantworten
- Stelle alles über maschinelles Lernen, neuronale Netze oder KI-Ethik
- Erhalte personalisierte Erklärungen, die auf deinem Verständnisniveau zugeschnitten sind

### 3. Bildungsmodulen
- **Grundkonzepte**: Grundlegende Begriffe und Ideen
- **Architektur-Vertiefung**: Wie KI-Systeme gebaut werden
- **Anwendungsbeispiele**: Wo und wie KI heute eingesetzt wird
- **Ethik & Verantwortung**: Wichtige Überlegungen zum KI-Einsatz

## 🛠️ Technologie-Stack

### Frontend (Was du siehst)
- **React**: Eine JavaScript-Bibliothek, die interaktive Benutzeroberflächen erstellt
- **TypeScript**: Eine Programmiersprache, die JavaScript zusätzliche Sicherheit verleiht
- **Vite**: Ein Build-Tool, das die Website während der Entwicklung schneller lädt

### Backend (Was hinter den Kulissen passiert)
- **Node.js**: Eine Laufzeitumgebung, die JavaScript auf Servern ausführen lässt
- **Express**: Ein Framework, das Web-Anfragen und Antworten behandelt
- **Cloudflare Pages Functions**: Serverlose Funktionen, die KI-API-Aufrufe verarbeiten

### KI-Integration
- **OpenRouter**: Ein Dienst, der uns mit KI-Modellen verbindet
- **NVIDIA Nemotron-3 Nano 30B**: Das spezifische KI-Modell, das wir für Antwortgenerierung verwenden
- **REST API**: Ein Kommunikationsprotokoll, das es unserer Oberfläche ermöglicht, mit der KI zu kommunizieren

### Entwicklungstools
- **npm**: Ein Paketmanager, der bei der Installation und Verwaltung von Abhängigkeiten hilft
- **GitHub**: Eine Plattform zum Speichern und Zusammenarbeiten an Code
- **ESLint**: Ein Tool, das unseren Code sauber und konsistent hält

## 🚀 Funktionsweise

### Für Schüler (Nicht-technische Erklärung)
Stell dir unser Projekt wie eine interaktive Museumsausstellung über KI vor:

1. **Du interagierst**: Du klickst auf Buttons, verschiebst Schieberegler und stellst Fragen über die Website
2. **Das System reagiert**: Visuelle Elemente ändern sich, um zu zeigen, wie KI Informationen verarbeitet
3. **KI antwortet**: Wenn du Fragen stellst, geht deine Anfrage an ein echtes KI-Modell, das Antworten generiert
4. **Lernen geschieht**: Durch diese Interaktionen gewinnst du ein intuitives Verständnis dafür, wie KI funktioniert

### Für Lehrer (Technische Erklärung)
1. **Frontend**: React-Komponenten rendern die Benutzeroberfläche und verarbeiten Benutzerinteraktionen
2. **API-Gateway**: Cloudflare Pages Functions leiten Anfragen sicher an das KI-Modell weiter
3. **KI-Verarbeitung**: Das NVIDIA Nemotron-Modell verarbeitet Abfragen und generiert Antworten
4. **Antwortverarbeitung**: Ergebnisse werden formatiert und an das Frontend zur Anzeige gesendet

## 📋 Funktionen

### Interaktive Lernmodule
- **Neuronales Netzwerk-Visualisierer**: Ziehen und Ablegen, um dein eigenes neuronales Netz zu bauen
- **Datenbias-Simulator**: Sehen, wie verzerrte Trainingsdaten KI-Entscheidungen beeinflussen
- **Training-Fortschrittsanzeige**: Beobachten, wie KI mit mehr Beispielen besser wird
- **Konzept-Glossar**: Definitionen von KI-Begriffen mit visuellen Beispielen

### Echtzeit-KI-Interaktion
- **Fragen & Antworten**: Stelle der KI Fragen zu Konzepten, die dich interessieren
- **Adaptive Schwierigkeit**: Das System passt Erklärungen anhand der Komplexität an
- **Kontextbezogene Antworten**: KI versteht den Bildungskontext deiner Fragen

### Visuelle Lernhilfen
- **Animierte Diagramme**: Sehen, wie Daten durch neuronale Netze fließen
- **Farbcodierte Systeme**: Verschiedene Farben repräsentieren verschiedene KI-Komponenten
- **Schritt-für-Schritt-Tutorials**: Geführte Touren durch komplexe Konzepte
- **Vergleichstools**: Nebeneinander-Ansichten verschiedener KI-Ansätze

## 🏁 Erste Schritte

### Für Benutzer (Projekt ansehen)
1. Besuche unsere bereitgestellte Website (Link wird bereitgestellt)
2. Navigiere durch die verschiedenen Abschnitte mit dem Menü
3. Experimentiere mit interaktiven Elementen
4. Stelle Fragen mit dem KI-Frage-Antwort-Bereich
5. Erkunde Visualisierungen, um Intuition über KI-Konzepte zu entwickeln

### Für Entwickler (Zum Projekt beitragen)
1. Repository klonen:
   ```bash
   git clone https://github.com/zspolczer/Informatik_Prasentation.git
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen einrichten:
   - Kopiere `.env.example` nach `.env`
   - Füge deinen OpenRouter API-Schlüssel hinzu

4. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

5. Öffne deinen Browser unter `http://localhost:3000`

## 🔐 Sicherheit & Datenschutz

### API-Schlüssel-Schutz
- KI-API-Schlüssel werden sicher gespeichert und nie dem Client angezeigt
- Cloudflare Pages Functions fungieren als sicherer Proxy
- Alle sensiblen Daten werden serverseitig verarbeitet

### Datenschutz
- Es werden keine persönlichen Informationen gesammelt
- Fragen an die KI werden temporär verarbeitet und nicht gespeichert
- Alle Interaktionen sind anonym

## 🤝 Beitragen

Wir freuen uns über Beiträge von Mitschülern und Lehrern! So kannst du helfen:

### Ideen für Beiträge
- Neue Visualisierungen für KI-Konzepte hinzufügen
- Zusätzliche Bildungsmodulen erstellen
- Barrierefreiheitsfunktionen verbessern
- Inhalte in andere Sprachen übersetzen
- Mehr Beispiele aus der Praxis hinzufügen

### So kannst du beitragen
1. Repository forken
2. Erstelle einen Feature-Zweig (`git checkout -b feature/beeindruckende-funktion`)
3. Nimm deine Änderungen vor
4. Commite deine Änderungen (`git commit -m 'Beeindruckende Funktion hinzufügen'`)
5. Pushe in den Zweig (`git push origin feature/beeindruckende-funktion`)
6. Öffne einen Pull Request

## 📚 Ressourcen & Weiterführende Literatur

### KI-Ressourcen für Einsteiger
- "Künstliche Intelligenz: Ein Leitfaden für den menschlichen Verstand" von Melanie Mitchell
- MIT's Einführung in Deep Learning (Online-Kurs)
- Googles KI-Bildung (kostenlose Tutorials)

### Technische Dokumentation
- [React Dokumentation](https://react.dev/)
- [OpenRouter API Dokumentation](https://openrouter.ai/docs)
- [Cloudflare Pages Dokumentation](https://developers.cloudflare.com/pages/)

## 📞 Support & Kontakt

Für Fragen zum Projekt:
- Öffne ein Issue auf GitHub
- Kontaktiere die Projektbetreuer direkt
- Schaue in den FAQ-Bereich auf der Website

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt und steht anderen zur Verfügung, um es für ähnliche Bildungsinitiativen zu nutzen und zu modifizieren.

---

Gemacht mit ❤️ für die Bildung von Schülern, die glauben, dass KI-Bildung für alle wichtig ist!