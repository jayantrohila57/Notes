export const createNote = async (form) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    const success = await JSON.stringify(data?.success)
    return success
  } catch (error) {
    console.log(error)
  }
}
export const editNote = async (form) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes/${id}`, {
      method: 'Delete',
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
