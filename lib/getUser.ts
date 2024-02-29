export const getUser = async (id: string) => {
  'use server'
  const res = await fetch(process.env.API_URL + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
}