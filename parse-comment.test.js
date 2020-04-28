const parseComment = require('./parse-comment');

test('parses 1 matching username', async() => {
    await expect(parseComment('Hello @alexcnichols - this is a test!')[0]).toBe('@alexcnichols');
});

test('fails to parse mis-typed username', async() => {
    await expect(parseComment('Hello@alexcnichols - this is a test!')).toBeNull();
});

test('parses 2 matching usernames', async() => {
    const comment = parseComment('Hello @alexcnichols - this is a test! And also @mateoescobedo is cool too.');
    await expect(comment.length).toBe(2);
    await expect(comment[0]).toBe('@alexcnichols');
    await expect(comment[1]).toBe('@mateoescobedo');
});