```sql
CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR,
	email VARCHAR,
	password VARCHAR,
	avatar VARCHAR NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

ALTER TABLE clients
RENAME TO users 

ALTER TABLE users 
ADD status VARCHAR

ALTER TABLE users 
RENAME COLUMN active TO status

ALTER TABLE users 
DROP COLUMN status

INSERT INTO users(
	name, email, password
) VALUES (
	"João", "joao@gmail.com", "xxxx"
);

SELECT * FROM users; 

UPDATE users 
SET avatar = 'image.png' 
WHERE id = 1;

DELETE FROM users WHERE id = 2;
```
