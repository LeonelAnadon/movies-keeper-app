![ssss](https://user-images.githubusercontent.com/99033831/164980609-95285497-db45-4a38-a020-bc59628f0227.png)

Esta aplicación la desarrollé con React-Native & Expo. 

El principal funcionanmiento es hacer scraping de webs de libre uso y públicas. Con lo cuál se obtiene las principales carácteristicas de una película; tales como: imágen, título, sinopsis, director, rating, año y reparto.

El servidor lo hice con: Node.js, Express.js, Express-Session (para el login que expira en un día) y Puppeteer (scraping).

Para un mejor rendimiento elegí alojar el servidor en un VPS de [Donweb](https://donweb.com/es-ar/).

Elegí usar **Ubuntu 20.04** por su simpleza y por su bajo uso de CPU, **Nginx** (para conexiones simúltaneas y la carácterística *Proxy inverso*)  y **Pm2** (para mantener siempre activas las aplicaciones y volver a cargarlas sin ningún tiempo de inactividad).
