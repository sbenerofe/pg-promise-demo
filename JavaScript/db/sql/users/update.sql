UPDATE users SET username=${username}, email=${email}, hashed_password=${hashed_password} WHERE id=${id} 
RETURNING *
