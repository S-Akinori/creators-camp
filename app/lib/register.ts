'use server'

export const register = async (formData: FormData) => {

    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    try {
        const res = await fetch(process.env.API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawFormData),

        })
        const json = await res.json()
        return json.data
    } catch (e) {
        console.log('error')
        return e
    }

}