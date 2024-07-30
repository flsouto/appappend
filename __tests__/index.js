it('create-user', async() => {
  const time = Date.now()
  const {data} = await api.post('/users', {
    name: `User ${time}`,
    email: `user${time}@gmail.com`,
    password: `${time}`
  })
  await cache(data);
  expect(data._id).not.toBeUndefined()
})

test('get-user', async() => {
  const {_id,name} = await run('create-user')
  const {data} = await api.get(`/users/${_id}`)
  expect(data.name).toBe(name)
})

test('list-users', async() => {
  const {_id} = await run('create-user')
  const {data} = await api.get('/users')
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id
      })
    ])
  )
})

test('create-app', async() => {
  const {_id} = await run('create-user')
  const name = 'App '+Date.now()
  const {data} = await api.post(`/users/${_id}/apps`,{
    name
  })
  expect(data.name).toBe(name)
  await cache(data)
})

test('get-app', async() => {
  const {_id,name,owner} = await run('create-app')
  const {data} = await api.get(`/users/${owner}/apps/${_id}`)
  expect(data.name).toBe(name)
})

test('get-apps', async() => {
  const {_id,name,owner} = await run('create-app')
  const {data} = await api.get(`/users/${owner}/apps`)
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id, name
      })
    ])
  )
})

