### Modul 2-Chatapplikation in Advanced JavaScript

## Koda applikationen så långt som vi kom i lektionerna, alltså:
- när man klickat en peer i listan och anslutning upprättats, så ska en klass 'connected' sättas på knappen (den får då lila ram).
- innan ny anslutning upprättats så stäng eventuell tidigare anslutning.
- se till att endast en knapp har 'connected'-klassen
- när en anslutning upprättats, se till att den mottagande sidan också skickar ut 'peer-changed' eventet.
- Knappen i peer-listan blir markerad i lila på samma sätt på mottagande sidan (den som tar emot peer.on('connection')-eventet)
- Skicka meddelanden mellan anslutna peers och skriva ut dem i '.messages'-boxen. Varje meddelande ska vara wrappat i 2 div:ar, som så: <div class="message"><div> ...meddelandet här... </div></div>
- div:en med klassen '.message' ska också ha en klass '.me' om du skickar och '.them' om remote peer har skickat.
- man ska kunna skicka meddelande genom att klicka 'Send' eller trycka Enter i text-boxen.

## Krav: Använd dig av
- Immediately Invoked Function Expression
- Custom event
- Prettier för att autoformattera koden.

## Inlämning
Lägg till två länkar här när du är klar. Länka till:
- Din Github Pages sida
- Din kod på Github
