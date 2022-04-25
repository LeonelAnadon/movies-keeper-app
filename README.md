![ssss](https://user-images.githubusercontent.com/99033831/164980609-95285497-db45-4a38-a020-bc59628f0227.png)


<video src="https://user-images.githubusercontent.com/99033831/165165892-c77cc934-9f3c-4b63-8a04-6489d1199e13.mp4" width="800" height="600"></video>

# Capturas

<div style="display: flex">
<img src="https://user-images.githubusercontent.com/99033831/165167481-a5644227-677b-47e3-86a8-a3cdc36f4099.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168023-c4e584dd-ae36-48d0-abb6-dfcbb2087017.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168026-c7edc142-af4c-4dd6-bce6-a00506bbba74.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168028-0bcdb288-751c-44c4-b8ec-a6c3a6ae5ba4.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168031-c4bf8460-fdd2-417e-8f2e-a290ea05eb73.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168034-7207ac58-8fea-4818-8762-cd3204ef0368.jpg" width="280" height="580">
<img src="https://user-images.githubusercontent.com/99033831/165168037-1f756175-9067-45d1-abe8-86b2c2202ec3.jpg" width="280" height="580">
</div>



# Datos técnicos

Esta aplicación la desarrollé con React-Native & Expo. 

El principal funcionanmiento es hacer scraping de webs de libre uso y públicas. Con lo cuál se obtiene las principales carácteristicas de una película; tales como: imágen, título, sinopsis, director, rating, año y reparto.

El servidor lo hice con: Node.js, Express.js, Express-Session (para el login que expira en un día) y Puppeteer (scraping).

Para un mejor rendimiento elegí alojar el servidor en un VPS de [Donweb](https://donweb.com/es-ar/).

Elegí usar **Ubuntu 20.04** por su simpleza y por su bajo uso de CPU, **Nginx** (para conexiones simúltaneas y la carácterística *Proxy inverso*)  y **Pm2** (para mantener siempre activas las aplicaciones y volver a cargarlas sin ningún tiempo de inactividad).
