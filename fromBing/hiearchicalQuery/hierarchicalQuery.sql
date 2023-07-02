WITH RECURSIVE cte (id, title, content, usr_id, parent_id, level) AS (
    SELECT id, title, content, usr_id, parent_id, 1
    FROM posts
    WHERE parent_id IS NULL AND created_at >= ${minDate}
    UNION ALL
    SELECT p.id, p.title, p.content, p.usr_id, p.parent_id, cte.level + 1
    FROM posts p
    INNER JOIN cte ON p.parent_id = cte.id
    WHERE cte.level < ${maxLevel} AND p.created_at >= ${minDate}
)
SELECT id, title, content, usr_id,
    (SELECT json_agg(cte) FROM cte WHERE cte.parent_id = posts.id) AS children
FROM cte
WHERE level = 1
LIMIT ${limit};
