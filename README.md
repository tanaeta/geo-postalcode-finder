# .env  
backend > .env  
USER = 'DB_USER' #ex.postgres  
HOST =  'DB_HOST' #ex.localhost  
DATABASE = 'DB_NAME'  
PASSWORD = 'DB_PASS'  
  
# DB  
CREATE EXTENSION postgis;  
CREATE TABLE postal_codes (  
id SERIAL PRIMARY KEY,  
postal_code VARCHAR(10),  
geom GEOMETRY(Point, 4326)  
);  
  
# Run  
## app  
npm install  
npm start  
## backend  
npm install  
npm start  
