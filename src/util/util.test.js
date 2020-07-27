import toTitle from  "./utils.js";

test('string good_morning_my_friend result in  Good Morning My Friend', () => {
    expect(toTitle('good morning my friend', ' ')).toBe('Good Morning My Friend');
});