test('Lists users', async() => {
  const {_id} = await run('Creates a user')
  const {data} = await api.get('/users')
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id
      })
    ])
  )
})

it('Creates a user', async() => {
  const time = Date.now()
  const {data} = await api.post('/users', {
    name: `User ${time}`,
    email: `user${time}@gmail.com`,
    password: `${time}`
  })
  await cache(data);
  expect(data._id).not.toBeUndefined()
})

test('Get user', async() => {
  const {_id,name} = await run('Creates a user')
  const {data} = await api.get(`/users/${_id}`)
  expect(data.name).toBe(name)
})
