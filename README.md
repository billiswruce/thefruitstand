[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/cFAPU0GE)
# FSU23D Systemutveckling Uppgift 1

<img width="1680" alt="1" src="https://github.com/Medieinstitutet/uppgift-1-billiswruce/assets/98770226/2427cb16-db21-4b84-8c1c-928bf131196d">
<img width="1680" alt="2" src="https://github.com/Medieinstitutet/uppgift-1-billiswruce/assets/98770226/43e77745-4be8-41ff-9e5e-13cb1d62bf09">
<img width="1680" alt="5" src="https://github.com/Medieinstitutet/uppgift-1-billiswruce/assets/98770226/8bdb4f43-efab-420e-9295-e68d9925bca7">
<img width="1255" alt="4" src="https://github.com/Medieinstitutet/uppgift-1-billiswruce/assets/98770226/550d88af-9da9-4762-a75b-c5aa84987f95">
<img width="1671" alt="8" src="https://github.com/Medieinstitutet/uppgift-1-billiswruce/assets/98770226/826995f6-344c-473a-887a-eaa5e5d94158">


Denna uppgift går ut på att skapa en e-handel, som fungerar både för administratörer och kunder. Administratörer ska kunna lägga till och redigera produkter som sedan visas för användaren. Användaren sk kunna välja produkter och lägga i sin varukorg för att sedan gå igenom betalningen för att skapa en order i systemet, som administratören senare kan se.

## Kraven för denna uppgift:

### Betyg G

- Diagram för databas, sitemap och tidsplan framtagen
- Databas uppsatt med tabeller enligt diagramet
- Utveckla ett användargränssnitt för administratörer där de kan lägga till och redigera produkter
- Produkterna ska sparas ner i databasen
- Användare ska kunna se en lista med alla produkter och lägga dem i sin varukorg
- Användaren ska sedan kunna betala för sina varor och skapa en order i databasen
- Administratören ska kunna se listan med ordrar och vilka varor som beställts

### Betyg VG

Krav för VG

- Samtliga punkter för G
- Alla typer av objekt i databasen ska ha en egen klass som resten av kodbasen arbetar mot
- Alla klasser ska ärva från en basklass som sköter laddande och sparande av data
- En singleton ska användas för alla databasfrågor
- Varukorgen ska sparas i databasen och delar genmensam funktionalitet med order-klassen
- Betalning genomförs med vald betaltjänst

Denna uppgift mäter följande moment från kursplanen:

kommunikation med databaser
ta fram E-handelsplattform
välja ut, designa och anpassa databaser utifrån given uppgift

Denna uppgift mäter följande VG-moment från kursplanen:

Använda Objektorienterad programmering på ett korrekt sätt.
